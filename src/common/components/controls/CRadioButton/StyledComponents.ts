import { FormControlLabel, Radio, styled } from "@mui/material";

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginRight: "22px",
}));

export const StyledRadio = styled(Radio)(({ theme }) => ({
  padding: "6px",
  "&.Mui-checked": {
    "svg.MuiSvgIcon-root": {
      '&[data-testid="RadioButtonCheckedIcon"]': {
        transform: "scale(1.3)",
      },
    },
  },
}));
