import { DialogDelete } from "@/components/molecules/DialogDelete";
import { TableCustom } from "@/components/molecules/TableCustom";
import { useState } from "react";

export default function Donations() {

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{ id: string, oragnism: string, name: string | undefined } | null>(null);

  const columnsName = [
    {
      name: "ID",
      mapper: "id",
    },
    { name: "Username", mapper: "username" },
    { name: "Number", mapper: "number" },
    { name: "Donation", mapper: "donation" },
  ];

  const [columnsData, setColumnsData] = useState([
    {
      id: "1",
      username: "abcc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "2",
      username: "abcdef",
      number: "1234567890",
      donation: 50,
    },
    {
      id: "3",
      username: "abcd",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "4",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "5",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "6",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "7",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "8",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "9",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "10",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
  ]);

  const handleEdit = (id: string) => {
    console.log(`Edit item with ID: ${id}`);
  };

  const handleDeletePopup = (id: string) => {
    console.log(`Delete item with ID: ${id}`);
    setDeleteData({ id: id, oragnism: "Donation", name: columnsData.filter(member => member.id === id).at(0)?.username });
    setOpenDelete(true)
  };

  const handleDelete = () => {
    // TODO : handle actual deletion from db here
    setColumnsData(columnsData.filter(member => member.id !== deleteData?.id))
    setOpenDelete(false)
  }

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
