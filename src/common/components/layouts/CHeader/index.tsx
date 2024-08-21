import logoIcool from "@assets/images/logo-icool.png";
import { AppBar, Container, Stack } from "@mui/material";

export const CHeader = () => {
  return (
    <AppBar position="sticky" sx={{ top: 0 }}>
      <Stack
        height={80}
        width="100%"
        bgcolor={(theme) => theme.palette.primary.main}
      >
        <Container maxWidth="xxl" sx={{ height: "inherit" }}>
          <Stack
            alignItems="center"
            justifyContent="center"
            maxWidth={131}
            height="inherit"
          >
            <img src={logoIcool} alt="LOGO" />
          </Stack>
        </Container>
      </Stack>
    </AppBar>
  );
};
