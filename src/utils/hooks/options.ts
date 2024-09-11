import { categoriesApi } from "@apis/categories.api";
import { propertiesApi } from "@apis/properties.api";
import { storesApi } from "@apis/stores.api";
import { unitsApi } from "@apis/units.api";
import { vendorsApi } from "@apis/vendors.api";
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

export const useGetAllVendors = () => {
  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-nha-cung-cap"],
    queryFn: () => vendorsApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, id: e?.id, label: e?.name })),
  });

  return { vendors: data ? data : [], refetch };
};

export const useGetAllCategories = () => {
  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-loai-ccdc"],
    queryFn: () => categoriesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, id: e?.code, label: e?.name })),
  });

  return { categories: data ? data : [], refetch };
};

export const useGetAllProperties = () => {
  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-thuoc-tinh"],
    queryFn: () => propertiesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, id: e?.id, label: e?.name })),
  });

  return { properties: data ? data : [], refetch };
};

export const useGetAllUnits = () => {
  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-don-vi-tinh"],
    queryFn: () => unitsApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, id: e?.id, label: e?.name })),
  });

  return { units: data ? data : [], refetch };
};
