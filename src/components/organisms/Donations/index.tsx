import { DialogDelete } from "@/components/molecules/DialogDelete";
import { TableCustom } from "@/components/molecules/TableCustom";
import { useState } from "react";
import donationsData from "@/utils/data/donations.json";

export interface IDonations {
  uuid: string;
  username: string;
  number: string;
  donation: number;
}

export default function Donations() {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    id: string;
    oragnism: string;
    name: string | undefined;
  } | null>(null);

  const columnsName = [
    { name: "Username", mapper: "username" },
    { name: "Number", mapper: "number" },
    { name: "Donation", mapper: "donation" },
  ];

  const [columnsData, setColumnsData] = useState(donationsData);

  const handleEdit = (id: string) => {
    console.log(`Edit item with ID: ${id}`);
  };

  const handleDeletePopup = (id: string) => {
    console.log(`Delete item with ID: ${id}`);
    setDeleteData({
      id: id,
      oragnism: "Donation",
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
