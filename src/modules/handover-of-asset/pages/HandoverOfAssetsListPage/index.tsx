import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IHandoverOfAsset } from "@interfaces/handover-of-assets";
import { MFilter, MToolbar } from "@modules/handover-of-asset/components";
import { IParams } from "@modules/handover-of-asset/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const MOCK: IHandoverOfAsset[] = [
  {
    id: "1",
    code: "GTCCD.0001",
    ngay_ban_giao: dayjs().toDate(),
    store_name: "ICOOL Ung Văn Khiêm",
    nhan_vien_ban_giao: "0003 - Lê Khánh Phương Béo",
    nhan_vien_nhan_ban_giao: "0004 - Trần Nguyên Khánh Gate",
    reason: "Chuyển bộ phận",
    status: 0,
  },
  {
    id: "2",
    code: "GTCCD.0002",
    ngay_ban_giao: dayjs().toDate(),
    store_name: "ICOOL Ung Văn Khiêm",
    nhan_vien_ban_giao: "0003 - Lê Khánh Phương Béo",
    nhan_vien_nhan_ban_giao: "0004 - Trần Nguyên Khánh Gate",
    reason: "Chuyển bộ phận",
    status: 0,
  },
  {
    id: "3",
    code: "GTCCD.0003",
    ngay_ban_giao: dayjs().toDate(),
    store_name: "ICOOL Ung Văn Khiêm",
    nhan_vien_ban_giao: "0003 - Lê Khánh Phương Béo",
    nhan_vien_nhan_ban_giao: "0004 - Trần Nguyên Khánh Gate",
    reason: "Chuyển bộ phận",
    status: 0,
  },
  {
    id: "4",
    code: "GTCCD.0004",
    ngay_ban_giao: dayjs().toDate(),
    store_name: "ICOOL Ung Văn Khiêm",
    nhan_vien_ban_giao: "0003 - Lê Khánh Phương Béo",
    nhan_vien_nhan_ban_giao: "0004 - Trần Nguyên Khánh Gate",
    reason: "Chuyển bộ phận",
    status: 0,
  },
  {
    id: "5",
    code: "GTCCD.0005",
    ngay_ban_giao: dayjs().toDate(),
    store_name: "ICOOL Ung Văn Khiêm",
    nhan_vien_ban_giao: "0003 - Lê Khánh Phương Béo",
    nhan_vien_nhan_ban_giao: "0004 - Trần Nguyên Khánh Gate",
    reason: "Chuyển bộ phận",
    status: 0,
  },
  {
    id: "6",
    code: "GTCCD.0006",
    ngay_ban_giao: dayjs().toDate(),
    store_name: "ICOOL Ung Văn Khiêm",
    nhan_vien_ban_giao: "0003 - Lê Khánh Phương Béo",
    nhan_vien_nhan_ban_giao: "0004 - Trần Nguyên Khánh Gate",
    reason: "Chuyển bộ phận",
    status: 0,
  },
];

const HandoverOfAssetsListPage = () => {
  useTitle("Danh sách phiếu bàn giao tài sản");

  //#region Data
  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    status: "",
    suggest_date: null,
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-phieu-ban-giao-tai-san", params],
    queryFn: () => {},
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);
  console.log("🚀 ~ HandoverOfAssetsListPage ~ listData:", listData);

  const navigate = useNavigate();
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onCreate = () => navigate("/handover-of-asset/create");

  const onEdit = (id: string) => () =>
    navigate(`/handover-of-asset/update/${id}`);

  const onRemove = (id: string) => () => {
    confirm({
      title: "Xóa",
      content: "Xác nhận xóa phiếu bàn giao tài sản?",
      onProceed: async () => {
        try {
          // await removeApi();
          refetch();
          toast.success(MESSAGES("phiếu bàn giao tài sản").SUCCESS.REMOVE);
        } catch (error: any) {
          toast.error(
            error?.message ?? MESSAGES("phiếu bàn giao tài sản").ERROR.REMOVE
          );
        }
      },
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IHandoverOfAsset> = [
    {
      key: "code",
      label: "số chứng từ",
      cellRender: (value, record, index) => (
        <>
          <Link
            to={`detail/${record.id}`}
            style={{ fontWeight: 500, color: "#4b7cff" }}
          >
            {value}
          </Link>
        </>
      ),
    },
    {
      key: "ngay_ban_giao",
      label: "ngày bàn giao",
      columnType: "date",
    },
    {
      key: "store_name",
      label: "chi nhánh",
      align: "left",
    },
    { key: "nhan_vien_ban_giao", label: "nhân viên bàn giao", align: "left" },
    {
      key: "nhan_vien_nhan_ban_giao",
      label: "nhân viên nhận bàn giao",
      align: "left",
    },
    { key: "reason", label: "lý do bàn giao", align: "left" },
    {
      key: "status",
      label: "trạng thái",
    },
    {
      key: "action",
      label: "thao tác",
      cellRender: (value, record, index) => (
        <CButtonGroup className="table-actions" variant="text">
          <CButton onClick={onEdit(record?.id)}>Edit</CButton>
          <CButton color="error" onClick={onRemove(record?.id)}>
            Xóa
          </CButton>
        </CButtonGroup>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">
        Danh sách phiếu bàn giao tài sản
      </Typography>

      <MToolbar onCreate={onCreate} />
      <MFilter params={params} setParams={setParams} />

      <CTable
        showIndexCol={false}
        data={MOCK}
        headers={headers}
        headerTransform="capitalize"
        pagination={{
          page: params.page,
          pages: data?.pages ?? 0,
          limit: params.limit,
          total: data?.amount,
          onPageChange,
        }}
      />
    </>
  );
  //#endregion
};
export default HandoverOfAssetsListPage;
