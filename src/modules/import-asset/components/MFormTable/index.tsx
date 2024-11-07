import { Controller, useFieldArray } from "react-hook-form";

import { filesApi } from "@apis/files.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { DOCUMENT_EXTENSION } from "@constants/variables";
import { CButton, CDatepicker, CInput } from "@controls";
import { noti } from "@funcs/toast";
import { IDocumentInImportAssetPayload } from "@interfaces/import-assets";
import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CFile, CTable } from "@others";
import dayjs from "dayjs";

import { IMFormTableProps } from "./types";

export const MFormTable = ({ control }: IMFormTableProps) => {
  //#region Data
  const { fields, remove, append } = useFieldArray({
    control,
    name: "documents",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const isValid = DOCUMENT_EXTENSION.includes(fileExtension || "");

      if (isValid) {
        try {
          const res = await filesApi.upload(file);

          const { id, original_name, url } = res.data.data;

          append({
            document_id: Number(id),
            code: "",
            date: dayjs().toDate(),
            note: "",
            url,
            original_name,
          });
        } catch (error: any) {
          noti.error(error?.message ?? "Upload không thành công");
        }
      } else {
        noti.error(
          "Định dạng file không hợp lệ (pdf, docx, xlsx, jpg, jpeg, png)"
        );
      }
      event.target.value = "";
    }
  };

  const onRemove = (index: number) => () => {
    remove(index);
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IDocumentInImportAssetPayload> = [
    {
      key: "date",
      label: "ngày chứng từ",
      width: 200,
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`documents.${index}.date`}
          render={({ field }) => <CDatepicker {...field} />}
        />
      ),
    },
    {
      key: "code",
      label: "số chứng từ",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`documents.${index}.code`}
          render={({ field, fieldState: { error } }) => (
            <CInput placeholder="Nhập số chứng từ" error={!!error} {...field} />
          )}
        />
      ),
    },
    {
      key: "note",
      label: "diễn giải",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`documents.${index}.note`}
          render={({ field, fieldState: { error } }) => (
            <CInput placeholder="Nhập diễn giải" error={!!error} {...field} />
          )}
        />
      ),
    },
    {
      key: "original_name",
      label: "file đính kèm",
      width: 350,
      cellRender: (value, record, index) => (
        <CFile fileName={value} url={record?.url ?? ""} />
      ),
    },
    {
      key: "action",
      label: "",
      cellRender: (value, record, index) => (
        <IconButton color="error" onClick={onRemove(index)}>
          <DeleteForever />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <CTable
        title="Nguồn gốc hình thành"
        showIndexCol={false}
        headerTransform="capitalize"
        headers={headers}
        rowKey="__id"
        data={fields}
      />
      <CButton
        component="label"
        sx={{ mb: 3, justifyContent: "start", width: "100%" }}
      >
        + Thêm chứng từ
        <input
          type="file"
          hidden
          accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
          onChange={onFileChange}
        />
      </CButton>
    </>
  );
  //#endregion
};
