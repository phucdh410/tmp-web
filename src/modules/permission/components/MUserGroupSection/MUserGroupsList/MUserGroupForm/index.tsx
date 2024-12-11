import { Controller, useForm } from "react-hook-form";

import { permissionsApi } from "@apis/permissions.api";
import { CInput } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserGroupPayload } from "@interfaces/permissions";
import { AddCircleOutline, Lock } from "@mui/icons-material";
import { IconButton, Paper, Stack } from "@mui/material";

import { DEFAULT_VALUES, userGroupSchema } from "./forms";
import { IMUserGroupFormProps } from "./types";

export const MUserGroupForm = ({ refetch }: IMUserGroupFormProps) => {
  //#region Data
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<IUserGroupPayload>({
    mode: "all",
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(userGroupSchema),
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await permissionsApi.createUserGroups(values);
        refetch?.();
        noti.success(MESSAGES("nhóm người dùng").SUCCESS.CREATE);
        reset(DEFAULT_VALUES);
      } catch (error: any) {
        noti.error(error?.message ?? MESSAGES("nhóm người dùng").ERROR.CREATE);
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <Paper variant="tool-card">
      <Stack direction="row" gap={1} px={2} py={1}>
        <Stack flexShrink={0} maxWidth={180}>
          <Controller
            control={control}
            name="code"
            render={({ field, fieldState: { error } }) => (
              <CInput
                placeholder="Mã nhóm mới"
                {...field}
                error={!!error}
                onEnter={onSubmit}
              />
            )}
          />
        </Stack>
        <Stack flex={1}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <CInput
                placeholder="Tên nhóm mới"
                {...field}
                error={!!error}
                onEnter={onSubmit}
              />
            )}
          />
        </Stack>
        <Stack flexShrink={0}>
          <IconButton onClick={onSubmit} disabled={!isValid}>
            {isValid ? <AddCircleOutline color="success" /> : <Lock />}
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
  //#endregion
};
