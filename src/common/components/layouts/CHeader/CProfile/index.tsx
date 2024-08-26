import { useState } from "react";
import { shallowEqual } from "react-redux";

import avtSource from "@assets/images/avatar.webp";
import { CButton } from "@controls";
import { logoutUser } from "@funcs/auth";
import { useSelector } from "@hooks/redux";
import { Avatar, ButtonBase, Menu, Typography } from "@mui/material";

export const CProfile = () => {
  //#region Data
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const profile = useSelector((state) => state.auth.profile, shallowEqual);
  const isLogined = useSelector((state) => state.auth.isLogined, shallowEqual);
  //#endregion

  //#region Event
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setAnchorEl(event.currentTarget);

  const onClose = () => setAnchorEl(null);

  const onLogout = () => {
    logoutUser();
  };
  //#endregion

  //#region Render
  return !isLogined ? null : (
    <>
      <ButtonBase onClick={onClick} sx={{ borderRadius: "100%" }}>
        <Avatar src={avtSource} />
      </ButtonBase>

      <Menu
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={onClose}
        slotProps={{
          paper: {
            sx: { px: 2, py: 1, mt: 0.5 },
          },
        }}
        sx={{ ul: { padding: 0 } }}
      >
        <Typography whiteSpace="nowrap" mb={1}>
          Xin chào,&nbsp;
          <Typography component="span" fontWeight={500}>
            {profile?.fullname ?? ""}
          </Typography>
        </Typography>
        <CButton size="small" fullWidth onClick={onLogout}>
          Thoát tài khoản
        </CButton>
      </Menu>
    </>
  );
  //#endregion
};
