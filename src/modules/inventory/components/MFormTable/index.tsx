import { useRef, useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

import { regionsApi } from "@apis/regions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CAutocomplete, CButton, CButtonGroup } from "@controls";
import { IAssetInAll } from "@interfaces/assets";
import { IAssetInInventoryPayload } from "@interfaces/inventories";
import { AddCircleOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CFormInputWrapper, CFormLabel, CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import { IMAssetInfoModalRef } from "./MAssetInfoModal/types";
import { IMAssetsSelectionModalRef } from "./MAssetsSelectionModal/types";
import { MAssetInfoModal } from "./MAssetInfoModal";
import { MAssetsSelectionModal } from "./MAssetsSelectionModal";
import { IMFormTableProps } from "./types";

export const MFormTable = ({ control }: IMFormTableProps) => {
  //#region Data
  const infoModalRef = useRef<IMAssetInfoModalRef>(null);
  const selectionModalRef = useRef<IMAssetsSelectionModalRef>(null);

  const store_code = useWatch({ control, name: "store_code" });

  const { data: regions = [] } = useQuery({
    queryKey: ["danh-sach-vi-tri-theo-chi-nhanh", store_code],
    queryFn: () => regionsApi.getAll({ store_code }),
    enabled: !!store_code,
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e.id, label: e.name })),
  });

  const [regionId, setRegionId] = useState<"" | number>("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "assets",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onRegionChange = (newValue: any) => setRegionId(newValue);

  const onOpenAddModal = () => selectionModalRef.current?.open();

  const onSaveAssets = (newAsset: IAssetInAll[]) => {};

  const onRemoveAsset = (index: number) => () => remove(index);
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInInventoryPayload> = [
    {
      key: "code",
      label: "mã tài sản",
      align: "left",
    },
    {
      key: "name",
      label: "tên tài sản",
      align: "left",
    },
    {
      key: "vi_tri",
      label: "vị trí",
      align: "left",
    },
    {
      key: "so_luong_so_sach",
      label: "số lượng\nsổ sách",
      align: "right",
      columnType: "number",
    },
    {
      key: "nguyen_gia",
      label: "nguyên giá",
      align: "right",
      columnType: "number",
    },
    {
      key: "gia_tri_con_lai",
      label: "giá trị\ncòn lại",
      align: "right",
      columnType: "number",
    },
    {
      key: "so_luong_kiem_ke",
      label: "số lượng\nkiểm kê",
      align: "right",
      columnType: "number",
    },
    {
      key: "chat_luong",
      label: "chất lượng",
    },
    {
      key: "kien_nghi_xu_ly",
      label: "kiến nghị\nxử lý",
    },
    {
      key: "note",
      label: "ghi chú",
      align: "left",
    },
    {
      key: "action",
      label: "",
      render: () => (
        <IconButton onClick={onOpenAddModal} sx={{ color: "#ffffff" }}>
          <AddCircleOutline sx={{ color: "inherit" }} />
        </IconButton>
      ),
      cellRender: (value, record, index) => (
        <CButtonGroup className="table-actions" variant="text">
          <CButton>Sửa</CButton>
          <CButton onClick={onRemoveAsset(index)}>Xóa</CButton>
        </CButtonGroup>
      ),
    },
  ];
  return (
    <>
      <CFormInputWrapper
        percent={{ label: 20, input: 80 }}
        maxWidth={450}
        px={4}
        mb={2}
      >
        <CFormLabel>Vị trí</CFormLabel>
        <CAutocomplete
          options={regions}
          optionAll
          value={regionId}
          onChange={onRegionChange}
        />
      </CFormInputWrapper>
      <CTable
        showIndexCol={false}
        rowKey="__id"
        headers={headers}
        data={fields}
        headerTransform="capitalize"
        headerMultiline
      />

      <MAssetInfoModal ref={infoModalRef} />
      <MAssetsSelectionModal
        ref={selectionModalRef}
        store_code={store_code}
        onGetAssets={onSaveAssets}
      />
    </>
  );
  //#endregion
};
