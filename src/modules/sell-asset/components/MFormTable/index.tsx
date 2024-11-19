import { useRef } from "react";
import { useFieldArray } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { WARRANTY_LEVELS_OPTIONS } from "@constants/options";
import { IAssetInSellAssetPayload } from "@interfaces/sell-assets";
import { DeleteForever, Edit } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { CTable } from "@others";

import { IMAssetFormRef } from "./MAssetForm/types";
import { MAssetForm } from "./MAssetForm";
import { IMFormTableProps } from "./types";

export const MFormTable = ({ control }: IMFormTableProps) => {
  //#region Data
  const assetFormRef = useRef<IMAssetFormRef>(null);

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "assets",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onAdd = (newAsset: IAssetInSellAssetPayload) => {
    append(newAsset);
  };

  const onSave = (index: number, updatedAsset: IAssetInSellAssetPayload) => {
    update(index, updatedAsset);
  };

  const onEdit = (index: number, editData: IAssetInSellAssetPayload) => () => {
    assetFormRef.current?.edit(index, editData);
  };

  const onRemove = (index: number) => () => {
    remove(index);
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInSellAssetPayload> = [
    {
      key: "code",
      label: "mã tài sản",
    },
    {
      key: "name",
      label: "tên CCDC",
      align: "left",
    },
    {
      key: "gia_nhap",
      label: "giá nhập",
      columnType: "number",
    },
    {
      key: "gia_ban",
      label: "giá bán",
      columnType: "number",
    },
    {
      key: "quantity",
      label: "số lượng",
      columnType: "number",
    },
    {
      key: "unit",
      label: "đơn vị tính",
    },
    {
      key: "total",
      label: "thành tiền",
      columnType: "number",
    },
    {
      key: "warranty_date",
      label: "ngày bảo hành",
    },
    {
      key: "warranty_duration",
      label: "thời gian bảo hành",
      cellRender: (value, record, index) => (
        <>
          {record.warranty_duration +
            (WARRANTY_LEVELS_OPTIONS.find((e) => e.id === record.warranty_level)
              ?.label ?? "")}
        </>
      ),
    },
    {
      key: "action",
      label: "",
      cellRender: (value, record, index) => (
        <Stack direction="row" gap={1} justifyContent="center">
          <IconButton
            size="small"
            color="primary"
            onClick={onEdit(index, record)}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={onRemove(index)}>
            <DeleteForever fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];
  return (
    <>
      <MAssetForm ref={assetFormRef} onAdd={onAdd} onSave={onSave} />
      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        data={fields}
        rowKey="__id"
        sx={{ my: 3 }}
      />
    </>
  );
  //#endregion
};
