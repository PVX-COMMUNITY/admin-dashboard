import { TableCustom } from "@/components/molecules/TableCustom";
import { useEffect, useState } from "react";
import { DialogDelete } from "../../molecules/DialogDelete";
import { DialogEdit } from "@/components/molecules/DialogEdit";
import { DialogCreate } from "@/components/molecules/DialogCreate";
import membersData from "@/utils/data/members.json";
import {
  memberFormSchema,
  memberFormCreateSchema,
} from "@/components/organisms/Members/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";

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
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    id: string;
    organism: string;
    name?: string;
  } | null>(null);
  const [columnsData, setColumnsData] = useState<IMembers[]>(membersData);
  const [userData, setUserData] = useState<IMembers[]>(columnsData);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const filteredData = columnsData.filter((item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUserData(filteredData);
  }, [searchTerm]);

  const form = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      uuid: "",
      username: "",
      number: "",
      donation: 0,
    },
  });
  const formCreate = useForm<z.infer<typeof memberFormCreateSchema>>({
    resolver: zodResolver(memberFormCreateSchema),
    defaultValues: {
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

  const handleCreate = () => {
    formCreate.clearErrors();

    formCreate.setValue("username", "");
    formCreate.setValue("number", "");
    formCreate.setValue("donation", 0);
  };

  const handleCreateSubmit = async (
    values: z.infer<typeof memberFormCreateSchema>
  ) => {
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
      <div className="flex w-full justify-between">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-white my-4 w-[60%]"
        />
        <Button
          onClick={() => {
            setOpenCreate(true), handleCreate();
          }}
          className=" my-4 p-4 sm:m-5"
        >
          Create
        </Button>
      </div>
      <TableCustom
        columnsName={columnsName}
        columnsData={userData}
        onEdit={handleEdit}
        onDelete={handleDeletePopup}
        showEdit={true}
        showDelete={true}
      />
      {openCreate && (
        <DialogCreate<z.infer<typeof memberFormCreateSchema>>
          open={openCreate}
          setOpen={() => setOpenCreate(false)}
          organism={"Member"}
          form={formCreate}
          onSubmit={handleCreateSubmit}
        />
      )}
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
