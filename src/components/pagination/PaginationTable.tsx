import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React, { useMemo } from "react";
import { Loader } from "lucide-react";
import PaginationTableHeader from "./PaginationTableHeader";
import { usePaginationTable } from "@/context/pagination-table";
import PaginationTableActions from "./PaginationTableActions";
interface Props<T> {
  allowedActions?: string[];
  columns: {
    name: string;
    mapper: (data: T) => string | number | React.ReactNode;
  }[];
}

export function PaginationTable<T extends { id: string }>(props: Props<T>) {
  const { query } = usePaginationTable();

  const showPrevious = query.currentPage > 1;
  const showNext = query.currentPage < query.totalPages;

  const visiblePages = useMemo(() => {
    const pages = [];
    const current = query.currentPage;
    const total = query.totalPages;
    pages.push(1);
    const start = Math.max(2, current - 2);
    const end = Math.min(total - 1, current + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (total > 1) {
      pages.push(total);
    }

    const withEllipsis = [];
    for (let i = 0; i < pages.length; i++) {
      if (i > 0 && pages[i] - pages[i - 1] > 1) {
        withEllipsis.push("...");
      }
      withEllipsis.push(pages[i]);
    }

    return withEllipsis;
  }, [query.currentPage, query.totalPages]);

  const [showEdit, showDelete] = useMemo(() => {
    const check = (action: string) => !!props.allowedActions?.includes(action);
    return [check("edit"), check("delete")];
  }, [props.allowedActions]);

  return (
    <React.Fragment>
      <PaginationTableHeader />
      <Table className="overflow-hidden bg-secondary tr">
        <TableHeader>
          <TableRow className="border-border-color">
            <TableHead>SNo</TableHead>
            {props.columns.map((column, index) => (
              <TableHead key={index}>{column.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {query.isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={props.columns.length + 2}
                className="h-[530px]"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Loader className="h-8 w-8 animate-spin" />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {query.data.map((columnData, columnDataIndex) => (
              <TableRow key={columnDataIndex} className="border-border-color">
                <TableCell className="font-medium">
                  {columnDataIndex + 1}
                </TableCell>
                {props.columns.map((column) => {
                  return (
                    <TableCell
                      onClick={() => {
                        console.log(columnData);
                      }}
                      className="font-medium"
                      key={columnData.id + column.name + columnDataIndex}
                    >
                      {column.mapper(columnData as T)}
                    </TableCell>
                  );
                })}
                <PaginationTableActions
                  showEdit={showEdit}
                  showDelete={showDelete}
                  item={columnData}
                />
              </TableRow>
            ))}
          </TableBody>
        )}
        <TableFooter className="border-none bg-primary">
          <TableRow className="border-border-color">
            <TableCell colSpan={props.columns.length + 2}>
              <Pagination>
                <PaginationContent>
                  {showPrevious && (
                    <PaginationItem>
                      <PaginationPrevious
                        className="cursor-pointer"
                        onClick={() => query.previousPage()}
                      />
                    </PaginationItem>
                  )}

                  {visiblePages.map((page, index) =>
                    page === "..." ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem
                        key={page}
                        className="cursor-pointer"
                        onClick={() => query.goToPage(page as number)}
                      >
                        <PaginationLink isActive={query.currentPage === page}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  {showNext && (
                    <PaginationItem>
                      <PaginationNext
                        className="cursor-pointer"
                        onClick={() => query.nextPage()}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </React.Fragment>
  );
}
