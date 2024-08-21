import {
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";

interface ICSidebarButton {
  to?: string;
}

export const CDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  ".MuiPaper-root.MuiDrawer-paper": {
    background: "white",
    borderRight: "none",
    boxShadow: "1px 0 14px 0px rgb(0 0 0 / 6%)",
    overflowX: "hidden",
    position: "relative",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: 318,
    }),
    ...(!open && {
      width: 60,
    }),
  },
}));

export const CListItemButton = styled(ListItemButton)<ICSidebarButton>(
  ({ theme }) => ({
    color: "#053C7F",
    "&.Mui-selected": {
      color: "#2a6aeb",
    },
  })
);

export const CListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 46,
  color: "inherit",
}));

export const CListItemText = styled(ListItemText)(({ theme }) => ({
  whiteSpace: "nowrap",
  color: "inherit",
  ".MuiSvgIcon-root": {
    color: "inherit",
  },
  ".MuiTypography-root": {
    fontWeight: 500,
  },
}));
