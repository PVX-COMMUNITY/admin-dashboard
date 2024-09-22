import { DialogDelete } from "@/components/molecules/DialogDelete";
import { TableCustom } from "@/components/molecules/TableCustom";
import { useState } from "react";

export default function Birthdays() {

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{ id: string, oragnism: string, name: string | undefined } | null>(null);

  const columnsName = [
    {
      name: "ID",
      mapper: "id",
    },
    { name: "Name", mapper: "name" },
    { name: "Username", mapper: "username" },
    { name: "Date", mapper: "date" },
    { name: "Month", mapper: "month" },
    { name: "Year", mapper: "year" },
    { name: "Place", mapper: "place" },
  ];

  const [columnsData, setColumnsData] = useState([
    {
      id: "1",
      name: "abc",
      username: "xyz",
      date: "10",
      month: "3",
      year: "1998",
      place: "India",
    },
    {
      id: "2",
      name: "abc",
      username: "xyz",
      date: "10",
      month: "3",
      year: "1998",
      place: "India",
    },
    {
      id: "3",
      name: "abc",
      username: "xyz",
      date: "10",
      month: "3",
      year: "1998",
      place: "India",
    },
    {
      id: "4",
      name: "abc",
      username: "xyz",
      date: "10",
      month: "3",
      year: "1998",
      place: "India",
    },
    {
      id: "5",
      name: "abc",
      username: "xyz",
      date: "10",
      month: "3",
      year: "1998",
      place: "India",
    },
  ]);

  const handleEdit = (id: string) => {
    console.log(`Edit item with ID: ${id}`);
  };

  const handleDeletePopup = (id: string) => {
    console.log(`Delete item with ID: ${id}`);
    setDeleteData({ id: id, oragnism: "Birthday", name: columnsData.filter(member => member.id === id).at(0)?.username });
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
