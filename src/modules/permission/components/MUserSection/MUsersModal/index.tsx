import { forwardRef, useImperativeHandle, useState } from "react";

import { permissionsApi } from "@apis/permissions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import {
  IParamsToGetUsersFromPos,
  IUserFromPos,
} from "@interfaces/permissions";
import { Dialog, Stack, Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import { MFilter } from "./MFilter";
import { IMUsersModalProps, IMUsersModalRef } from "./types";

export const MUsersModal = forwardRef<IMUsersModalRef, IMUsersModalProps>(
  (props, ref) => {
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
    //#endregion

    //#region Event
    const onClose = () => {
      setOpen(false);
      setParams({ code: "", name: "" });
    };

    const onSearch = (searchParams: IParamsToGetUsersFromPos) => {
      setParams(searchParams);
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

          <CTable
            loading={isFetching}
            showIndexCol={false}
            headerTransform="capitalize"
            height={500}
            headers={headers}
            data={users_from_pos}
            selection={{
              selectedList: [],
              hideCheckAll: true,
            }}
            rowKey="code"
            dense
          />
          <Stack direction="row" justifyContent="end">
            <CButton>Thêm nhân viên</CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
