import { useMemo } from "react";
import { useController, useWatch } from "react-hook-form";

import { amenitiesApi } from "@apis/amenities.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { IAmenity } from "@interfaces/amenities";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import { IMAmenitiesTableProps } from "./types";

export const MAmenitiesTable = ({ control }: IMAmenitiesTableProps) => {
  //#region Data
  const amenities = useWatch({ control, name: "amenities" });
  const {
    field: { onChange },
  } = useController({ control, name: "amenities" });

  const { data } = useQuery({
    queryKey: ["danh-sach-tat-ca-tien-ich"],
    queryFn: () => amenitiesApi.getAll(),
    select: (response) => response?.data?.data,
  });

  const tableData = useMemo(() => {
    if (amenities && data) {
      let result: IAmenity[] = [];
      data.forEach((e) => {
        if (amenities.includes(e.id)) {
          result.push(e);
        }
      });
      return result;
    } else {
      return [];
    }
  }, [data, amenities]);
  //#endregion

  //#region Event
  const onRemove = (id: number) => () => {
    const result = amenities.filter((e) => e !== id);
    onChange(result);
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAmenity> = [
    { key: "code", label: "mã tiện ích" },
    { key: "name", label: "tên tiện ích", align: "left" },
    {
      key: "price",
      label: "giá tiện ích",
      columnType: "number",
      align: "right",
    },
    {
      key: "action",
      label: "tác vụ",
      cellRender: (value, record, index) => (
        <CButton
          variant="text"
          color="error"
          size="small"
          onClick={onRemove(record?.id)}
        >
          Xóa
        </CButton>
      ),
    },
  ];
  return (
    <CTable
      showIndexCol={false}
      headers={headers}
      headerTransform="capitalize"
      data={tableData ?? []}
    />
  );
  //#endregion
};
