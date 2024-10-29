import { useMemo } from "react";

import { Divider, IconButton, Link, Stack } from "@mui/material";

import docIcon from "../assets/doc.svg";
import gifIcon from "../assets/gif.svg";
import jpgIcon from "../assets/jpg.svg";
import pdfIcon from "../assets/pdf.svg";
import pngIcon from "../assets/png.svg";
import xlsIcon from "../assets/xls.svg";

import { ICFileItemProps } from "./types";

const iconMap: { [key: string]: string } = {
  doc: docIcon,
  docx: docIcon,
  gif: gifIcon,
  jpg: jpgIcon,
  pdf: pdfIcon,
  png: pngIcon,
  xls: xlsIcon,
  xlsx: xlsIcon,
};

export const CFileItem = ({ fileData, index, onRemove }: ICFileItemProps) => {
  //#region Data
  const extension = useMemo(() => {
    if (fileData?.extension) {
      return fileData.extension;
    } else {
      return fileData.original_name.split(".").pop() ?? "";
    }
  }, [fileData]);
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <>
      {index !== 0 && <Divider />}
      <Stack
        direction="row"
        py={0.75}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center">
          <Stack
            component="img"
            src={iconMap[extension]}
            alt=""
            height={40}
            width={40}
          />
          <Link
            fontSize={14}
            overflow="hidden"
            textOverflow="ellipsis"
            href={fileData.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: "none" }}
          >
            {fileData.original_name}
          </Link>
        </Stack>
        <IconButton onClick={onRemove}>
          <i
            className="fa-regular fa-trash-can-xmark"
            style={{ color: "#ff5252" }}
          ></i>
        </IconButton>
      </Stack>
    </>
  );
  //#endregion
};
