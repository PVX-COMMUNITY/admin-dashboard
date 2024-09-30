import { DialogDelete } from "@/components/molecules/DialogDelete";
import { TableCustom } from "@/components/molecules/TableCustom";
import { DialogEdit } from "@/components/molecules/DialogEdit";
import { useEffect, useState } from "react";
import donationsData from "@/utils/data/donations.json";
import { donationFormSchema } from "@/components/organisms/Donations/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { DialogCreate } from "@/components/molecules/DialogCreate";

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
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    id: string;
    organism: string;
    name?: string;
  } | null>(null);
  const [columnsData, setColumnsData] = useState<IDonations[]>(donationsData);
  const [userData, setUserData] = useState<IDonations[]>(columnsData);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const filteredData = columnsData.filter((item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUserData(filteredData);
  }, [searchTerm, columnsData]);

  const form = useForm<z.infer<typeof donationFormSchema>>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      username: "",
      number: "",
      donation: 0,
    },
  });

  const handleCreate = () => {
    form.clearErrors();
    form.setValue("username", "");
    form.setValue("number", "");
    form.setValue("donation", 0);

    setOpenCreate(true);
  };

  const handleCreateSubmit = async (
    values: z.infer<typeof donationFormSchema>
  ) => {
    try {
      console.log("Submit", values);
      // TODO: Add logic to save the edited member (e.g., API call)
    } catch (error) {
      console.error("Edit submission error:", error);
    }
  };

  const handleEdit = (id: string) => {
    const donation = findDonationById(id, columnsData);
    if (donation) {
      form.clearErrors();

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
      <div className="flex w-full justify-between">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-white my-4 w-[60%]"
        />
        <Button onClick={handleCreate} className="my-4 p-4 sm:m-5">
          Create
        </Button>
      </div>
      <TableCustom
        columnsName={columnsName}
        columnsData={userData}
        onEdit={handleEdit}
        onDelete={handleDeletePopup}
        showEdit={true}
        showDelete={true}
      />
      {openCreate && (
        <DialogCreate<z.infer<typeof donationFormSchema>>
          open={openCreate}
          setOpen={() => setOpenCreate(false)}
          organism={"Member"}
          form={form}
          onSubmit={handleCreateSubmit}
        />
      )}
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
