import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Stack } from "@mui/material";

import {
  CListItemButton,
  CListItemIcon,
  CListItemText,
} from "../../StyledComponents";

import { ICListItemProps } from "./types";

export const CListItem = ({ data, index, sidebarOpen }: ICListItemProps) => {
  //#region Data
  const [open, setOpen] = useState(false);
  //#endregion

  //#region Event
  const onToggle = () => setOpen(!open);
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
        selected={false}
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
                selected={false}
                LinkComponent={Link}
                to={item?.path}
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
