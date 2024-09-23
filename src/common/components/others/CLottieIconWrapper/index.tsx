import Lottie from "react-lottie";

import { Stack } from "@mui/material";

import { ICLottieIconWrapperProps } from "./types";

export const CLottieIconWrapper = ({
  size = 20,
  animationSize = 40,
  animationData,
  options,
  ...props
}: ICLottieIconWrapperProps) => {
  return (
    <Stack
      position="relative"
      alignItems="center"
      justifyContent="center"
      height={size}
      width={size}
      sx={{
        "div[aria-label='animation']": {
          position: "absolute",
          height: `${animationSize}px!important`,
          width: `${animationSize}px!important`,
        },
      }}
    >
      <Lottie
        {...props}
        options={{
          ...options,
          animationData,
        }}
      />
    </Stack>
  );
};
