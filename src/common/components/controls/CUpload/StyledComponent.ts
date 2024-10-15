import { OutlinedInput, styled } from "@mui/material";

import { CButton } from "../CButton";

export const CUploadInput = styled(OutlinedInput)(() => ({
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  fontSize: 16,
  paddingRight: "2px!important",
  "input.MuiOutlinedInput-input": {
    padding: "10px 20px",
    paddingRight: "inherit!important",
    height: "unset",
    lineHeight: "22px",
    overflow: "hidden!important",
    textOverflow: "ellipsis!important",
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderRight: "0!important",
  },
}));

export const CUploadButton = styled(CButton)(() => ({
  flexShrink: 0,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  boxShadow: "none!important",
  letterSpacing: "0.03rem!important",
  fontSize: "14px!important",
  padding: "6px 10px 6px 12px!important",
  ".MuiSvgIcon-root": {
    fontSize: "28px!important",
  },
}));
