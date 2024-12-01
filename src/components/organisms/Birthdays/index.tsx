import {
  BirthdayFormSchema,
  birthdayFormSchema,
} from "@/components/organisms/Birthdays/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PaginationTable } from "@/components/pagination/PaginationTable";
import { Birthday } from "@/query/types";
import { PaginationTableProvider } from "@/context/pagination-table";

export default function Birthdays() {
  const form = useForm<BirthdayFormSchema>({
    resolver: zodResolver(birthdayFormSchema),
    defaultValues: {
      username: "",
      place: "",
      day: 0,
      month: 0,
      year: 0,
    },
  });

  return (
    <PaginationTableProvider<Birthday, BirthdayFormSchema>
      config={{ url: "/birthdays", queryKey: "birthdays" }}
      form={form}
      organism="Birthday"
      formSchema={birthdayFormSchema}
    >
      <PaginationTable<Birthday>
        columns={[
          { name: "Username", mapper: (data) => data.name },
          {
            name: "Date",
            mapper: (data) => {
              const formattedDate = `${data.month}/${data.date}/${data.year}`;
              const date = new Date(formattedDate);
              return date.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });
            },
          },
          { name: "Place", mapper: (data) => data.place },
        ]}
        allowedActions={["edit", "delete"]}
      />
    </PaginationTableProvider>
  );
}
