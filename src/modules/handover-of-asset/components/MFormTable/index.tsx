import { Controller, useFieldArray } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CDatepicker, CInput, CUpload } from "@controls";
import { IAssetInHandoverPayload } from "@interfaces/handover-of-assets";
import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CTable } from "@others";
import dayjs from "dayjs";

import { IMFormTableProps } from "./types";

export const MFormTable = ({ control }: IMFormTableProps) => {
  //#region Data
  const { fields, append, remove } = useFieldArray({
    control,
    name: "assets",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onAdd = () =>
    append({
      name: "",
      file_id: "",
      ngay_ban_giao: dayjs().toDate(),
      nguoi_nhan_ban_giao: "",
      note: "",
      reason: "",
    });

  const onRemove = (index: number) => () => remove(index);
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInHandoverPayload> = [
    {
      key: "name",
      label: "tài sản bàn giao",
      align: "left",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}.name`}
          render={({ field, fieldState: { error } }) => (
            <CInput {...field} error={!!error} />
          )}
        />
      ),
    },
    {
      key: "ngay_ban_giao",
      label: "ngày bàn giao",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}.ngay_ban_giao`}
          render={({ field, fieldState: { error } }) => (
            <CDatepicker {...field} error={!!error} />
          )}
        />
      ),
    },
    {
      key: "nguoi_nhan_ban_giao",
      label: "người nhận bàn giao",
      align: "left",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}.nguoi_nhan_ban_giao`}
          render={({ field, fieldState: { error } }) => (
            <CInput {...field} error={!!error} />
          )}
        />
      ),
    },
    {
      key: "reason",
      label: "lý do bàn giao",
      align: "left",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}.reason`}
          render={({ field, fieldState: { error } }) => (
            <CInput {...field} error={!!error} />
          )}
        />
      ),
    },
    {
      key: "note",
      label: "mô tả",
      align: "left",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}.note`}
          render={({ field, fieldState: { error } }) => (
            <CInput {...field} error={!!error} />
          )}
        />
      ),
    },
    {
      key: "file_id",
      label: "upload file",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}.file_id`}
          render={({ field, fieldState: { error } }) => (
            <CUpload {...field} error={!!error} />
          )}
        />
      ),
    },
    {
      key: "action",
      label: "thao tác",
      cellRender: (value, record, index) => (
        <IconButton color="error" onClick={onRemove(index)}>
          <DeleteForever />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <CButton
        fullWidth={false}
        onClick={onAdd}
        variant="outlined"
        sx={{
          mb: 0.2,
          maxWidth: 150,
          zIndex: 1,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        Thêm
      </CButton>
      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        data={fields}
        rowKey="__id"
      />
    </>
  );
  //#endregion
};
