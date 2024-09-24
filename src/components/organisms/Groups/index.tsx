import { DialogEdit } from "@/components/organisms/Groups/DialogEdit";
import { TableCustom } from "@/components/molecules/TableCustom";
import { useState } from "react";
import { DialogDelete } from "@/components/molecules/DialogDelete";
import groupsData from "@/utils/data/groups.json";

export interface IGroups {
  uuid: string;
  gname: string;
  link: string;
}

export default function Groups() {
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState<IGroups | null>(null);
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

  const [columnsData, setColumnsData] = useState(groupsData);

  const handleEdit = (id: string) => {
    console.log(`Edit item with ID: ${id}`);
    setOpenEdit(true);

    const data = columnsData.find((column) => column.uuid === id);
    if (data) setEditData(data);
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
          onCancel={() => {
            setOpenDelete(false);
          }}
        />
      )}
    </div>
  );
}
