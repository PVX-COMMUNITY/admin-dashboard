import { DialogDelete } from "@/components/molecules/DialogDelete";
import { DialogEdit } from "@/components/molecules/DialogEdit";
import { TableCustom } from "@/components/molecules/TableCustom";
import { useEffect, useState } from "react";
import birthdaysData from "@/utils/data/birthdays.json";
import {
  birthdayFormCreateSchema,
  birthdayFormSchema,
} from "@/components/organisms/Birthdays/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { DialogCreate } from "@/components/molecules/DialogCreate";

export interface IBirthdays {
  uuid: string;
  name: string;
  username: string;
  day: number;
  month: number;
  year: number;
  place: string;
  number: string;
  [key: string]: string | number;
}

const columnsName = [
  { name: "Name", mapper: "name" },
  { name: "Username", mapper: "username" },
  { name: "Day", mapper: "day" },
  { name: "Month", mapper: "month" },
  { name: "Year", mapper: "year" },
  { name: "Place", mapper: "place" },
  { name: "Number", mapper: "number" },
];

const findBirthdayById = (id: string, data: IBirthdays[]) =>
  data.find((birthday) => birthday.uuid === id) || null;

export default function Birthdays() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    id: string;
    organism: string;
    name?: string;
  } | null>(null);
  const [columnsData, setColumnsData] = useState<IBirthdays[]>(birthdaysData);
  const [userData, setUserData] = useState<IBirthdays[]>(columnsData);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const filteredData = columnsData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUserData(filteredData);
  }, [searchTerm]);

  const form = useForm<z.infer<typeof birthdayFormSchema>>({
    resolver: zodResolver(birthdayFormSchema),
    defaultValues: {
      uuid: "",
      username: "",
      day: 0,
      month: 0,
      year: 0,
      place: "",
      number: "",
    },
  });

  const formCreate = useForm<z.infer<typeof birthdayFormCreateSchema>>({
    resolver: zodResolver(birthdayFormCreateSchema),
    defaultValues: {
      username: "",
      day: 0,
      month: 0,
      year: 0,
      place: "",
      number: "",
    },
  });

  const handleCreate = () => {
    formCreate.clearErrors();

    formCreate.setValue("username", "");
    formCreate.setValue("day", 0);
    formCreate.setValue("month", 0);
    formCreate.setValue("year", 0);
    formCreate.setValue("place", "");
    formCreate.setValue("number", "");
  };

  const handleCreateSubmit = async (
    values: z.infer<typeof birthdayFormCreateSchema>
  ) => {
    try {
      console.log("Submit", values);
      // TODO: Add logic to save the edited member (e.g., API call)
    } catch (error) {
      console.error("Edit submission error:", error);
    }
  };

  const handleEdit = (id: string) => {
    const birthday = findBirthdayById(id, columnsData);
    if (birthday) {
      form.clearErrors();
      form.setValue("uuid", birthday.uuid);
      form.setValue("username", birthday.username);
      form.setValue("day", birthday.day);
      form.setValue("month", birthday.month);
      form.setValue("year", birthday.year);
      form.setValue("place", birthday.place);
      form.setValue("number", birthday.number);
    }
    setOpenEdit(true);
  };

  const handleEditSubmit = async (
    values: z.infer<typeof birthdayFormSchema>
  ) => {
    try {
      console.log("Submit", values);
      // TODO: Add logic to save the edited birthday (e.g., API call)
    } catch (error) {
      console.error("Edit submission error:", error);
    }
  };

  const handleDeletePopup = (id: string) => {
    const birthday = findBirthdayById(id, columnsData);
    if (birthday) {
      setDeleteData({ id, organism: "Birthday", name: birthday.username });
      setOpenDelete(true);
    }
  };

  const handleDelete = () => {
    if (deleteData) {
      setColumnsData(
        columnsData.filter((birthday) => birthday.uuid !== deleteData.id)
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
        <Button
          onClick={() => {
            setOpenCreate(true), handleCreate();
          }}
          className=" m-5 p-4"
        >
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
        <DialogCreate<z.infer<typeof birthdayFormCreateSchema>>
          open={openCreate}
          setOpen={() => setOpenCreate(false)}
          organism={"Member"}
          form={formCreate}
          onSubmit={handleCreateSubmit}
        />
      )}
      {openEdit && (
        <DialogEdit<z.infer<typeof birthdayFormSchema>>
          open={openEdit}
          setOpen={() => setOpenEdit(false)}
          organism={"Birthday"}
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
