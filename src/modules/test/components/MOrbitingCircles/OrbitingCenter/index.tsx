import { ReactNode } from "react";

import { Stack } from "@mui/material";

export const OrbitingCenter = ({ children }: { children: ReactNode }) => {
  return <Stack position="absolute">{children}</Stack>;
};
