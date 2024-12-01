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
  const search = urlSearchParams.get("search") || "";

  const goToPage = (page: number) => {
    setUrlSearchParams({ page: page.toString() });
  };

  const nextPage = () => {
    goToPage(parseInt(page) + 1);
  };

  const previousPage = () => {
    goToPage(parseInt(page) - 1);
  };

  const prefix = (value: string) => `_${value}`;

  const query = useQuery({
    queryKey: [queryKey, prefix(page), prefix(search)],
    staleTime: 1000 * 60 * 5,
    queryFn: () => {
      return apiClient.get<PaginatedResponse<T>>(url, {
        params: { page, search },
      });
    },
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
