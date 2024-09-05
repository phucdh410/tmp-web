import imgSrc from "@assets/images/working.jpg";
import { Stack, Typography } from "@mui/material";

export const CDevelopingPage = () => {
  return (
    <Stack flex={1} height="100%" alignItems="center" justifyContent="center">
      <Stack maxWidth={400}>
        <img src={imgSrc} alt="" />
      </Stack>
      <Typography fontSize={32} fontWeight={500} mb={10}>
        Chức năng đang được phát triển
      </Typography>
    </Stack>
  );
};
