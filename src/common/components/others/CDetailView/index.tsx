import { useNavigate } from "react-router-dom";

import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { CButton } from "@controls";
import { IUploadResponse } from "@interfaces/upload";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

import { CFile } from "../CFile";

export const CDetailBack = ({ url }: { url: string }) => {
  const navigate = useNavigate();
  return (
    <CButton
      startIcon={<KeyboardArrowLeft />}
      variant="outlined"
      onClick={() => navigate(url)}
      sx={{ width: "fit-content" }}
    >
      Trở về danh sách
    </CButton>
  );
};

export const CDetailLabel = ({ label }: { label: string }) => {
  return (
    <Typography component="span" minWidth={260}>
      {label}:
    </Typography>
  );
};

export const CDetailValue = ({
  value,
  type = "string",
  options,
}: {
  value: any;
  type?: "number" | "date" | "datetime" | "file" | "option" | "string";
  options?: IAutocompleteOption[];
}) => {
  switch (type) {
    case "option":
      return (
        <Typography component="span" fontWeight={500}>
          {options!.find((e) => e.id === value)?.label ?? ""}
        </Typography>
      );
    case "file":
      return (
        <>
          {value?.map((e: IUploadResponse) => (
            <CFile key={e?.id} fileName={e?.original_name} url={e?.url} />
          ))}
        </>
      );
    case "date":
      return (
        <Typography component="span" fontWeight={500}>
          {dayjs(value).format("DD/MM/YYYY")}
        </Typography>
      );
    case "datetime":
      return (
        <Typography component="span" fontWeight={500}>
          {dayjs(value).format("DD/MM/YYYY HH:mm:ss")}
        </Typography>
      );
    case "number":
      return (
        <Typography component="span" fontWeight={500}>
          {value?.toLocaleString()}
        </Typography>
      );
    default:
      return (
        <Typography component="span" fontWeight={500}>
          {value}
        </Typography>
      );
  }
};
