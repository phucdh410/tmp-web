import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";

import { permissionsApi } from "@apis/permissions.api";
import { IUserDataPayload } from "@interfaces/permissions";
import { Stack } from "@mui/material";
import { CTab, CTabPanel, CTabs } from "@others";
import { useQuery } from "@tanstack/react-query";

import { UserSectionContext } from "..";

import { MRegionsTable } from "./MRegionsTable";
import { MStoresTable } from "./MStoresTable";
import { IMUserDetailProps, IMUserDetailRef } from "./types";

type TUserDetailTabs = "store" | "region";

const DEFAULT_VALUES = { store_ids: [], area_ids: [] };

export const MUserDetail = forwardRef<IMUserDetailRef, IMUserDetailProps>(
  (props, ref) => {
    //#region Data
    const { id } = useContext(UserSectionContext);

    const [tab, setTab] = useState<TUserDetailTabs>("store");

    const { data, refetch } = useQuery({
      queryKey: ["thong-tin-cua-hang-va-vung-tai-san-cua-nhan-vien", id],
      queryFn: () => permissionsApi.getUserDataById(id),
      enabled: !!id,
      select: (response) => response?.data?.data,
    });

    const { control, handleSubmit, reset } = useForm<IUserDataPayload>({
      mode: "all",
      defaultValues: DEFAULT_VALUES,
    });
    //#endregion

    //#region Event
    const onTabChange = (event: React.SyntheticEvent, value: TUserDetailTabs) =>
      setTab(value);

    const onSubmit = async () => {
      await handleSubmit(async (values) => {
        await permissionsApi.updateUserData(id, values);
      })();
    };
    //#endregion

    useEffect(() => {
      if (data && data.stores && data.areas) {
        reset({ store_ids: data?.stores, area_ids: data?.areas });
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
          <CTab value="store" label="Chi nhánh" />
          <CTab value="region" label="Vùng tài sản" />
        </CTabs>

        <CTabPanel value="store" tabValue={tab}>
          <MStoresTable control={control} />
        </CTabPanel>
        <CTabPanel value="region" tabValue={tab}>
          <MRegionsTable control={control} />
        </CTabPanel>
      </Stack>
    );
    //#endregion
  }
);
