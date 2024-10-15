import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Stack } from "@mui/material";

import {
  CListItemButton,
  CListItemIcon,
  CListItemText,
} from "../../StyledComponents";

import { ICListItemProps } from "./types";

export const CListItem = ({
  data,
  index,
  sidebarOpen,
  expand,
}: ICListItemProps) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  //#endregion

  //#region Event
  const onToggle = () => {
    if (!sidebarOpen) expand();
    setOpen(!open);
  };
  //#endregion

  useEffect(() => {
    if (!sidebarOpen) setOpen(false);
  }, [sidebarOpen]);

  //#region Render
  return (
    <>
      <CListItemButton
        onClick={onToggle}
        key={data?.label + index}
        selected={pathname?.slice(1)?.startsWith(data?.path)}
      >
        <CListItemIcon>{data?.icon}</CListItemIcon>
        <CListItemText>{data?.label}</CListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </CListItemButton>

      <Collapse
        in={open}
        sx={{ flexShrink: 0, ".MuiCollapse-wrapper": { p: 0 } }}
      >
        <Stack>
          {data?.children &&
            data.children?.length &&
            data.children.map((item, index) => (
              <CListItemButton
                key={item?.label + index}
                selected={pathname?.includes(`${data?.path}/${item?.path}`)}
                LinkComponent={Link}
                to={`/${data?.path}/${item?.path}`}
              >
                <CListItemIcon>{item?.icon}</CListItemIcon>
                <CListItemText>{item?.label}</CListItemText>
              </CListItemButton>
            ))}
        </Stack>
      </Collapse>
    </>
  );
  //#endregion
};
