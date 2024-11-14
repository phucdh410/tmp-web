import { forwardRef, useRef } from "react";

import { filesApi } from "@apis/files.api";
import { DOCUMENT_EXTENSION } from "@constants/variables";
import { noti } from "@funcs/toast";
import { IUploadResponse } from "@interfaces/upload";
import { CloudUploadOutlined } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";

import { CFileItem } from "./CFileItem";
import { CFileUploadWrapper } from "./StyledComponents";
import { ICComplexUploadProps, ICComplexUploadRef } from "./types";

export const CComplexUpload = forwardRef<
  ICComplexUploadRef,
  ICComplexUploadProps
>(({ value, onChange, ...props }, ref) => {
  //#region Data
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  //#endregion

  //#region Event
  const onCheckValid = (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isValid = DOCUMENT_EXTENSION.includes(fileExtension || "");
    if (isValid) return true;
    else {
      noti.error("Định dạng file không hợp lệ!");
      return false;
    }
  };

  const handleUpload = async (file: File) => {
    try {
      const res = await filesApi.upload(file);

      const fileUploaded: IUploadResponse = res.data.data;
      onChange?.([...value, fileUploaded]);
    } catch (error: any) {
      noti.error(error?.message ?? "Upload không thành công");
    }
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    const targetElement = event.target as HTMLDivElement;
    targetElement.classList.add("is-file-over");
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    const targetElement = event.target as HTMLDivElement;
    if (!targetElement.contains(event.relatedTarget as Node)) {
      //note: Dòng If này kiểm tra và tránh cho việc drag file
      //note: Qua chữ/icon trong component bị chạy event onDragLeave
      //note: Chỉ khi nào event này rời khỏi component cha thì mới tính
      targetElement.classList.remove("is-file-over");
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const targetElement = event.target as HTMLDivElement;

    targetElement.classList.remove("is-file-over");
    if (wrapperRef.current) wrapperRef.current.classList.remove("is-file-over");

    //note: Nếu muốn xóa hết className is-file-over
    //note: ở mọi element con thì dùng code này
    //note: const childElements = wrapperRef.current.querySelectorAll('.is-file-over');
    //note: childElements.forEach((element) => {
    //note:   element.classList.remove('is-file-over');
    //note: });

    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles.length > 0) {
      const isValid = onCheckValid(droppedFiles[0]);

      if (isValid) {
        handleUpload(droppedFiles[0]);
      }
    }
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files &&
      event.target.files?.length > 0 &&
      event.target.files[0]
    ) {
      const file = event.target.files[0];
      if (file) {
        const isValid = onCheckValid(file);

        if (isValid) {
          await handleUpload(file);

          event.target.value = "";
          fileRef.current!.value = "";
        }
      }
    }
  };

  const onClick = () => fileRef.current?.click();

  const onRemove = (id: number) => () => {
    onChange?.(value.filter((e) => (e as IUploadResponse).id !== id));
  };
  //#endregion

  //#region Render
  return (
    <>
      <Stack direction="column" gap={3}>
        <CFileUploadWrapper
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onClick={onClick}
          width="100%"
        >
          <CloudUploadOutlined
            htmlColor="#b0b0b0"
            sx={{ height: 60, width: 60 }}
          />
          <Typography
            fontWeight={500}
            color="#b0b0b0"
            sx={{ userSelect: "none" }}
          >
            Kéo & thả file vào đây
          </Typography>
        </CFileUploadWrapper>
        {value && value.length > 0 && (
          <>
            <Divider />
            <Stack direction="column">
              <Typography>Uploaded Files</Typography>
              {(value as IUploadResponse[]).map((e, i) => (
                <CFileItem
                  key={e.id}
                  fileData={e}
                  index={i}
                  onRemove={onRemove(e.id)}
                />
              ))}
            </Stack>
          </>
        )}
      </Stack>
      <input type="file" hidden ref={fileRef} onChange={onFileChange} />
    </>
  );
  //#endregion
});
