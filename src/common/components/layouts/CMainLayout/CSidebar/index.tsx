import { Link, useLocation } from "react-router-dom";

import { SIDEBAR } from "@constants/sidebar";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

import {
  CListItemButton,
  CListItemIcon,
  CListItemText,
} from "../StyledComponents";

import { CListItem } from "./CListItem";
import { ICSidebarProps } from "./types";

export const CSidebar = ({ open, onToggleSidebar }: ICSidebarProps) => {
  const { pathname } = useLocation();

  return (
    <Stack justifyContent="space-between" height="100%">
      <Stack
        sx={{
          maxHeight: "calc(100vh - 175px)",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {SIDEBAR.map((item, index) =>
          item?.children && item.children?.length > 0 ? (
            <CListItem
              key={item?.label + index}
              data={item}
              index={index}
              sidebarOpen={open}
              expand={onToggleSidebar}
            />
          ) : (
            <CListItemButton
              key={item?.label + index}
              selected={pathname?.slice(1)?.startsWith(item?.path)}
              LinkComponent={Link}
              to={`/${item?.path}`}
            >
              <CListItemIcon>{item?.icon}</CListItemIcon>
              <CListItemText>{item?.label}</CListItemText>
            </CListItemButton>
          )
        )}
      </Stack>
      <Stack
        boxShadow="0 -2px 10px 0 rgb(0 0 0 / 10%)"
        alignItems={open ? "end" : "center"}
        py={1}
        justifyContent="center"
      >
        <IconButton onClick={onToggleSidebar} sx={{ color: "#053C7F" }}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Stack>
    </Stack>
  );
};
