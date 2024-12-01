import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./client";

function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
