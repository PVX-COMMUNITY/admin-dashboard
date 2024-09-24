import { DialogDelete } from "@/components/molecules/DialogDelete";
import { TableCustom } from "@/components/molecules/TableCustom";
import { useState } from "react";
import birthdaysData from "@/utils/data/birthdays.json";

export interface IBirthdays {
  uuid: string;
  name: string;
  username: string;
  day: number;
  month: number;
  year: number;
  place: string;
}

export default function Birthdays() {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    id: string;
    oragnism: string;
    name: string | undefined;
  } | null>(null);

  const columnsName = [
    {
      name: "ID",
      mapper: "uuid",
    },
    { name: "Name", mapper: "name" },
    { name: "Username", mapper: "username" },
    { name: "Day", mapper: "day" },
    { name: "Month", mapper: "month" },
    { name: "Year", mapper: "year" },
    { name: "Place", mapper: "place" },
  ];

  const [columnsData, setColumnsData] = useState(birthdaysData);

  const handleEdit = (id: string) => {
    console.log(`Edit item with ID: ${id}`);
  };

  const handleDeletePopup = (id: string) => {
    console.log(`Delete item with ID: ${id}`);
    setDeleteData({
      id: id,
      oragnism: "Birthday",
      name: columnsData.filter((member) => member.uuid === id).at(0)?.username,
    });
    setOpenDelete(true);
  };

  const handleDelete = () => {
    // TODO : handle actual deletion from db here
    setColumnsData(
      columnsData.filter((member) => member.uuid !== deleteData?.id)
    );
    setOpenDelete(false);
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
