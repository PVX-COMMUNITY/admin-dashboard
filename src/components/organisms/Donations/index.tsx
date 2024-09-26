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

const columnsName = [
  { name: "Username", mapper: "username" },
  { name: "Number", mapper: "number" },
  { name: "Donation", mapper: "donation" },
];

const findDonationById = (id: string, data: IDonations[]) =>
  data.find((donation) => donation.uuid === id) || null;

export default function Donations() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    id: string;
    organism: string;
    name?: string;
  } | null>(null);
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
    const donation = findDonationById(id, columnsData);
    if (donation) {
      form.clearErrors();
      form.setValue("uuid", donation.uuid);
      form.setValue("username", donation.username);
      form.setValue("number", donation.number);
      form.setValue("donation", donation.donation);
    }
    setOpenEdit(true);
  };

  const handleEditSubmit = async (
    values: z.infer<typeof donationFormSchema>
  ) => {
    try {
      console.log("Submit", values);
      // TODO: Add logic to save the edited donation (e.g., API call)
    } catch (error) {
      console.error("Edit submission error:", error);
    }
  };

  const handleDeletePopup = (id: string) => {
    const donation = findDonationById(id, columnsData);
    if (donation) {
      setDeleteData({ id, organism: "Donation", name: donation.username });
      setOpenDelete(true);
    }
  };

  const handleDelete = () => {
    if (deleteData) {
      setColumnsData(
        columnsData.filter((donation) => donation.uuid !== deleteData.id)
      );
      setOpenDelete(false);
      // TODO: Add logic to delete from DB
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
        <DialogEdit<z.infer<typeof donationFormSchema>>
          open={openEdit}
          setOpen={() => setOpenEdit(false)}
          organism={"Donation"}
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
