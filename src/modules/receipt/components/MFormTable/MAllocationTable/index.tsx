import { useEffect } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";

import { regionsApi } from "@apis/regions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CAutocomplete, CInput } from "@controls";
import { IRegionInReceiptPayload } from "@interfaces/receipts";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import { IMAllocationTableProps } from "./types";

export const MAllocationTable = ({ control }: IMAllocationTableProps) => {
  //#region Data
  const split_code = useWatch({ control, name: "split_code" });
  const quantity = useWatch({ control, name: "quantity" });
  const store_code = useWatch({ control, name: "store_code" });
  const price = useWatch({ control, name: "price" });

  const { data: regions } = useQuery({
    queryKey: ["danh-sach-vi-tri-phan-bo", store_code],
    queryFn: () => regionsApi.getAll(store_code),
    enabled: !!store_code,
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, id: e.id, label: e.name })),
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "regions",
    keyName: "__id",
  });
  //#endregion

  useEffect(() => {
    if (split_code) {
      const result = Array(quantity).fill({
        region_id: "",
        quantity: 1,
        location: "",
      });
      replace(result);
    } else {
      replace([{ region_id: "", quantity, location: "" }]);
    }
  }, [split_code, quantity]);

  //#region Render
  const headers: TCTableHeaders<IRegionInReceiptPayload> = [
    {
      key: "region_id",
      label: "mã đơn vị",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`regions.${index}.region_id`}
          render={({ field }) => (
            <CAutocomplete {...field} display="code" options={regions ?? []} />
          )}
        />
      ),
    },
    {
      key: "region_name",
      label: "tên đơn vị",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`regions.${index}.region_id`}
          render={({ field }) => (
            <CAutocomplete {...field} options={regions ?? []} />
          )}
        />
      ),
    },
    {
      key: "location",
      label: "vị trí",
      width: 300,
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`regions.${index}.location`}
          render={({ field }) => <CInput {...field} />}
        />
      ),
    },
    {
      key: "quantity",
      label: "số lượng",
      beautifyNumber: true,
      cellRender: (value, record, index) => <>{split_code ? 1 : quantity}</>,
    },
    {
      key: "price",
      label: "đơn giá",
      beautifyNumber: true,
      cellRender: (value, record, index) => (
        <>{(price ?? 0).toLocaleString()}</>
      ),
    },
    {
      key: "amount",
      label: "thành tiền",
      beautifyNumber: true,
      cellRender: (value, record, index) => (
        <>{(split_code ? price : price * quantity).toLocaleString()}</>
      ),
    },
    {
      key: "asset_code",
      label: "mã CCDC",
    },
  ];
  return (
    <CTable
      showIndexCol={false}
      headerTransform="capitalize"
      rowKey="__id"
      headers={headers}
      data={fields}
    />
  );
  //#endregion
};
