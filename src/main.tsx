import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import "@/index.css";
import QueryProvider from "./query/provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>
);
