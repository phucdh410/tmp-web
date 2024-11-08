import { CAutocomplete } from "@controls";
import { Stack } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const MAutocompleteLoadMore = () => {
  const {
    data: options = [],
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["test"],
    queryFn: ({ pageParam: params }) =>
      axios.get("https://dummyjson.com/products", {
        params: { limit: params.per_page, skip: (params.page - 1) * 10 },
      }),
    select: (response) =>
      response.pages.flatMap((page) =>
        page.data.products.map((e: any) => ({ id: e.id, label: e.title }))
      ),
    initialPageParam: { page: 1, per_page: 10 },
    getNextPageParam: (lastPage, pages, lastPageParam) =>
      lastPageParam.page < 4
        ? {
            ...lastPageParam,
            page: lastPageParam.page + 1,
          }
        : undefined,
  });

  return (
    <Stack maxWidth={400}>
      <CAutocomplete
        loading={isFetching}
        options={options}
        loadMore={{
          hasMore: hasNextPage,
          fetchMore: fetchNextPage,
        }}
      />
    </Stack>
  );
};
