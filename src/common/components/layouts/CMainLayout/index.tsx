import { Suspense, useState } from "react";
import { shallowEqual } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "@hooks/redux";
import { Stack } from "@mui/material";

import { CFooter } from "../CFooter";
import { CHeader } from "../CHeader";

import { CSidebar } from "./CSidebar";
import { CDrawer } from "./StyledComponents";

const CMainLayout = () => {
  //#region Data
  const [open, setOpen] = useState(true);

  const isLogined = useSelector((state) => state.auth.isLogined, shallowEqual);

  // const { data } = useQuery({
  //   queryKey: ["get-profile", isLogined],
  //   queryFn: () => authApi.getProfile(),
  //   enabled: isLogined,
  //   select: (response) => response?.data?.data,
  // });
  //#endregion

  //#region Event
  const onToggleSidebar = () => setOpen(!open);
  //#endregion

  //#region Render
  return !isLogined ? (
    <Navigate to="/login" replace />
  ) : (
    <Stack height="100vh">
      <CHeader />
      <Stack
        direction="row"
        height="100%"
        gap={1.5}
        maxHeight="calc(100vh - 80px - 39px)"
      >
        <CDrawer variant="permanent" open={open}>
          <CSidebar open={open} onToggleSidebar={onToggleSidebar} />
        </CDrawer>

        <Stack
          component="main"
          flex={1}
          py={3}
          px={1.5}
          maxWidth={`calc(100vw - ${open ? 318 + 12 : 60 + 12}px)`}
          sx={{ overflowY: "auto", overflowX: "hidden" }}
        >
          <Suspense>
            <Outlet />
          </Suspense>
        </Stack>
      </Stack>
      <CFooter />
    </Stack>
  );
  //#endregion
};
export default CMainLayout;
