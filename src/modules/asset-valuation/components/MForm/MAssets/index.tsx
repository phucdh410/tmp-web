import { Controller, useFieldArray, useForm } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { ASSET_VALUATION_TYPES } from "@constants/enums";
import { ASSET_VALUATION_TYPES_OPTIONS } from "@constants/options";
import {
  CAutocomplete,
  CButton,
  CCategoryInput,
  CRadioButton,
} from "@controls";
import { IAssetInAssetValuationPayload } from "@interfaces/asset-valuations";
import { Stack } from "@mui/material";
import { CFormInputWrapper, CFormLabel, CTable } from "@others";

import { IMAssetsProps } from "./types";

const MOCKUP = [
  {
    __id: "1",
    id: 1,
    code: "ASSET.001",
    name: "Bàn sắt",
    dinh_gia_tai_san: 0,
    note: "",
  },
  {
    __id: "2",
    id: 2,
    code: "ASSET.002",
    name: "Bàn gỗ",
    dinh_gia_tai_san: 0,
    note: "",
  },
  {
    __id: "3",
    id: 3,
    code: "ASSET.003",
    name: "Bàn ũi",
    dinh_gia_tai_san: 0,
    note: "",
  },
  {
    __id: "4",
    id: 4,
    code: "ASSET.004",
    name: "Bàn ra",
    dinh_gia_tai_san: 0,
    note: "",
  },
  {
    __id: "5",
    id: 5,
    code: "ASSET.005",
    name: "Bàn dô",
    dinh_gia_tai_san: 0,
    note: "",
  },
];

export const MAssets = ({
  control: formControl,
  selectedIndex,
  setSelectedIndex,
}: IMAssetsProps) => {
  //#region Data
  const { control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      category_id: -1,
      asset_id: -1,
      type: ASSET_VALUATION_TYPES.REMAINING_DEPRECIATION,
    },
  });

  const { fields } = useFieldArray({
    control: formControl,
    name: "assets",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      console.log("🤣 values at line 39 🤣:", values);
    })();
  };

  // const onRowClick = (
  //   event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  //   record: {
  //     __id: string;
  //     id: number;
  //     code: string;
  //     name: string;
  //     dinh_gia_tai_san: number;
  //     note: string;
  //   },
  //   index: number
  // ) => {
  //   setSelectedIndex(index);
  // };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInAssetValuationPayload> = [
    { key: "code", label: "mã tài sản", align: "left" },
    { key: "name", label: "tên tài sản", align: "left" },
    {
      key: "action",
      label: "",
      cellRender: (value, record, index) => (
        <CButton variant="text" color="error">
          Xóa
        </CButton>
      ),
    },
  ];
  return (
    <Stack gap={1.3} minWidth={460}>
      <CFormInputWrapper gap={1} percent={{ label: 35, input: 65 }}>
        <CFormLabel required>Loại CCDC</CFormLabel>
        <CCategoryInput control={control} />
      </CFormInputWrapper>
      <CFormInputWrapper gap={1} percent={{ label: 35, input: 65 }}>
        <CFormLabel required>Loại định giá</CFormLabel>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <CRadioButton options={ASSET_VALUATION_TYPES_OPTIONS} {...field} />
          )}
        />
      </CFormInputWrapper>
      <CFormInputWrapper gap={1} percent={{ label: 35, input: 65 }}>
        <CFormLabel required>Tên CCDC</CFormLabel>
        <Controller
          control={control}
          name="asset_id"
          render={({ field }) => (
            <CAutocomplete {...field} options={[]} placeholder="Chọn tài sản" />
          )}
        />
      </CFormInputWrapper>
      <Stack direction="row" justifyContent="end">
        <CButton onClick={onSubmit}>Thêm tài sản</CButton>
      </Stack>
      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        data={MOCKUP || fields}
        dense
        rowKey="__id"
      />
    </Stack>
  );
  //#endregion
};
