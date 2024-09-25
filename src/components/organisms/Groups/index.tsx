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

export default function Groups() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    id: string;
    oragnism: string;
    name: string | undefined;
  } | null>(null);

  const columnsName = [
    { name: "Name", mapper: "gname" },
    { name: "Link", mapper: "link" },
  ];

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
    console.log(`Edit item with ID: ${id}`);
    setOpenEdit(true);

    const data = columnsData.find((column) => column.uuid === id);
    if (data) {
      form.setValue("uuid", data.uuid);
      form.setValue("gname", data.gname);
      form.setValue("link", data.link);
    }
  };

  const handleEditSubmit = (values: z.infer<typeof groupFormSchema>) => {
    console.log("Submit", values);
  };

  const handleDelete = () => {
    // TODO : handle actual deletion from db here
    setColumnsData(
      columnsData.filter((group) => group.uuid !== deleteData?.id)
    );
    setOpenDelete(false);
  };

  const handleDeletePopup = (id: string) => {
    console.log(`Delete item with ID: ${id}`);
    setDeleteData({
      id: id,
      oragnism: "Group",
      name: columnsData.filter((group) => group.uuid === id).at(0)?.gname,
    });
    setOpenDelete(true);
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
          oragnism={"Group"}
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
          onCancel={() => {
            setOpenDelete(false);
          }}
        />
      )}
    </div>
  );
}
