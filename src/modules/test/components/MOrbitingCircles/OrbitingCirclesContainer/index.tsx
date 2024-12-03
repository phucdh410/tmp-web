import { Stack } from "@mui/material";

import { OrbitingCenter } from "../OrbitingCenter";

import { IOrbitingCirclesContainerProps } from "./types";

import "./styles.scss";

export const OrbitingCirclesContainer = ({
  maxRadius,
  extraPadding,
  centerNode,
  children,
}: IOrbitingCirclesContainerProps) => {
  return (
    <Stack
      p={`${maxRadius + (extraPadding ?? 0)}px`}
      position="relative"
      alignItems="center"
      justifyContent="center"
      width="fit-content"
      borderRadius="100%"
      className="orbiting-circles"
    >
      {centerNode && <OrbitingCenter>{centerNode}</OrbitingCenter>}
      {children}
    </Stack>
  );
};
