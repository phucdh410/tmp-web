import { storesApi } from "@apis/stores.api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllStores = () => {
  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-chi-nhanh"],
    queryFn: () => storesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, id: e?.code, label: e?.name })),
  });

  return { stores: data ? data : [], refetch };
};
