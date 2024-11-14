import { categoriesApi } from "@apis/categories.api";
import { outsidesApi } from "@apis/outsides.api";
import { placesApi } from "@apis/places.api";
import { propertiesApi } from "@apis/properties.api";
import { regionsApi } from "@apis/regions.api";
import { roomGroupSuggestApi } from "@apis/room-group-suggests.api";
import { storesApi } from "@apis/stores.api";
import { unitsApi } from "@apis/units.api";
import { vendorsApi } from "@apis/vendors.api";
import { warehousesApi } from "@apis/warehouses.api";
import { IPlaceResponse } from "@interfaces/places";
import { IRegionResponse } from "@interfaces/regions";
import { IRoomGroup } from "@interfaces/room-group-suggests";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface IMoreOptions<T>
  extends Omit<
    UseQueryOptions<AxiosResponse<{ data: T[] }>>,
    "queryKey" | "queryFn" | "select"
  > {}

//note: LẤY DANH SÁCH TẤT CẢ CHI NHÁNH
export const useGetAllStores = () => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-chi-nhanh"],
    queryFn: () => storesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, id: e?.code, label: e?.name })),
  });

  return { stores: data ? data : [], refetch, loading: isFetching };
};

//note: LẤY DANH SÁCH TẤT CẢ NHÀ CUNG CẤP
export const useGetAllVendors = () => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-nha-cung-cap"],
    queryFn: () => vendorsApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, label: e?.name })),
  });

  return { vendors: data ? data : [], refetch, loading: isFetching };
};

//note: LẤY DANH SÁCH TẤT CẢ LOẠI CÔNG CỤ DỤNG CỤ
export const useGetAllCategories = () => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-loai-ccdc"],
    queryFn: () => categoriesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, label: e?.name })),
  });

  return { categories: data ? data : [], refetch, loading: isFetching };
};

//note: LẤY DANH SÁCH TẤT CẢ THUỘC TÍNH
export const useGetAllProperties = () => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-thuoc-tinh"],
    queryFn: () => propertiesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, label: e?.name })),
  });

  return { properties: data ? data : [], refetch, loading: isFetching };
};

//note: LẤY DANH SÁCH TẤT CẢ ĐƠN VỊ TÍNH
export const useGetAllUnits = () => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-don-vi-tinh"],
    queryFn: () => unitsApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, id: e?.name, label: e?.name })),
  });

  return { units: data ? data : [], refetch, loading: isFetching };
};

//note: LẤY DANH SÁCH TẤT CẢ KHU VỰC
export const useGetAllPlaces = (
  params?: { store_code: string },
  moreOptions?: IMoreOptions<IPlaceResponse>
) => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-khu-vuc", params],
    queryFn: () => placesApi.getAll(params),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, label: e?.name })),
    ...moreOptions,
  });

  return { places: data ? data : [], refetch, loading: isFetching };
};

//note: LẤY DANH SÁCH TẤT CẢ VỊ TRÍ
export const useGetAllRegions = (
  params?: { store_code: string },
  moreOptions?: IMoreOptions<IRegionResponse>
) => {
  const { data, refetch, isFetching } = useQuery({
    ...moreOptions,
    queryKey: ["danh-sach-vi-tri-phan-bo", params],
    queryFn: () => regionsApi.getAll(params),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, label: e?.name })),
  });

  return { regions: data ? data : [], refetch, loading: isFetching };
};

//note: LẤY DANH SÁCH TẤT CẢ NHÓM PHÒNG
export const useGetAllRoomGroups = (
  params?: { store_code: string },
  moreOptions?: IRoomGroup
) => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-nhom-phong", params],
    queryFn: () => roomGroupSuggestApi.getAll(params),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, label: e?.name })),
    ...moreOptions,
  });

  return { roomGroups: data ? data : [], refetch, loading: isFetching };
};

//note: LẤY DANH SÁCH TẤT CẢ KHO TÀI SẢN
export const useGetAllWarehouses = () => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-kho"],
    queryFn: () => warehousesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, label: e?.name })),
  });

  return { warehouses: data ? data : [], refetch, loading: isFetching };
};

//note: LẤY DANH SÁCH TẤT CẢ PHIẾU ĐỀ XUẤT MUA HÀNG
export const useGetAllPurchaseProposals = () => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-phieu-de-xuat-mua-hang"],
    queryFn: () => outsidesApi.getAllAssetProposals(),
    select: (response) =>
      response.data.data?.map((e) => ({
        id: e.document_code,
        label: e.document_code,
      })),
  });

  return { purchaseProposals: data ? data : [], refetch, loading: isFetching };
};
