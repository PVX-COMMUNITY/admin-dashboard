import { DialogEdit } from "@/components/molecules/DialogEdit";
import { TableCustom } from "@/components/molecules/TableCustom";
import { useState } from "react";
import { DialogDelete } from "@/components/molecules/DialogDelete";
import groupsData from "@/utils/data/groups.json";
import { groupFormSchema } from "@/components/organisms/Groups/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface IGroups {
  uuid: string;
  gname: string;
  link: string;
  [key: string]: string;
}

const columnsName = [
  { name: "Name", mapper: "gname" },
  { name: "Link", mapper: "link" },
];

const findGroupById = (id: string, data: IGroups[]) =>
  data.find((group) => group.uuid === id) || null;

export default function Groups() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    id: string;
    organism: string;
    name?: string;
  } | null>(null);
  const [columnsData, setColumnsData] = useState<IGroups[]>(groupsData);

  const form = useForm<z.infer<typeof groupFormSchema>>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      uuid: "",
      gname: "",
      link: "",
    },
  });

  const handleEdit = (id: string) => {
    const group = findGroupById(id, columnsData);
    if (group) {
      form.clearErrors();
      form.setValue("uuid", group.uuid);
      form.setValue("gname", group.gname);
      form.setValue("link", group.link);
    }
    setOpenEdit(true);
  };

  const handleEditSubmit = async (values: z.infer<typeof groupFormSchema>) => {
    try {
      console.log("Submit", values);
      // TODO: Add logic to save the edited data (e.g., API call)
    } catch (error) {
      console.error("Edit submission error:", error);
    }
  };

  const handleDelete = () => {
    if (deleteData) {
      setColumnsData(
        columnsData.filter((group) => group.uuid !== deleteData.id)
      );
      setOpenDelete(false);
    }
  };

  const handleDeletePopup = (id: string) => {
    const group = findGroupById(id, columnsData);
    if (group) {
      setDeleteData({ id, organism: "Group", name: group.gname });
      setOpenDelete(true);
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
        <DialogEdit<z.infer<typeof groupFormSchema>>
          open={openEdit}
          setOpen={() => setOpenEdit(false)}
          organism={"Group"}
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
