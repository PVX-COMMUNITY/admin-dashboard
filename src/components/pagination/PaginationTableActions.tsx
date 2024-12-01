import { useState } from "react";
import { Button } from "../ui/button";
import { TableCell } from "../ui/table";
import { DialogDelete } from "../molecules/DialogDelete";
import PaginationTableEditButton from "./PaginationTableEditButton";
import { usePaginationTable } from "@/context/pagination-table";

interface Props<T extends { id: string }> {
  showEdit: boolean;
  showDelete: boolean;
  item: T;
}

const PaginationTableActions = <T extends { id: string }>(props: Props<T>) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { organism } = usePaginationTable();

  return (
    <TableCell className="text-right flex justify-end">
      {props.showEdit && <PaginationTableEditButton item={props.item} />}
      {props.showDelete && (
        <Button onClick={() => setShowDeletePopup(true)} className="ml-6">
          Delete
        </Button>
      )}
      <DialogDelete
        open={showDeletePopup}
        setOpen={() => setShowDeletePopup(false)}
        onDelete={() => {}}
        organism={organism}
        onCancel={() => setShowDeletePopup(false)}
      />
    </TableCell>
  );
};

export default PaginationTableActions;
