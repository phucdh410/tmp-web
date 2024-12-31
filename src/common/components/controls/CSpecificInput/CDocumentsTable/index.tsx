import {
  ArrayPath,
  Controller,
  FieldArray,
  Path,
  useFieldArray,
} from "react-hook-form";

import { filesApi } from "@apis/files.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CDatepicker, CInput } from "@controls";
import { noti } from "@funcs/toast";
import { IDocumentInPayload } from "@interfaces/documents";
import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CFile, CTable } from "@others";
import dayjs from "dayjs";

import { ICDocumentsTableProps, IDocuments } from "./types";

export const CDocumentsTable = <T extends IDocuments>({
  control,
  hideTitle,
}: ICDocumentsTableProps<T>) => {
  //#region Data
  const { fields, remove, append } = useFieldArray({
    control,
    name: "documents" as ArrayPath<T>,
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;

    if (filesList && filesList?.length > 0) {
      try {
        const res = await filesApi.upload(filesList);

        if (res.data.data) {
          const filesResponse = res.data.data.map(
            (e) =>
              ({
                document_id: e.id,
                code: "",
                date: dayjs().toDate(),
                note: "",
                url: e.url,
                original_name: e.original_name,
              } as FieldArray<T, ArrayPath<T>>)
          );
          append(filesResponse);
        }
      } catch (error: any) {
        noti.error(error?.message ?? "Upload không thành công");
      }

      event.target.value = "";
    }
  };

  const onRemove = (index: number) => () => {
    remove(index);
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IDocumentInPayload> = [
    {
      key: "date",
      label: "ngày chứng từ",
      width: 200,
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`documents.${index}.date` as Path<T>}
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
          name={`documents.${index}.code` as Path<T>}
          render={({ field, fieldState: { error } }) => (
            <CInput placeholder="Nhập số chứng từ" error={!!error} {...field} />
          )}
        />
      ),
    },
    {
      key: "note",
      label: "diễn giải",
      isMultilineCell: true,
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`documents.${index}.note` as Path<T>}
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
        title={hideTitle ? undefined : "Nguồn gốc hình thành"}
        showIndexCol={false}
        headerTransform="capitalize"
        headers={headers}
        rowKey="__id"
        data={fields as unknown as IDocumentInPayload[]}
      />
      <CButton
        component="label"
        sx={{ mb: 3, justifyContent: "start", width: "100%" }}
      >
        + Thêm chứng từ
        <input
          multiple
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
