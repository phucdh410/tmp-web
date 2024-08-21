import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { authApi } from "@apis/auth.api";
import logoCompany from "@assets/images/logo.png";
import { CPasswordInput } from "@components/controls/CPasswordInput";
import { CButton, CInput } from "@controls";
import { setAuthToken } from "@funcs/auth";
import { toast } from "@funcs/toast";
import { ILoginPayload } from "@interfaces/auth";
import { Box, Stack, Typography } from "@mui/material";
import { updateAuthState } from "@redux/slices";

import { defaultValues, resolver } from "../../form";

const LoginPage = () => {
  //#region Data
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ILoginPayload>({ mode: "all", defaultValues, resolver });

  const dispatch = useDispatch();
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const res = await authApi.login(values);

        const accessToken = res.data.data.access_token;
        // const refreshToken = res.data.data.refresh_token;

        setAuthToken(accessToken);

        const resProfile = await authApi.getProfile();
        dispatch(updateAuthState(resProfile.data.data));

        reset(defaultValues);
        toast.success("Đăng nhập thành công!");
      } catch (error: any) {
        toast.error(error?.message ?? "Đăng nhập không thành công");
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <Stack
      height="100%"
      px={9}
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <Box maxWidth={350}>
        <img src={logoCompany} alt="logo-company" />
      </Box>
      <Typography
        fontSize={20}
        lineHeight="23px"
        letterSpacing="0.01em"
        fontWeight={700}
        textTransform="uppercase"
        color={(theme) => theme.palette.primary.main}
        mb={2}
      >
        đăng nhập
      </Typography>
      <Controller
        control={control}
        name="username"
        render={({ field, fieldState: { error } }) => (
          <CInput
            error={!!error}
            errorText={error?.message}
            placeholder="Nhập username"
            {...field}
            fullWidth
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <CPasswordInput
            error={!!error}
            errorText={error?.message}
            placeholder="Nhập password"
            {...field}
            fullWidth
          />
        )}
      />
      <CButton
        onClick={onSubmit}
        loading={isSubmitting}
        fullWidth
        sx={{ mt: 2 }}
      >
        Đăng nhập
      </CButton>
    </Stack>
  );
  //#endregion
};
export default LoginPage;
