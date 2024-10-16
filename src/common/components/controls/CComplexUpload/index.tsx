import { useRef } from "react";

import { CloudUploadOutlined } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";

import { CFileItem } from "./CFileItem";
import { CFileUploadWrapper } from "./StyledComponents";
import { IFileItem } from ".";

const MOCKUP: IFileItem[] = [
  { id: "1", originalName: "file1.jpg", url: "something" },
  { id: "2", originalName: "file2.docx", url: "something" },
  { id: "3", originalName: "file3.gif", url: "something" },
  { id: "4", originalName: "file4.png", url: "something" },
  { id: "5", originalName: "file5.pdf", url: "something" },
  { id: "6", originalName: "file6.xlsx", url: "something" },
];

export const CComplexUpload = () => {
  //#region Data
  const wrapperRef = useRef<null | HTMLDivElement>(null);
  //#endregion

  //#region Event
  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    const targetElement = event.target as HTMLDivElement;
    targetElement.classList.add("is-file-over");
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    const targetElement = event.target as HTMLDivElement;
    if (!targetElement.contains(event.relatedTarget as Node)) {
      // Dòng If này kiểm tra và tránh cho việc drag file
      // Qua chữ/icon trong component bị chạy event onDragLeave
      // Chỉ khi nào event này rời khỏi component cha thì mới tính
      targetElement.classList.remove("is-file-over");
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const targetElement = event.target as HTMLDivElement;

    targetElement.classList.remove("is-file-over");
    if (wrapperRef.current) wrapperRef.current.classList.remove("is-file-over");

    // Nếu muốn xóa hết className is-file-over
    // ở mọi element con thì dùng code này
    // const childElements = wrapperRef.current.querySelectorAll('.is-file-over');
    // childElements.forEach((element) => {
    //   element.classList.remove('is-file-over');
    // });

    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles.length > 0) {
      // const isValid = validateFile(droppedFiles[0], 20, isDocument);

      // if (!isValid) return;

      console.log("Upload tại đây");
      // onUpload(droppedFiles[0]);
    }
  };

  const onFileChange = (e) => {
    if (event.target.files?.length > 0 && event.target.files[0]) {
      const fileUploaded = event.target.files[0];

      // const isValid = validateFile(fileUploaded, 20, isDocument);

      // if (!isValid) return;

      console.log("Upload tại đây");
      // onUpload(fileUploaded);
    }
  };
  //#endregion

  //#region Render
  return (
    <Stack direction="column" gap={3}>
      <CFileUploadWrapper
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
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
      <Divider />
      <Stack direction="column">
        <Typography>Uploaded Files</Typography>
        {MOCKUP.map((e, i) => (
          <CFileItem key={e.id} fileData={e} index={i} />
        ))}
      </Stack>
    </Stack>
  );
  //#endregion
};
