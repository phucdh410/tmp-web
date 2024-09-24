import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { roomGroupSuggestApi } from "@apis/room-group-suggests.api";
import { CButton } from "@controls";
import { toast } from "@funcs/toast";
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
        toast.success("Thêm đề xuất nhóm phòng thành công");
        reset(defaultValues);
        navigate("/room/room-group-suggests");
      } catch (error: any) {
        toast.error(error?.message ?? "Có lỗi xảy ra!");
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">Thêm đề xuất nhóm phòng</Typography>

      <Paper
        sx={{ mt: 4, p: 3, boxShadow: "0px 0px 18px 0px rgba(0, 0, 0, 0.10)" }}
      >
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
