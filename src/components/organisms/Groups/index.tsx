import { DialogEdit } from "@/components/organisms/Groups/DialogEdit";
import { TableCustom } from "@/components/molecules/TableCustom";
import { useState } from "react";

export interface IGroups {
  id: string;
  name: string;
  link: string;
}

export default function Groups() {
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState<IGroups | null>(null);

  const columnsName = [
    {
      name: "ID",
      mapper: "id",
    },
    { name: "Name", mapper: "name" },
    { name: "Link", mapper: "link" },
  ];

  const columnsData = [
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
  ];

  const handleEdit = (id: string) => {
    console.log(`Edit item with ID: ${id}`);
    setOpenEdit(true);

    const data = columnsData.find((column) => column.id === id);
    if (data) setEditData(data);
  };

  return (
    <div>
      <TableCustom
        columnsName={columnsName}
        columnsData={columnsData}
        onEdit={handleEdit}
        showEdit={true}
      />
      {openEdit && (
        <DialogEdit
          open={openEdit}
          setOpen={() => setOpenEdit(false)}
          editData={editData}
        />
      )}
    </div>
  );
}
