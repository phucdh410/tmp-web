import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { receiptsApi } from "@apis/receipts.api";
import { CButton } from "@controls";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IReceiptPayload } from "@interfaces/receipts";
import {
  MForm,
  MFormTable,
} from "@modules/purchase-proposal-n-quote/components";
import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const DetailPurchaseProposalNQuotePage = () => {
  useTitle("Thông tin phiếu đề xuất mua CCDC/Tài sản");

  //#region Data
  const params = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["thong-tin-phieu-de-xuat-mua-ccdc", params?.id],
    queryFn: () => receiptsApi.getById(params.id!),
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (error) {
      toast.error(
        error?.message ?? MESSAGES("phiếu đề xuất mua CCDC").ERROR.GET_DETAIL
      );
      navigate(-1);
    }
  }, [error]);

  const { control, reset } = useForm<IReceiptPayload>({
    mode: "all",
  });
  //#endregion

  //#region Event
  //#endregion

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data]);

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu ghi giảm</Typography>

      <MForm control={control} isEdit />

      <MFormTable control={control} />

      <Stack flexDirection="row" justifyContent="center">
        <CButton highlight>Quay lại</CButton>
      </Stack>
    </>
  );
  //#endregion
};
export default DetailPurchaseProposalNQuotePage;
