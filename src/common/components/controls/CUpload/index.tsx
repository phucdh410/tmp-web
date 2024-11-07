import { forwardRef, useState } from "react";

import { receiptsApi } from "@apis/receipts.api";
import { DOCUMENT_EXTENSION } from "@constants/variables";
import { noti } from "@funcs/toast";
import { CloudUploadOutlined, Preview } from "@mui/icons-material";
import { IconButton, InputAdornment, Stack } from "@mui/material";

import { CFormControl } from "../CFormControl";

import { CUploadButton, CUploadInput } from "./StyledComponent";
import { ICUploadProps, ICUploadRef, IFile } from "./types";

export const CUpload = forwardRef<ICUploadRef, ICUploadProps>(
  (
    { error, errorText, fullWidth = true, file: initialFile, ...props },
    ref
  ) => {
    //#region Data
    const [file, setFile] = useState<null | IFile>(initialFile ?? null);
    //#endregion

    //#region Event
    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target?.files?.[0];
      if (file) {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        const isValid = DOCUMENT_EXTENSION.includes(fileExtension || "");

        if (isValid) {
          try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await receiptsApi.uploadDocument(formData);

            const { extension, ..._file } = res.data.data;
            setFile(_file);
          } catch (error: any) {
            noti.error(error?.message ?? "Upload không thành công");
          } finally {
            event.target.value = "";
          }
        }
      }
    };

    const onPreview = () => {
      if (typeof window !== "undefined") {
        window.open(file?.url, "_blank");
      }
    };
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText} fullWidth={fullWidth}>
        <Stack direction="row">
          <CUploadInput
            readOnly
            placeholder="Select file to upload"
            fullWidth={fullWidth}
            value={file ? file.originalName : ""}
            endAdornment={
              file ? (
                <InputAdornment position="end">
                  <IconButton onClick={onPreview} color="primary" size="small">
                    <Preview fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
          />
          <CUploadButton startIcon={<CloudUploadOutlined />} component="label">
            Upload File
            <input type="file" hidden onChange={onFileChange} />
          </CUploadButton>
        </Stack>
      </CFormControl>
    );
    //#endregion
  }
);
