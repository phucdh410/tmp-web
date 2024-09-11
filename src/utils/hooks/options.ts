import { donvitinhApi } from "@apis/donvitinh.api";
import { loaiccdcApi } from "@apis/loaiccdc.api";
import { nhacungcapApi } from "@apis/nhacungcap.api";
import { storesApi } from "@apis/stores.api";
import { thuoctinhApi } from "@apis/thuoctinh.api";
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

export const useGetAllnhacungcap = () => {
  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-nha-cung-cap"],
    queryFn: () => nhacungcapApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, id: e?.code, label: e?.name })),
  });

  return { nhacungcap: data ? data : [], refetch };
};

export const useGetAllloaiccdc = () => {
  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-loai-ccdc"],
    queryFn: () => loaiccdcApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, id: e?.code, label: e?.name })),
  });

  return { loaiccdc: data ? data : [], refetch };
};

export const useGetAllthuoctinh = () => {
  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-thuoc-tinh"],
    queryFn: () => thuoctinhApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, id: e?.code, label: e?.name })),
  });

  return { thuoctinh: data ? data : [], refetch };
};

export const useGetAlldonvitinh = () => {
  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-don-vi-tinh"],
    queryFn: () => donvitinhApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, id: e?.code, label: e?.name })),
  });

  return { donvitinh: data ? data : [], refetch };
};
