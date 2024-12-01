import {
  groupFormSchema,
  GroupFormSchema,
} from "@/components/organisms/Groups/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PaginationTable } from "@/components/pagination/PaginationTable";
import { Group } from "@/query/types";
import { PaginationTableProvider } from "@/context/pagination-table";

export default function Birthdays() {
  const form = useForm<GroupFormSchema>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      gname: "",
      link: "",
      commands_disabled: "",
    },
  });

  return (
    <PaginationTableProvider<Group, GroupFormSchema>
      config={{ url: "/groups", queryKey: "groups" }}
      form={form}
      organism="Group"
      formSchema={groupFormSchema}
    >
      <PaginationTable<Group>
        columns={[
          { name: "Name", mapper: (data) => data.name },
          { name: "Link", mapper: (data) => data.link },
          {
            name: "Commands Disabled",
            mapper: (data) => data.commands_disabled.join(", "),
          },
        ]}
        allowedActions={["edit", "delete"]}
      />
    </PaginationTableProvider>
  );
}
