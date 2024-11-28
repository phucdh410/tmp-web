import { Stack, Typography } from "@mui/material";

import { ICFilterContainerProps } from "./types";

export const CFilterContainer = ({
  title = "Bộ lọc yêu cầu",
  children,
}: ICFilterContainerProps) => {
  return (
    <Stack
      p={3}
      pb={2}
      borderRadius={4}
      mb={2}
      mt={1}
      border="2px solid #e9e9e9"
      boxShadow="0px 0px 12px 1px rgb(52 52 52 / 8%)"
      position="relative"
    >
      <Typography
        position="absolute"
        px={1}
        top="-12px"
        fontWeight={500}
        color="#9d9d9d"
        sx={{
          background: "white",
          borderTopLeftRadius: "20%",
          borderTopRightRadius: "20%",
        }}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  );
};
