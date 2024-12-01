import { useState } from "react";
import { Button } from "../ui/button";
import { TableCell } from "../ui/table";
import { DialogDelete } from "../molecules/DialogDelete";
import PaginationTableEditButton from "./PaginationTableEditButton";
import { usePaginationTable } from "@/context/pagination-table";

interface Props<T extends { uuid: string }> {
  showEdit: boolean;
  showDelete: boolean;
  item: T;
}

const PaginationTableActions = <T extends { uuid: string }>(
  props: Props<T>
) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { organism, query, config } = usePaginationTable();

  const onDelete = async () => {
    await query.onDelete(props.item.uuid);
    setShowDeletePopup(false);
  };

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
        onDelete={onDelete}
        organism={organism}
        warningMessage={config.deleteWarningMessage}
        onCancel={() => setShowDeletePopup(false)}
      />
    </TableCell>
  );
};

export default PaginationTableActions;
