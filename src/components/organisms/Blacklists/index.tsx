import {
  blacklistFormSchema,
  BlacklistFormSchema,
} from "@/components/organisms/Blacklists/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PaginationTable } from "@/components/pagination/PaginationTable";
import { Blacklist } from "@/query/types";
import { PaginationTableProvider } from "@/context/pagination-table";

export default function Birthdays() {
  const form = useForm<BlacklistFormSchema>({
    resolver: zodResolver(blacklistFormSchema),
    defaultValues: {
      number: "",
      reason: "",
      admin: "",
    },
  });

  return (
    <PaginationTableProvider<Blacklist, BlacklistFormSchema>
      config={{ url: "/blacklists", queryKey: "blacklists" }}
      form={form}
      organism="Blacklist"
      formSchema={blacklistFormSchema}
    >
      <PaginationTable<Blacklist>
        columns={[
          { name: "Number", mapper: (data) => data.number },
          { name: "Reason", mapper: (data) => data.reason },
          { name: "Admin", mapper: (data) => data.admin },
        ]}
        allowedActions={["edit", "delete"]}
      />
    </PaginationTableProvider>
  );
}
