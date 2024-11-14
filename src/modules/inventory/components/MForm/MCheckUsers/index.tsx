import React from "react";
import { Controller, useFieldArray } from "react-hook-form";

import { CButton, CCheckbox, CInput } from "@controls";
import { DeleteForever } from "@mui/icons-material";
import { Grid2, IconButton, Stack } from "@mui/material";

import { IMCheckUsersProps } from "./types";

export const MCheckUsers = ({ control }: IMCheckUsersProps) => {
  //#region Data
  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onAddUser = () => {
    append({ name: "", role: "", represent: "" });
  };

  const onRemoveUser = (index: number) => () => {
    remove(index);
  };
  //#endregion

  //#region Render
  return (
    <Stack p={3} gap={2}>
      <Stack direction="row" gap={10}>
        <Controller
          control={control}
          name="chon_ban_kiem_ke"
          render={({ field }) => (
            <CCheckbox {...field} label="Chọn ban kiểm kê" />
          )}
        />
        <Controller
          control={control}
          name="them_nguoi_kiem_ke_tu_lan_nhap_truoc"
          render={({ field }) => (
            <CCheckbox
              {...field}
              label="Thêm người kiểm kê từ lần nhập trước"
            />
          )}
        />
      </Stack>
      <Stack direction="row" gap={2} alignItems="start">
        <CButton
          onClick={onAddUser}
          variant="outlined"
          sx={{ width: "fit-content" }}
        >
          Thêm người
        </CButton>
        <Grid2
          container
          columns={3}
          rowSpacing={2}
          columnSpacing={3}
          py={1.5}
          px={3}
          flex={1}
          borderRadius="8px"
          sx={{ background: "rgb(140 140 140 / 5%)" }}
        >
          <Grid2 size={1} fontWeight={600}>
            Họ và tên người kiểm
          </Grid2>
          <Grid2 size={1} fontWeight={600}>
            Vai trò
          </Grid2>
          <Grid2 size={1} fontWeight={600}>
            Đại diện
          </Grid2>
          {fields.map((e, index) => (
            <React.Fragment key={e.__id}>
              <Grid2 size={1}>
                <Controller
                  control={control}
                  name={`users.${index}.name`}
                  render={({ field, fieldState: { error } }) => (
                    <CInput
                      {...field}
                      placeholder="Nhập tên người kiểm"
                      error={!!error}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={1}>
                <Controller
                  control={control}
                  name={`users.${index}.role`}
                  render={({ field, fieldState: { error } }) => (
                    <CInput
                      {...field}
                      placeholder="Nhập vai trò"
                      error={!!error}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={1}>
                <Controller
                  control={control}
                  name={`users.${index}.represent`}
                  render={({ field, fieldState: { error } }) => (
                    <Stack direction="row">
                      <CInput
                        {...field}
                        placeholder="Nhập đại diện"
                        error={!!error}
                      />
                      <IconButton onClick={onRemoveUser(index)} color="error">
                        <DeleteForever />
                      </IconButton>
                    </Stack>
                  )}
                />
              </Grid2>
            </React.Fragment>
          ))}
        </Grid2>
      </Stack>
    </Stack>
  );
  //#endregion
};
