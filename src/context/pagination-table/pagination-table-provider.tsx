import PaginationTableContext, {
  PaginationTableProps,
} from "./pagination-table-context";
import type { FieldValues } from "react-hook-form";
import { usePagination } from "@/query/hooks";

interface Props<S extends FieldValues> extends PaginationTableProps<S> {
  children: React.ReactNode;
}

const PaginationTableProvider = <
  T extends { id: string },
  S extends FieldValues,
>(
  props: Props<S>
) => {
  const query = usePagination<T>(props.config);

  return (
    <PaginationTableContext.Provider
      key={props.config.queryKey}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value={{
        ...props,
        query,
        type: "pagination-table",
      }}
    >
      {props.children}
    </PaginationTableContext.Provider>
  );
};

export default PaginationTableProvider;
