import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";

import { permissionsApi } from "@apis/permissions.api";
import { IAssignPermissionUserGroupPayload } from "@interfaces/permissions";
import { Stack } from "@mui/material";
import { CTab, CTabPanel, CTabs } from "@others";
import { useQuery } from "@tanstack/react-query";

import { UserGroupSectionContext } from "..";

import { MFunctionsTable } from "./MFunctionsTable";
import { MReportsTable } from "./MReportsTable";
import { MUsersTable } from "./MUsersTable";
import { IMUserGroupDetailProps, IMUserGroupDetailRef } from "./types";

type TUserGroupDetailTabs = "user" | "function" | "report";

const DEFAULT_VALUES: IAssignPermissionUserGroupPayload = {
  role_id: 0,
  user_codes: [],
  features: [],
  reports: [],
};

export const MUserGroupDetail = forwardRef<
  IMUserGroupDetailRef,
  IMUserGroupDetailProps
>((props, ref) => {
  //#region Data
  const { id } = useContext(UserGroupSectionContext);

  const [tab, setTab] = useState<TUserGroupDetailTabs>("user");

  const { data, refetch } = useQuery({
    queryKey: ["thong-tin-chi-tiet-nhom-nguoi-dung", id],
    queryFn: () => permissionsApi.getUserGroupDataById(id),
    enabled: !!id,
    select: (response) => response?.data?.data,
  });

  const { data: permissions } = useQuery({
    queryKey: ["danh-sach-quyen"],
    queryFn: () => permissionsApi.getPermissions(),
    select: (response) => response?.data?.data,
  });

  const { control, handleSubmit, reset } =
    useForm<IAssignPermissionUserGroupPayload>({
      mode: "all",
      defaultValues: DEFAULT_VALUES,
    });

  //#endregion

  //#region Event
  const onTabChange = (
    event: React.SyntheticEvent,
    value: TUserGroupDetailTabs
  ) => setTab(value);

  const onSubmit = async () => {
    await handleSubmit(async (values) => {
      await permissionsApi.assignPermissionUserGroup(id, values);
    })();
  };
  //#endregion

  useEffect(() => {
    if (data && data.users && data.features && data.reports) {
      reset({
        user_codes: data?.users,
        features: data?.features,
        reports: data.reports,
      });
    }
  }, [data]);

  useImperativeHandle(ref, () => ({
    refetch,
    submit: () => onSubmit(),
    reset: () => reset(DEFAULT_VALUES),
  }));

  //#region Render
  return (
    <Stack flex={1}>
      <CTabs value={tab} onChange={onTabChange}>
        <CTab value="user" label="Người dùng" />
        <CTab value="function" label="Chức năng" />
        <CTab value="report" label="Báo cáo" />
      </CTabs>

      <CTabPanel value="user" tabValue={tab}>
        <MUsersTable control={control} />
      </CTabPanel>
      <CTabPanel value="function" tabValue={tab}>
        <MFunctionsTable control={control} />
      </CTabPanel>
      <CTabPanel value="report" tabValue={tab}>
        <MReportsTable control={control} />
      </CTabPanel>
    </Stack>
  );
  //#endregion
});
