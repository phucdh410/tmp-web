import { QueryClient } from "@tanstack/react-query";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 0,
      refetchOnWindowFocus: false,
    },
  },
});
