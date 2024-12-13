import { forwardRef, useImperativeHandle, useMemo, useState } from "react";

import { permissionsApi } from "@apis/permissions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { noti } from "@funcs/toast";
import {
  IParamsToGetUsersFromPos,
  IUserFromPos,
} from "@interfaces/permissions";
import { HighlightOff } from "@mui/icons-material";
import { Dialog, IconButton, Paper, Stack, Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import { MFilter } from "./MFilter";
import { IMUsersModalProps, IMUsersModalRef } from "./types";

export const MUsersModal = forwardRef<IMUsersModalRef, IMUsersModalProps>(
  ({ refetch, existingUsers = [] }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const [params, setParams] = useState<IParamsToGetUsersFromPos>({
      code: "",
      name: "",
    });

    const { data: users_from_pos = [], isFetching } = useQuery({
      queryKey: ["danh-sach-nhan-vien-tu-pos", params.code, params.name],
      queryFn: () => permissionsApi.getUsersFromPos(params),
      enabled: !!(params.code || params.name),
      select: (response) => response.data.data,
    });

    const users = useMemo(
      () =>
        existingUsers.length > 0
          ? users_from_pos.filter(
              (e) => !existingUsers.some((el) => el.code === e.code)
            )
          : users_from_pos,
      [existingUsers, users_from_pos]
    );

    const [selection, setSelection] = useState<IUserFromPos[]>([]);
    //#endregion

    //#region Event
    const onClose = () => {
      setOpen(false);
      setSelection([]);
      setParams({ code: "", name: "" });
    };

    const onSearch = (searchParams: IParamsToGetUsersFromPos) => {
      setParams(searchParams);
    };

    const onRemove = (index: number) => () => {
      const result = selection.filter((e, i) => i !== index);
      setSelection(result);
    };

    const onSubmit = async () => {
      try {
        await permissionsApi.addUsersToTPM({ users: selection });
        refetch?.();
        noti.success("Đã thêm nhân viên vào hệ thống");
        onClose();
      } catch (error: any) {
        noti.error(error?.message ?? "Thêm nhân viên không thành công!");
      }
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
    }));

    //#region Render
    const headers: TCTableHeaders<IUserFromPos> = [
      { key: "code", label: "mã nhân viên" },
      { key: "fullname", label: "mã nhân viên", align: "left", width: 350 },
    ];
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <Typography variant="dialog-title">Thêm nhân viên vào TPM</Typography>
        <Stack p={2} gap={1.5} minWidth={700}>
          <MFilter onSearch={onSearch} />
          {!params.code && !params.name && (
            <Typography>
              * Dữ liệu nhân viên quá lớn nên hãy lọc để tìm kiếm
            </Typography>
          )}

          <Stack direction="row" gap={2}>
            <CTable
              loading={isFetching}
              showIndexCol={false}
              headerTransform="capitalize"
              height={500}
              headers={headers}
              data={users}
              selection={{
                selectedList: selection,
                hideCheckAll: true,
                selectByClickingRow: true,
                onSelect: (newSelection) => setSelection(newSelection),
              }}
              rowKey="code"
              dense
            />

            <Paper variant="tool-card" sx={{ minWidth: 380 }}>
              <Typography
                bgcolor={(theme) => theme.palette.primary.main}
                color="white"
                padding="14px"
              >
                Danh sách nhân viên đã chọn
              </Typography>
              <Stack height={448} overflow="auto">
                {selection.map((e, index) => (
                  <Stack
                    key={e.code}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    paddingInline="14px"
                    paddingBlock="4px"
                    borderBottom="1px solid rgb(0 0 0/10%)"
                  >
                    <Typography>{`${e.fullname} - ${e.code}`}</Typography>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={onRemove(index)}
                    >
                      <HighlightOff />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Stack>

          <Stack direction="row" justifyContent="end">
            <CButton onClick={onSubmit} disabled={selection.length === 0}>
              Thêm nhân viên
            </CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
