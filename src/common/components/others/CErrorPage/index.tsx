import errorBg from "@assets/images/maintain.jpg";
import { Stack, Typography } from "@mui/material";

export const CErrorPage = () => {
  return (
    <Stack
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
      position="relative"
      sx={{
        background: `url(${errorBg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <Typography
        position="absolute"
        fontSize={32}
        fontWeight={500}
        sx={{ top: "10%", left: "10%" }}
      >
        Tính năng đang phát triển
      </Typography>
    </Stack>
  );
};
