import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { acceptancesApi } from "@apis/acceptances.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { ACCEPTANCE_STATUSES_OPTIONS } from "@constants/options";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAssetInAcceptanceDetail } from "@interfaces/acceptances";
import { Paper, Stack, Typography } from "@mui/material";
import { CDetailLabel, CDetailValue, CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const MOCKUP = [
  {
    acceptance_id: "A-1000",
    category_id: 1,
    category_name: "Category 1",
    code: "CODE-1000",
    description: "This is the description for asset 1.",
    id: 2000,
    name: "Asset Name 1",
    price: 718,
    quantity: 2,
    total: 1436,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1001",
    category_id: 2,
    category_name: "Category 2",
    code: "CODE-1001",
    description: "This is the description for asset 2.",
    id: 2001,
    name: "Asset Name 2",
    price: 111,
    quantity: 12,
    total: 1332,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1002",
    category_id: 3,
    category_name: "Category 3",
    code: "CODE-1002",
    description: "This is the description for asset 3.",
    id: 2002,
    name: "Asset Name 3",
    price: 464,
    quantity: 13,
    total: 6032,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1003",
    category_id: 4,
    category_name: "Category 4",
    code: "CODE-1003",
    description: "This is the description for asset 4.",
    id: 2003,
    name: "Asset Name 4",
    price: 103,
    quantity: 8,
    total: 824,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1004",
    category_id: 5,
    category_name: "Category 5",
    code: "CODE-1004",
    description: "This is the description for asset 5.",
    id: 2004,
    name: "Asset Name 5",
    price: 397,
    quantity: 13,
    total: 5161,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1005",
    category_id: 6,
    category_name: "Category 6",
    code: "CODE-1005",
    description: "This is the description for asset 6.",
    id: 2005,
    name: "Asset Name 6",
    price: 283,
    quantity: 16,
    total: 4528,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1006",
    category_id: 7,
    category_name: "Category 7",
    code: "CODE-1006",
    description: "This is the description for asset 7.",
    id: 2006,
    name: "Asset Name 7",
    price: 507,
    quantity: 12,
    total: 6084,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1007",
    category_id: 8,
    category_name: "Category 8",
    code: "CODE-1007",
    description: "This is the description for asset 8.",
    id: 2007,
    name: "Asset Name 8",
    price: 816,
    quantity: 7,
    total: 5712,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1008",
    category_id: 9,
    category_name: "Category 9",
    code: "CODE-1008",
    description: "This is the description for asset 9.",
    id: 2008,
    name: "Asset Name 9",
    price: 832,
    quantity: 18,
    total: 14976,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1009",
    category_id: 10,
    category_name: "Category 10",
    code: "CODE-1009",
    description: "This is the description for asset 10.",
    id: 2009,
    name: "Asset Name 10",
    price: 930,
    quantity: 11,
    total: 10230,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1010",
    category_id: 11,
    category_name: "Category 11",
    code: "CODE-1010",
    description: "This is the description for asset 11.",
    id: 2010,
    name: "Asset Name 11",
    price: 825,
    quantity: 1,
    total: 825,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1011",
    category_id: 12,
    category_name: "Category 12",
    code: "CODE-1011",
    description: "This is the description for asset 12.",
    id: 2011,
    name: "Asset Name 12",
    price: 718,
    quantity: 1,
    total: 718,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1012",
    category_id: 13,
    category_name: "Category 13",
    code: "CODE-1012",
    description: "This is the description for asset 13.",
    id: 2012,
    name: "Asset Name 13",
    price: 417,
    quantity: 15,
    total: 6255,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1013",
    category_id: 14,
    category_name: "Category 14",
    code: "CODE-1013",
    description: "This is the description for asset 14.",
    id: 2013,
    name: "Asset Name 14",
    price: 842,
    quantity: 10,
    total: 8420,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1014",
    category_id: 15,
    category_name: "Category 15",
    code: "CODE-1014",
    description: "This is the description for asset 15.",
    id: 2014,
    name: "Asset Name 15",
    price: 355,
    quantity: 20,
    total: 7100,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1015",
    category_id: 16,
    category_name: "Category 16",
    code: "CODE-1015",
    description: "This is the description for asset 16.",
    id: 2015,
    name: "Asset Name 16",
    price: 262,
    quantity: 6,
    total: 1572,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1016",
    category_id: 17,
    category_name: "Category 17",
    code: "CODE-1016",
    description: "This is the description for asset 17.",
    id: 2016,
    name: "Asset Name 17",
    price: 658,
    quantity: 7,
    total: 4606,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1017",
    category_id: 18,
    category_name: "Category 18",
    code: "CODE-1017",
    description: "This is the description for asset 18.",
    id: 2017,
    name: "Asset Name 18",
    price: 509,
    quantity: 14,
    total: 7126,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1018",
    category_id: 19,
    category_name: "Category 19",
    code: "CODE-1018",
    description: "This is the description for asset 19.",
    id: 2018,
    name: "Asset Name 19",
    price: 625,
    quantity: 16,
    total: 10000,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1019",
    category_id: 20,
    category_name: "Category 20",
    code: "CODE-1019",
    description: "This is the description for asset 20.",
    id: 2019,
    name: "Asset Name 20",
    price: 869,
    quantity: 3,
    total: 2607,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1020",
    category_id: 21,
    category_name: "Category 21",
    code: "CODE-1020",
    description: "This is the description for asset 21.",
    id: 2020,
    name: "Asset Name 21",
    price: 564,
    quantity: 14,
    total: 7896,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1021",
    category_id: 22,
    category_name: "Category 22",
    code: "CODE-1021",
    description: "This is the description for asset 22.",
    id: 2021,
    name: "Asset Name 22",
    price: 551,
    quantity: 1,
    total: 551,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1022",
    category_id: 23,
    category_name: "Category 23",
    code: "CODE-1022",
    description: "This is the description for asset 23.",
    id: 2022,
    name: "Asset Name 23",
    price: 331,
    quantity: 5,
    total: 1655,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1023",
    category_id: 24,
    category_name: "Category 24",
    code: "CODE-1023",
    description: "This is the description for asset 24.",
    id: 2023,
    name: "Asset Name 24",
    price: 659,
    quantity: 5,
    total: 3295,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1024",
    category_id: 25,
    category_name: "Category 25",
    code: "CODE-1024",
    description: "This is the description for asset 25.",
    id: 2024,
    name: "Asset Name 25",
    price: 96,
    quantity: 7,
    total: 672,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1025",
    category_id: 26,
    category_name: "Category 26",
    code: "CODE-1025",
    description: "This is the description for asset 26.",
    id: 2025,
    name: "Asset Name 26",
    price: 35,
    quantity: 18,
    total: 630,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1026",
    category_id: 27,
    category_name: "Category 27",
    code: "CODE-1026",
    description: "This is the description for asset 27.",
    id: 2026,
    name: "Asset Name 27",
    price: 365,
    quantity: 19,
    total: 6935,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1027",
    category_id: 28,
    category_name: "Category 28",
    code: "CODE-1027",
    description: "This is the description for asset 28.",
    id: 2027,
    name: "Asset Name 28",
    price: 787,
    quantity: 8,
    total: 6296,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1028",
    category_id: 29,
    category_name: "Category 29",
    code: "CODE-1028",
    description: "This is the description for asset 29.",
    id: 2028,
    name: "Asset Name 29",
    price: 50,
    quantity: 20,
    total: 1000,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1029",
    category_id: 30,
    category_name: "Category 30",
    code: "CODE-1029",
    description: "This is the description for asset 30.",
    id: 2029,
    name: "Asset Name 30",
    price: 228,
    quantity: 19,
    total: 4332,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1030",
    category_id: 31,
    category_name: "Category 31",
    code: "CODE-1030",
    description: "This is the description for asset 31.",
    id: 2030,
    name: "Asset Name 31",
    price: 665,
    quantity: 2,
    total: 1330,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1031",
    category_id: 32,
    category_name: "Category 32",
    code: "CODE-1031",
    description: "This is the description for asset 32.",
    id: 2031,
    name: "Asset Name 32",
    price: 481,
    quantity: 4,
    total: 1924,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1032",
    category_id: 33,
    category_name: "Category 33",
    code: "CODE-1032",
    description: "This is the description for asset 33.",
    id: 2032,
    name: "Asset Name 33",
    price: 348,
    quantity: 9,
    total: 3132,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1033",
    category_id: 34,
    category_name: "Category 34",
    code: "CODE-1033",
    description: "This is the description for asset 34.",
    id: 2033,
    name: "Asset Name 34",
    price: 703,
    quantity: 16,
    total: 11248,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1034",
    category_id: 35,
    category_name: "Category 35",
    code: "CODE-1034",
    description: "This is the description for asset 35.",
    id: 2034,
    name: "Asset Name 35",
    price: 978,
    quantity: 5,
    total: 4890,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1035",
    category_id: 36,
    category_name: "Category 36",
    code: "CODE-1035",
    description: "This is the description for asset 36.",
    id: 2035,
    name: "Asset Name 36",
    price: 325,
    quantity: 15,
    total: 4875,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1036",
    category_id: 37,
    category_name: "Category 37",
    code: "CODE-1036",
    description: "This is the description for asset 37.",
    id: 2036,
    name: "Asset Name 37",
    price: 165,
    quantity: 2,
    total: 330,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1037",
    category_id: 38,
    category_name: "Category 38",
    code: "CODE-1037",
    description: "This is the description for asset 38.",
    id: 2037,
    name: "Asset Name 38",
    price: 974,
    quantity: 10,
    total: 9740,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1038",
    category_id: 39,
    category_name: "Category 39",
    code: "CODE-1038",
    description: "This is the description for asset 39.",
    id: 2038,
    name: "Asset Name 39",
    price: 870,
    quantity: 15,
    total: 13050,
    unit: "pcs",
  },
  {
    acceptance_id: "A-1039",
    category_id: 40,
    category_name: "Category 40",
    code: "CODE-1039",
    description: "This is the description for asset 40.",
    id: 2039,
    name: "Asset Name 40",
    price: 491,
    quantity: 6,
    total: 2946,
    unit: "pcs",
  },
];

const DetailAcceptancePage = () => {
  useTitle("Chi tiết phiếu nghiệm thu");

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
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInAcceptanceDetail> = [
    {
      key: "name",
      label: "tên tài sản",
      align: "left",
    },
    {
      key: "code",
      label: "mã tài sản",
    },
    {
      key: "quantity",
      label: "số lượng",
      columnType: "number",
    },
    {
      key: "price",
      label: "đơn giá",
      columnType: "number",
    },
    {
      key: "unit",
      label: "đơn vị tính",
    },
    {
      key: "total",
      label: "thành tiền",
      columnType: "number",
    },
    {
      key: "description",
      label: "mô tả",
      align: "left",
    },
  ];
  return (
    <>
      <Typography variant="header-page">chi tiết phiếu nghiệm thu</Typography>

      <Paper variant="tool-card" sx={{ my: 3 }}>
        <Stack direction="column" p={3} gap={2}>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Số phiếu đề xuất mua hàng" />
            <CDetailValue value={data?.document_code} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Ngày nghiệm thu" />
            <CDetailValue value={data?.date} type="date" />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Tổng tiền" />
            <CDetailValue value={data?.total} type="number" />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Số chứng từ nghiệm thu" />
            <CDetailValue value={data?.code} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Nhà cung cấp" />
            <CDetailValue value={data?.vendor_name} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Trạng thái" />
            <CDetailValue
              value={data?.status}
              type="option"
              options={ACCEPTANCE_STATUSES_OPTIONS}
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Chi nhánh" />
            <CDetailValue value={data?.store_name} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Mô tả chi tiết" />
            <CDetailValue value={data?.description} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Lý do" />
            <CDetailValue value={data?.reason} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Danh sách files" />
            <CDetailValue value={data?.documents} type="file" />
          </Stack>
        </Stack>
      </Paper>
      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        data={(MOCKUP || data?.assets) ?? []}
        autoPaginate
        title="Danh sách tài sản nghiệm thu"
      />
    </>
  );
  //#endregion
};
export default DetailAcceptancePage;
