import Lottie from "react-lottie";

import pageLoadAnim from "@assets/lotties/page-load.json";
import { Stack } from "@mui/material";

export const CPageLoader = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <Stack maxWidth={250}>
        <Lottie
          isClickToPauseDisabled
          options={{ animationData: pageLoadAnim, loop: true, autoplay: true }}
        />
      </Stack>
    </Stack>
  );
};
