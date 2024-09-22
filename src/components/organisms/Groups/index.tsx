import { DialogEdit } from "@/components/organisms/Groups/DialogEdit";
import { TableCustom } from "@/components/molecules/TableCustom";
import { useState } from "react";
import { DialogDelete } from "@/components/molecules/DialogDelete";

export interface IGroups {
  id: string;
  name: string;
  link: string;
}

export default function Groups() {

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState<IGroups | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{ id: string, oragnism: string, name: string | undefined } | null>(null);

  const columnsName = [
    {
      name: "ID",
      mapper: "id",
    },
    { name: "Name", mapper: "name" },
    { name: "Link", mapper: "link" },
  ];

  const [columnsData, setColumnsData] = useState([
    {
      id: "1",
      name: "COMMUNITY1",
      link: "https://chat.whatsapp.com/J98k3LCByjC4GzwwxvZOBJ",
    },
    {
      id: "2",
      name: "COMMUNITY2",
      link: "https://chat.whatsapp.com/J98k3LCByjC4GzwwxvZOBJ",
    },
    {
      id: "3",
      name: "COMMUNITY3",
      link: "https://chat.whatsapp.com/J98k3LCByjC4GzwwxvZOBJ",
    },
    {
      id: "4",
      name: "COMMUNITY4",
      link: "https://chat.whatsapp.com/J98k3LCByjC4GzwwxvZOBJ",
    },
    {
      id: "5",
      name: "COMMUNITY5",
      link: "https://chat.whatsapp.com/J98k3LCByjC4GzwwxvZOBJ",
    },
  ]);

  const handleEdit = (id: string) => {
    console.log(`Edit item with ID: ${id}`);
    setOpenEdit(true);

    const data = columnsData.find((column) => column.id === id);
    if (data) setEditData(data);
  };

  const handleDelete = () => {
    // TODO : handle actual deletion from db here
    setColumnsData(columnsData.filter(group => group.id !== deleteData?.id))
    setOpenDelete(false)
  }

  const handleDeletePopup = (id: string) => {
    console.log(`Delete item with ID: ${id}`);
    setDeleteData({ id: id, oragnism: "Group", name: columnsData.filter(group => group.id === id).at(0)?.name });
    setOpenDelete(true)
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
        <DialogEdit
          open={openEdit}
          setOpen={() => setOpenEdit(false)}
          editData={editData}
        />
      )}
      {openDelete && (
        <DialogDelete
          open={openDelete}
          setOpen={() => setOpenDelete(false)}
          deleteData={deleteData}
          onDelete={handleDelete}
          onCancel={() => { setOpenDelete(false) }}
        />
      )}
    </div>
  );
}
