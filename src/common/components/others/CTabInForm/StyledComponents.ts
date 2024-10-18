import { styled, Tab, Tabs } from "@mui/material";

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  zIndex: 1,
  ".MuiTabs-indicator": {
    display: "none",
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "none",
  fontWeight: 500,
  fontSize: 16,
  "&.Mui-selected": {
    background: theme.palette.primary.main,
    color: "white",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
}));
