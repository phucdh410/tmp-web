import { generateKeyJSX } from "@components/others/CTable/funcs";
import { Stack } from "@mui/material";

import { OrbitingItem } from "../OrbitingItem";

import { IOrbitingCircleProps } from "./types";

export const OrbitingCircle = ({
  radius,
  duration = 0,
  nodes,
}: IOrbitingCircleProps) => {
  return (
    <>
      <Stack
        component="svg"
        position="absolute"
        height="100%"
        width="100%"
        zIndex={1}
        sx={{ inset: 0 }}
      >
        <Stack
          component="circle"
          strokeWidth={1}
          stroke="#9393935A"
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
        ></Stack>
      </Stack>
      {nodes?.map((nodeItem) => (
        <OrbitingItem
          key={generateKeyJSX()}
          data={nodeItem.data}
          radius={radius}
          duration={nodeItem?.duration || duration}
          delay={nodeItem?.delay}
          reverse={nodeItem?.reverse}
          maxWidth={nodeItem?.maxWidth}
          onClick={nodeItem?.onClick}
        />
      ))}
    </>
  );
};
