import {
  MemberFormSchema,
  memberFormSchema,
} from "@/components/organisms/Members/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PaginationTable } from "@/components/pagination/PaginationTable";
import { Member } from "@/query/types";
import { PaginationTableProvider } from "@/context/pagination-table";

export default function Members() {
  const form = useForm<MemberFormSchema>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      username: "",
      number: "",
      donation: 0,
    },
  });

  return (
    <PaginationTableProvider<Member, MemberFormSchema>
      config={{ url: "/members", queryKey: "members" }}
      form={form}
      organism="Member"
      formSchema={memberFormSchema}
    >
      <PaginationTable<Member>
        columns={[
          { name: "Username", mapper: (data) => data.name },
          { name: "Number", mapper: (data) => data.number },
          { name: "Donation", mapper: (data) => data.donation },
        ]}
        allowedActions={["edit", "delete"]}
      />
    </PaginationTableProvider>
  );
}
