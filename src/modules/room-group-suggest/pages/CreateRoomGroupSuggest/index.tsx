import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { roomGroupSuggestApi } from "@apis/room-group-suggests.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IRoomGroupSuggestPayload } from "@interfaces/room-group-suggests";
import { MForm } from "@modules/room-group-suggest/components";
import { Paper, Typography } from "@mui/material";

import { defaultValues } from "../../form";

const CreateRoomGroupSuggest = () => {
  useTitle("Thêm đề xuất nhóm phòng");

  //#region Data
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IRoomGroupSuggestPayload>({ mode: "all", defaultValues });

  const navigate = useNavigate();
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const { criteria_code, ...payload } = values;
        await roomGroupSuggestApi.create(payload);
        noti.success(MESSAGES("đề xuất nhóm phòng").SUCCESS.CREATE);
        reset(defaultValues);
        navigate("/room/room-group-suggests");
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("đề xuất nhóm phòng").ERROR.CREATE
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">Thêm đề xuất nhóm phòng</Typography>

      <Paper variant="tool-card" sx={{ mt: 4, p: 3 }}>
        <CButton onClick={onSubmit} loading={isSubmitting}>
          Lưu
        </CButton>

        <MForm control={control} />
      </Paper>
    </>
  );
  //#endregion
};
export default CreateRoomGroupSuggest;
