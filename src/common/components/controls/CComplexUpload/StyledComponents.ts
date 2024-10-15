import { Stack, styled } from "@mui/material";

export const CFileUploadWrapper = styled(Stack)(() => ({
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "16px",
  minWidth: 240,
  minHeight: 120,
  backgroundColor: "#f6f6f6",
  border: "3px dashed #b0b0b0",
  cursor: "pointer",
  "&.is-file-over": {
    borderColor: "#00e106",
  },
}));
