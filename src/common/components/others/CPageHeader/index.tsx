import { useNavigate } from "react-router-dom";

import { CButton } from "@controls";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Typography } from "@mui/material";

import { ICPageHeaderProps } from "./types";

export const CPageHeader = ({
  back, //note: This is should a valid url to back a route page
  children,
  ...props
}: ICPageHeaderProps) => {
  //#region Data
  const navigate = useNavigate();
  //#endregion

  //#region Render
  return (
    <Typography variant="header-page" sx={{ position: "relative" }} {...props}>
      {children}
      {back && (
        <CButton
          variant="outlined"
          startIcon={<KeyboardArrowLeft />}
          onClick={() => navigate(back)}
          sx={{ position: "absolute", left: 0 }}
        >
          Trở về danh sách
        </CButton>
      )}
    </Typography>
  );
  //#endregion
};
