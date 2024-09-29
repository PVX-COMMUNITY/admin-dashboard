import { DialogDelete } from "@/components/molecules/DialogDelete";
import { DialogEdit } from "@/components/molecules/DialogEdit";
import { TableCustom } from "@/components/molecules/TableCustom";
import { useEffect, useState } from "react";
import blacklistsData from "@/utils/data/blacklist.json";
import {
  blacklistFormCreateSchema,
  blacklistFormSchema,
} from "@/components/organisms/Blacklists/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { DialogCreate } from "@/components/molecules/DialogCreate";

export interface IBlacklists {
  uuid: string;
  number: string;
  reason: string;
  admin: string;
  [key: string]: string;
}

const columnsName = [
  { name: "Number", mapper: "number" },
  { name: "Reason", mapper: "reason" },
  { name: "Admin", mapper: "admin" },
];

const findBlacklistById = (id: string, data: IBlacklists[]) =>
  data.find((blacklist) => blacklist.uuid === id) || null;

export default function Blacklists() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    id: string;
    organism: string;
    name?: string;
  } | null>(null);
  const [columnsData, setColumnsData] = useState<IBlacklists[]>(blacklistsData);
  const [userData, setUserData] = useState<IBlacklists[]>(columnsData);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const filteredData = columnsData.filter((item) =>
      item.number.includes(searchTerm)
    );
    setUserData(filteredData);
  }, [searchTerm, columnsData]);

  const form = useForm<z.infer<typeof blacklistFormSchema>>({
    resolver: zodResolver(blacklistFormSchema),
    defaultValues: {
      number: "",
      reason: "",
      admin: "",
    },
  });

  const handleCreate = () => {
    form.clearErrors();
    form.setValue("number", "");
    form.setValue("reason", "");
    form.setValue("admin", "");

    setOpenCreate(true);
  };

  const handleCreateSubmit = async (
    values: z.infer<typeof blacklistFormCreateSchema>
  ) => {
    try {
      console.log("Submit", values);
      // TODO: Add logic to save the edited member (e.g., API call)
    } catch (error) {
      console.error("Edit submission error:", error);
    }
  };

  const handleEdit = (id: string) => {
    const blacklist = findBlacklistById(id, columnsData);
    if (blacklist) {
      form.clearErrors();
      form.setValue("number", blacklist.number);
      form.setValue("reason", blacklist.reason);
      form.setValue("admin", blacklist.admin);
    }
    setOpenEdit(true);
  };

  const handleEditSubmit = async (
    values: z.infer<typeof blacklistFormSchema>
  ) => {
    try {
      console.log("Submit", values);
      // TODO: Add logic to save the edited blacklist (e.g., API call)
    } catch (error) {
      console.error("Edit submission error:", error);
    }
  };

  const handleDeletePopup = (id: string) => {
    const blacklist = findBlacklistById(id, columnsData);
    if (blacklist) {
      setDeleteData({ id, organism: "Blacklist", name: blacklist.username });
      setOpenDelete(true);
    }
  };

  const handleDelete = () => {
    if (deleteData) {
      setColumnsData(
        columnsData.filter((blacklist) => blacklist.uuid !== deleteData.id)
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
        <DialogCreate<z.infer<typeof blacklistFormCreateSchema>>
          open={openCreate}
          setOpen={() => setOpenCreate(false)}
          organism={"Member"}
          form={form}
          onSubmit={handleCreateSubmit}
        />
      )}
      {openEdit && (
        <DialogEdit<z.infer<typeof blacklistFormSchema>>
          open={openEdit}
          setOpen={() => setOpenEdit(false)}
          organism={"Blacklist"}
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
