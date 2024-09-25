import { DialogDelete } from "@/components/molecules/DialogDelete";
import { TableCustom } from "@/components/molecules/TableCustom";
import { DialogEdit } from "@/components/molecules/DialogEdit";
import { useState } from "react";
import donationsData from "@/utils/data/donations.json";
import { donationFormSchema } from "@/components/organisms/Donations/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface IDonations {
  uuid: string;
  username: string;
  number: string;
  donation: number;
  [key: string]: string | number;
}

export default function Donations() {
  const [openEdit, setOpenEdit] = useState(false);
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

  const [columnsData, setColumnsData] = useState<IDonations[]>(donationsData);

  const form = useForm<z.infer<typeof donationFormSchema>>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      uuid: "",
      username: "",
      number: "",
      donation: 0,
    },
  });

  const handleEdit = (id: string) => {
    console.log(`Edit item with ID: ${id}`);
    setOpenEdit(true);

    const data = columnsData.find((column) => column.uuid === id);
    if (data) {
      form.setValue("uuid", data.uuid);
      form.setValue("username", data.username);
      form.setValue("number", data.number);
      form.setValue("donation", data.donation);
    }
  };

  const handleEditSubmit = (values: z.infer<typeof donationFormSchema>) => {
    console.log("Submit", values);
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
      {openEdit && (
        <DialogEdit<z.infer<typeof donationFormSchema>>
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
