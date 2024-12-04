import { QueryClient, QueryKey, SetDataOptions } from "@tanstack/react-query";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export const setQueryData = (
  queryKey: QueryKey,
  updater: unknown,
  options?: SetDataOptions
) => client.setQueryData(queryKey, updater, options);
