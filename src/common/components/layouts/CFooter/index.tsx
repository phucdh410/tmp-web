import { AppBar, Stack } from "@mui/material";

export const CFooter = () => {
  return (
    <AppBar position="sticky" sx={{ bottom: 0 }}>
      <Stack
        height={39}
        width="100%"
        bgcolor={(theme) => theme.palette.primary.main}
      ></Stack>
    </AppBar>
  );
};
