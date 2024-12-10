import { MenuItem, styled } from "@mui/material";

export const MenuTabItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  borderRadius: "6px",
  "&:hover": {
    background: "#1399E218",
  },
  "&.Mui-selected": {
    color: "#ffffff",
    background: theme.palette.primary.main,
    "&:hover": {
      background: "#139ae2",
    },
  },
}));
