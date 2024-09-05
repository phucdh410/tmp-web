import img1 from "@assets/images/not-found-1.jpg";
import { Stack, Typography } from "@mui/material";

export const CNotFoundPage = () => {
  //#region Data
  //#endregion

  return (
    <Stack height="100vh" width="100vw" position="relative">
      <Stack
        direction="row"
        alignItems="center"
        gap={3}
        position="absolute"
        left="40%"
        top="50%"
        sx={{ transform: "translate(-40%, -50%)" }}
      >
        <Stack maxWidth={450}>
          <img src={img1} alt="" />
        </Stack>
        <Typography
          fontSize={60}
          fontWeight={500}
          lineHeight="46px"
          sx={{ userSelect: "none" }}
        >
          Trang này không tồn tại
          <br />
          <Typography component="span" fontSize={18}>
            Hoặc chúng tôi chưa làm đến
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  );
};
