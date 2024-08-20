import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { client } from "@react-query/index.ts";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import theme from "./themes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
