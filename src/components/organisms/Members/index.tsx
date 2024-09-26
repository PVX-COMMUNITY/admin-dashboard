import { TableCustom } from "@/components/molecules/TableCustom";
import { useState } from "react";
import { DialogDelete } from "../../molecules/DialogDelete";
import { DialogEdit } from "@/components/molecules/DialogEdit";
import membersData from "@/utils/data/members.json";
import { memberFormSchema } from "@/components/organisms/Members/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface IMembers {
  uuid: string;
  username: string;
  number: string;
  donation: number;
  [key: string]: string | number;
}

const columnsName = [
  { name: "Username", mapper: "username" },
  { name: "Number", mapper: "number" },
  { name: "Donation", mapper: "donation" },
];

const findMemberById = (id: string, data: IMembers[]) =>
  data.find((member) => member.uuid === id) || null;

export default function Members() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    id: string;
    organism: string;
    name?: string;
  } | null>(null);
  const [columnsData, setColumnsData] = useState<IMembers[]>(membersData);

  const form = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      uuid: "",
      username: "",
      number: "",
      donation: 0,
    },
  });

  const handleEdit = (id: string) => {
    const member = findMemberById(id, columnsData);
    if (member) {
      form.clearErrors();
      form.setValue("uuid", member.uuid);
      form.setValue("username", member.username);
      form.setValue("number", member.number);
      form.setValue("donation", member.donation);
    }
    setOpenEdit(true);
  };

  const handleEditSubmit = async (values: z.infer<typeof memberFormSchema>) => {
    try {
      console.log("Submit", values);
      // TODO: Add logic to save the edited member (e.g., API call)
    } catch (error) {
      console.error("Edit submission error:", error);
    }
  };

  const handleDeletePopup = (id: string) => {
    const member = findMemberById(id, columnsData);
    if (member) {
      setDeleteData({ id, organism: "Member", name: member.username });
      setOpenDelete(true);
    }
  };

  const handleDelete = () => {
    if (deleteData) {
      setColumnsData(
        columnsData.filter((member) => member.uuid !== deleteData.id)
      );
      setOpenDelete(false);
      // TODO: Add logic to delete from DB
    }
  };

  return (
    <div>
      <TableCustom
        columnsName={columnsName}
        columnsData={columnsData}
        onEdit={handleEdit}
        onDelete={handleDeletePopup}
        showEdit={true}
        showDelete={true}
      />
      {openEdit && (
        <DialogEdit<z.infer<typeof memberFormSchema>>
          open={openEdit}
          setOpen={() => setOpenEdit(false)}
          organism={"Member"}
          form={form}
          onSubmit={handleEditSubmit}
        />
      )}
      {openDelete && (
        <DialogDelete
          open={openDelete}
          setOpen={() => setOpenDelete(false)}
          deleteData={deleteData}
          onDelete={handleDelete}
          onCancel={() => setOpenDelete(false)}
        />
      )}
    </div>
  );
}
