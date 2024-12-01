import { usePagination } from "@/query/hooks";
import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { z } from "zod";

export interface PaginationTableProps<S extends FieldValues> {
  form: UseFormReturn<S>;
  config: {
    url: string;
    queryKey: string;
  };
  organism: string;
  formSchema: z.ZodSchema<S>;
}

interface PaginationTableContextType<
  T extends { uuid: string },
  S extends FieldValues,
> extends PaginationTableProps<S> {
  type: string;
  query: ReturnType<typeof usePagination<T>>;
}

const PaginationTableContext = createContext<
  PaginationTableContextType<{ uuid: string }, FieldValues> | undefined
>(undefined);

export default PaginationTableContext;
