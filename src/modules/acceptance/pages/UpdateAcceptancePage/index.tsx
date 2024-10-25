import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { acceptancesApi } from "@apis/acceptances.api";
import { CButton } from "@controls";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAcceptancePayload } from "@interfaces/acceptances";
import { MForm } from "@modules/acceptance/components";
import { defaultValues, resolver } from "@modules/acceptance/form";
import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const UpdatePaymentProposalPage = () => {
  useTitle("Sửa phiếu nghiệm thu");

  //#region Data
  const params = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["chi-tiet-phieu-nghiem-thu", params?.id],
    queryFn: () => acceptancesApi.getById(params.id!),
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (error) {
      toast.error(
        error?.message ?? MESSAGES("phiếu nghiệm thu").ERROR.GET_DETAIL
      );
      navigate(-1);
    }
  }, [error]);

  const { control, handleSubmit, reset, setValue } =
    useForm<IAcceptancePayload>({
      mode: "all",
      defaultValues: defaultValues,
      resolver: resolver,
    });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const { id, ...payload } = values;
        await acceptancesApi.update(id!, payload);
        toast.success(MESSAGES("phiếu nghiệm thu").SUCCESS.UPDATE);
        reset(defaultValues);
        navigate("/acceptance/list");
      } catch (error: any) {
        toast.error(
          error?.message ?? MESSAGES("phiếu nghiệm thu").ERROR.UPDATE
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      const { category_id, vendor_id } = data;
      reset({
        ...data,
        category_id: Number(category_id),
        vendor_id: Number(vendor_id),
      });
    }
  }, [data]);

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu nghiệm thu</Typography>

      <MForm control={control} setValue={setValue} isEdit />

      <Stack flexDirection="row" justifyContent="center">
        <CButton onClick={onSubmit} highlight>
          Lưu thông tin
        </CButton>
      </Stack>
    </>
  );
  //#endregion
};
export default UpdatePaymentProposalPage;
