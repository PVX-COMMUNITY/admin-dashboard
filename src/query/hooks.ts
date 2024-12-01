import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";
import { PaginatedResponse } from "./types";
import { useSearchParams } from "react-router-dom";

interface PaginationParams {
  queryKey: string;
  url: string;
}

export const usePagination = <T>({ queryKey, url }: PaginationParams) => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const page = urlSearchParams.get("page") || "1";

  const goToPage = (page: number) => {
    setUrlSearchParams({ page: page.toString() });
  };

  const nextPage = () => {
    goToPage(parseInt(page) + 1);
  };

  const previousPage = () => {
    goToPage(parseInt(page) - 1);
  };

  const query = useQuery({
    queryKey: [queryKey, "_" + page],
    queryFn: () =>
      apiClient.get<PaginatedResponse<T>>(url, {
        params: { page },
      }),
  });

  return {
    data: query.data?.data.data || [],
    totalPages: query.data?.data.meta.last_page || 1,
    currentPage: query.data?.data.meta.current_page || 1,
    perPage: query.data?.data.meta.per_page || 10,
    total: query.data?.data.meta.total || 0,
    isLoading: query.isFetching,
    goToPage,
    nextPage,
    previousPage,
  };
};
