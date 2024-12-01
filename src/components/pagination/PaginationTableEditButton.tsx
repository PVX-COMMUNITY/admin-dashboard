import React, { useState } from "react";
import { DialogEdit } from "../molecules/DialogEdit";
import { usePaginationTable } from "@/context/pagination-table";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

interface Props<T> {
  item: T;
}

const PaginationTableEditButton = <T extends { uuid: string }>(
  props: Props<T>
) => {
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const { formSchema, organism } = usePaginationTable();

  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props.item,
  });

  return (
    <React.Fragment>
      <Button onClick={() => setEditPopupVisible(true)} className="ml-6">
        Edit
      </Button>
      <DialogEdit
        open={editPopupVisible}
        setOpen={() => setEditPopupVisible(false)}
        organism={organism}
        form={editForm}
        onSubmit={() => {}}
      />
    </React.Fragment>
  );
};

export default PaginationTableEditButton;
