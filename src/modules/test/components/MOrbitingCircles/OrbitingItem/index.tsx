import { Stack, Typography } from "@mui/material";
import classNames from "classnames";

import { IOrbitingItemProps } from "./types";

export const OrbitingItem = ({
  data,
  radius,
  duration,
  delay,
  reverse,
  maxWidth = 40,
  onClick,
}: IOrbitingItemProps) => {
  return (
    <Stack
      position="absolute"
      zIndex={2}
      className={classNames("orbit-item", reverse && "animation-reverse")}
      style={
        {
          "--duration": duration,
          "--radius": radius,
          "--delay": delay,
        } as React.CSSProperties
      }
      sx={{ cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      <img
        src={data.img}
        alt={data?.img}
        style={{ maxWidth: maxWidth || 40, objectFit: "cover" }}
      />

      {data.title && (
        <Typography
          position="absolute"
          whiteSpace="nowrap"
          top="40px"
          textAlign="center"
          left="50%"
          fontSize={14}
          sx={{ transform: "translateX(-50%)" }}
        >
          {data.title}
        </Typography>
      )}
    </Stack>
  );
};
