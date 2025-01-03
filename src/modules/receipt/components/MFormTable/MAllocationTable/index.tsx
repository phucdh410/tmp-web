import { useEffect } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { CAutocomplete, CInput } from "@controls";
import { useGetAllRegions } from "@hooks/options";
import { IRegionInReceiptPayload } from "@interfaces/receipts";
import { CTable } from "@others";

import { IMAllocationTableProps } from "./types";

export const MAllocationTable = ({
  control,
  isEdit,
}: IMAllocationTableProps) => {
  //#region Data
  const split_code = useWatch({ control, name: "split_code" });
  const quantity = useWatch({ control, name: "quantity" });
  const store_code = useWatch({ control, name: "store_code" });
  const price = useWatch({ control, name: "price" });

  const { regions } = useGetAllRegions(
    { store_code },
    { enabled: !!store_code }
  );

  const { fields, replace } = useFieldArray({
    control,
    name: "regions",
    keyName: "__id",
  });
  //#endregion

  useEffect(() => {
    if (isEdit) return;
    if (split_code) {
      const result = Array(quantity).fill({
        region_id: -1,
        quantity: 1,
        location: "",
      });
      replace(result);
    } else replace([{ region_id: -1, quantity, location: "" }]);
  }, [split_code, quantity, isEdit]);

  //#region Render
  const headers: TCTableHeaders<IRegionInReceiptPayload> = [
    {
      key: "region_id",
      label: "mã đơn vị",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`regions.${index}.region_id`}
          render={({ field, fieldState: { error } }) => (
            <CAutocomplete
              {...field}
              display="code"
              error={!!error}
              placeholder="Chọn đơn vị"
              options={regions ?? []}
              renderOption={(props, option) => (
                <li {...props} key={option?.id}>
                  {option?.code}
                </li>
              )}
            />
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
          render={({ field, fieldState: { error } }) => (
            <CAutocomplete
              {...field}
              error={!!error}
              placeholder="Chọn đơn vị"
              options={regions ?? []}
              renderOption={(props, option) => (
                <li {...props} key={option?.id}>
                  {option?.label}
                </li>
              )}
            />
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
          render={({ field, fieldState: { error } }) => (
            <CInput error={!!error} placeholder="Nhập vị trí" {...field} />
          )}
        />
      ),
    },
    {
      key: "quantity",
      label: "số lượng",
      cellRender: (value, record, index) => (
        <>{(split_code ? 1 : quantity)?.toLocaleString()}</>
      ),
    },
    {
      key: "price",
      label: "đơn giá",
      cellRender: (value, record, index) => (
        <>{(price ?? 0).toLocaleString()}</>
      ),
    },
    {
      key: "amount",
      label: "thành tiền",
      cellRender: (value, record, index) => (
        <>{(split_code ? price : price * quantity).toLocaleString()}</>
      ),
    },
    {
      key: "code",
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
