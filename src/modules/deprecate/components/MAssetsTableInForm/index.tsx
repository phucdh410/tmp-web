import { useState } from "react";

import { TCTableHeaders } from "@components/others/CTable/types";
import { CTable } from "@others";
import dayjs from "dayjs";

import { IMAssetsTableInForm } from "./types";

export interface IDontKnow {
  id: number;
  code: string;
  name: string;
  location: string;
  deprecate_date: string | Date;
  sum_of_depreciation_amount: number;
  month_depreciation_amount: number;
  depreciation_accumulation: number;
  remaining_amount: number;
}

const MOCKUP: IDontKnow[] = [
  {
    id: 1,
    code: "BAN.03.22.TN.P101.001",
    name: "BÀN TRONG PHÒNG",
    location: "Phòng 102",
    deprecate_date: dayjs().toDate(),
    sum_of_depreciation_amount: 150000,
    month_depreciation_amount: 275000,
    depreciation_accumulation: 85000,
    remaining_amount: 225000,
  },
  {
    id: 2,
    code: "BAN.03.22.TN.P101.002",
    name: "BÀN TRONG PHÒNG",
    location: "Phòng 102",
    deprecate_date: dayjs().toDate(),
    sum_of_depreciation_amount: 150000,
    month_depreciation_amount: 275000,
    depreciation_accumulation: 85000,
    remaining_amount: 225000,
  },
  {
    id: 3,
    code: "BAN.03.22.TN.P101.003",
    name: "BÀN TRONG PHÒNG",
    location: "Phòng 102",
    deprecate_date: dayjs().toDate(),
    sum_of_depreciation_amount: 150000,
    month_depreciation_amount: 275000,
    depreciation_accumulation: 85000,
    remaining_amount: 225000,
  },
  {
    id: 4,
    code: "BAN.03.22.TN.P101.004",
    name: "BÀN TRONG PHÒNG",
    location: "Phòng 102",
    deprecate_date: dayjs().toDate(),
    sum_of_depreciation_amount: 150000,
    month_depreciation_amount: 275000,
    depreciation_accumulation: 85000,
    remaining_amount: 225000,
  },
  {
    id: 5,
    code: "BAN.03.22.TN.P101.005",
    name: "BÀN TRONG PHÒNG",
    location: "Phòng 102",
    deprecate_date: dayjs().toDate(),
    sum_of_depreciation_amount: 150000,
    month_depreciation_amount: 275000,
    depreciation_accumulation: 85000,
    remaining_amount: 225000,
  },
  {
    id: 6,
    code: "BAN.03.22.TN.P101.006",
    name: "BÀN TRONG PHÒNG",
    location: "Phòng 102",
    deprecate_date: dayjs().toDate(),
    sum_of_depreciation_amount: 150000,
    month_depreciation_amount: 275000,
    depreciation_accumulation: 85000,
    remaining_amount: 225000,
  },
  {
    id: 7,
    code: "BAN.03.22.TN.P101.007",
    name: "BÀN TRONG PHÒNG",
    location: "Phòng 102",
    deprecate_date: dayjs().toDate(),
    sum_of_depreciation_amount: 150000,
    month_depreciation_amount: 275000,
    depreciation_accumulation: 85000,
    remaining_amount: 225000,
  },
  {
    id: 8,
    code: "BAN.03.22.TN.P101.008",
    name: "BÀN TRONG PHÒNG",
    location: "Phòng 102",
    deprecate_date: dayjs().toDate(),
    sum_of_depreciation_amount: 150000,
    month_depreciation_amount: 275000,
    depreciation_accumulation: 85000,
    remaining_amount: 225000,
  },
];

export const MAssetsTableInForm = ({ control }: IMAssetsTableInForm) => {
  //#region Data
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) =>
    setPagination((prev) => ({ ...prev, page: newPage }));
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IDontKnow> = [
    {
      key: "code",
      label: "Mã tài sản",
    },
    {
      key: "name",
      label: "Tên tài sản",
      align: "left",
    },
    {
      key: "location",
      label: "Vị trí",
      align: "left",
    },
    {
      key: "deprecate_date",
      label: "Ngày tính khấu hao",
      columnType: "date",
    },
    {
      key: "sum_of_depreciation_amount",
      label: "Giá trị tính KH",
      columnType: "number",
    },
    {
      key: "month_depreciation_amount",
      label: "Giá trị KH tháng",
      columnType: "number",
    },
    {
      key: "depreciation_accumulation",
      label: "Khấu hao lũy kế",
      columnType: "number",
    },
    {
      key: "remaining_amount",
      label: "Giá trị còn lại",
      columnType: "number",
    },
  ];
  return (
    <CTable
      headers={headers}
      data={MOCKUP}
      pagination={{
        page: pagination.page,
        pages: 1,
        limit: pagination.limit,
        onPageChange,
      }}
    />
  );
  //#endregion
};
