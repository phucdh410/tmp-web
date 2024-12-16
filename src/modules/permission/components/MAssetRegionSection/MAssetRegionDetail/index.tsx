import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";

import { permissionsApi } from "@apis/permissions.api";
import { IAssignPermissionAssetRegionPayload } from "@interfaces/permissions";
import { Stack } from "@mui/material";
import { CTab, CTabPanel, CTabs } from "@others";
import { useQuery } from "@tanstack/react-query";

import { AssetRegionSectionContext } from "..";

import { MStoresTable } from "./MStoresTable";
import { IMAssetRegionDetailProps, IMAssetRegionDetailRef } from "./types";

type TAssetRegionDetailTabs = "store";

const DEFAULT_VALUES: IAssignPermissionAssetRegionPayload = {
  store_ids: [],
};

export const MAssetRegionDetail = forwardRef<
  IMAssetRegionDetailRef,
  IMAssetRegionDetailProps
>((props, ref) => {
  //#region Data
  const { id } = useContext(AssetRegionSectionContext);

  const [tab, setTab] = useState<TAssetRegionDetailTabs>("store");

  const { data, refetch } = useQuery({
    queryKey: ["thong-tin-chi-tiet-vung-tai-san", id],
    queryFn: () => permissionsApi.getAssetRegionDataById(id),
    enabled: !!id,
    select: (response) => response?.data?.data,
  });

  const { control, handleSubmit, reset } =
    useForm<IAssignPermissionAssetRegionPayload>({
      mode: "all",
      defaultValues: DEFAULT_VALUES,
    });
  //#endregion

  //#region Event
  const onTabChange = (
    event: React.SyntheticEvent,
    value: TAssetRegionDetailTabs
  ) => setTab(value);

  const onSubmit = async () => {
    await handleSubmit(async (values) => {
      await permissionsApi.assignPermissionAssetRegion(id, values);
    })();
  };
  //#endregion

  useEffect(() => {
    if (data && data.stores) {
      reset({ store_ids: data?.stores });
    }
  }, [data]);

  useImperativeHandle(ref, () => ({
    refetch,
    submit: () => onSubmit(),
    reset: () => reset({ store_ids: data?.stores ?? DEFAULT_VALUES.store_ids }),
  }));

  //#region Render
  return (
    <Stack flex={1}>
      <CTabs value={tab} onChange={onTabChange}>
        <CTab value="store" label="Chi nhánh" />
      </CTabs>

      <CTabPanel value="store" tabValue={tab}>
        <MStoresTable control={control} />
      </CTabPanel>
    </Stack>
  );
  //#endregion
});
