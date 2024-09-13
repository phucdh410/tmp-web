import { Controller, useController } from "react-hook-form";

import { propertiesApi } from "@apis/properties.api";
import { CAutocomplete } from "@controls";
import { toast } from "@funcs/toast";
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
      toast.success("Thêm thuộc tính thành công");
    } catch (error: any) {
      toast.error(error?.message ?? "Thêm thuộc tính không thành công");
    }
  };
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="properties"
      render={({ field }) => (
        <CAutocomplete
          multiple
          options={properties}
          creatable
          easyCreate={onCreateProperty}
          {...field}
        />
      )}
    />
  );
  //#endregion
};
