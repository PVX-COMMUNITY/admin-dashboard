import React, { useState } from "react";
import { Button } from "../ui/button";
import { DialogCreate } from "../molecules/DialogCreate";
import { usePaginationTable } from "@/context/pagination-table";

const PaginationTableCreateButton = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const { organism, form } = usePaginationTable();

  const onCreate = () => {
    setOpenCreate(true);
  };

  return (
    <React.Fragment>
      <Button onClick={onCreate} className=" my-4 p-4 sm:m-5">
        Create
      </Button>
      <DialogCreate
        open={openCreate}
        setOpen={() => setOpenCreate(false)}
        organism={organism}
        form={form}
        onSubmit={() => {}}
      />
    </React.Fragment>
  );
};

export default PaginationTableCreateButton;
