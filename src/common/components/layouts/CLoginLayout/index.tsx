import { Outlet } from "react-router-dom";

import loginImage from "@assets/images/login-imagex2.png";
import { Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { CHeader } from "../CHeader";

const CLoginLayout = () => {
  return (
    <Stack height="100vh">
      <CHeader />
      <Stack flex={1} alignItems="center">
        <Grid2
          container
          columns={2}
          minWidth={1200}
          marginTop="2%"
          borderRadius="5px"
          boxShadow="0 4px 21px rgba(0, 0, 0, .25)"
        >
          <Grid2 xs={1} maxHeight={693}>
            <img
              src={loginImage}
              alt="LOGIN-IMAGE"
              style={{ maxHeight: "inherit", height: "100%" }}
            />
          </Grid2>
          <Grid2 xs={1}>
            <Outlet />
          </Grid2>
        </Grid2>
      </Stack>
    </Stack>
  );
};
export default CLoginLayout;
