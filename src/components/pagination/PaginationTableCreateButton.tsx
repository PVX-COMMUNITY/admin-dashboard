import React, { useState } from "react";
import { Button } from "../ui/button";
import { DialogCreate } from "../molecules/DialogCreate";
import { usePaginationTable } from "@/context/pagination-table";

const PaginationTableCreateButton = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const { organism, form, query } = usePaginationTable();

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
        onSubmit={(data) => {
          query
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .onCreate(data)
            .then(() => {
              setOpenCreate(false);
              form.reset();
            })
            .catch((error) => {
              const errorMessage = error.response.data;

              if (Array.isArray(errorMessage)) {
                errorMessage.forEach((error) => {
                  form.setError(error.source.pointer, {
                    message: error.detail,
                  });
                });
              }
            });
        }}
      />
    </React.Fragment>
  );
};

export default PaginationTableCreateButton;
