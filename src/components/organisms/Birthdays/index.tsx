import { DialogDelete } from "@/components/molecules/DialogDelete";
import { DialogEdit } from "@/components/molecules/DialogEdit";
import { TableCustom } from "@/components/molecules/TableCustom";
import { useState } from "react";
import birthdaysData from "@/utils/data/birthdays.json";
import { birthdayFormSchema } from "@/components/organisms/Birthdays/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

export default function Birthdays() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    id: string;
    oragnism: string;
    name: string | undefined;
  } | null>(null);

  const columnsName = [
    { name: "Name", mapper: "name" },
    { name: "Username", mapper: "username" },
    { name: "Day", mapper: "day" },
    { name: "Month", mapper: "month" },
    { name: "Year", mapper: "year" },
    { name: "Place", mapper: "place" },
    { name: "Number", mapper: "number" },
  ];

  const [columnsData, setColumnsData] = useState<IBirthdays[]>(birthdaysData);

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

  const handleEdit = (id: string) => {
    console.log(`Edit item with ID: ${id}`);
    setOpenEdit(true);

    const data = columnsData.find((column) => column.uuid === id);
    if (data) {
      form.clearErrors();
      form.setValue("uuid", data.uuid);
      form.setValue("username", data.username);
      form.setValue("day", data.day);
      form.setValue("month", data.month);
      form.setValue("year", data.year);
      form.setValue("place", data.place);
      form.setValue("number", data.number);
    }
  };

  const handleEditSubmit = (values: z.infer<typeof birthdayFormSchema>) => {
    console.log("Submit", values);
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
      {openEdit && (
        <DialogEdit<z.infer<typeof birthdayFormSchema>>
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
