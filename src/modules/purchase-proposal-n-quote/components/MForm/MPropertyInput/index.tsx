import { Controller, useController } from "react-hook-form";

import { propertiesApi } from "@apis/properties.api";
import { CAutocomplete } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useGetAllProperties } from "@hooks/options";

import { IMPropertyInputProps } from "./types";

export const MPropertyInput = ({ control }: IMPropertyInputProps) => {
  //#region Data
  const { properties, refetch } = useGetAllProperties();

  const {
    field: { value, onChange },
  } = useController({ control, name: "properties" });
  //#endregion

  //#region Event
  const onCreateProperty = async (name: string) => {
    try {
      const res = await propertiesApi.create({ name });
      const { id } = res.data.data;
      refetch();
      onChange([...value, Number(id)]);
      noti.success(MESSAGES("thuộc tính").SUCCESS.CREATE);
    } catch (error: any) {
      noti.error(error?.message ?? MESSAGES("thuộc tính").ERROR.CREATE);
    }
  };
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="properties"
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          multiple
          options={properties}
          creatable
          easyCreate={onCreateProperty}
          error={!!error}
          placeholder="Chọn các thuộc tính"
          {...field}
        />
      )}
    />
  );
  //#endregion
};
