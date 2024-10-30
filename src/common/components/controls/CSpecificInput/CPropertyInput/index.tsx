import { Controller, Path, useController } from "react-hook-form";

import { propertiesApi } from "@apis/properties.api";
import { CAutocomplete } from "@controls";
import { MESSAGES, toast } from "@funcs/toast";
import { useGetAllProperties } from "@hooks/options";

import { ICPropertyInputProps, IPropertyInput } from "./types";

export const CPropertyInput = <T extends IPropertyInput>({
  control,
}: ICPropertyInputProps<T>) => {
  //#region Data
  const { properties, refetch } = useGetAllProperties();

  const {
    field: { value, onChange },
  } = useController({ control, name: "properties" as Path<T> });
  //#endregion

  //#region Event
  const onCreateProperty = async (name: string) => {
    try {
      const res = await propertiesApi.create({ name });
      const { id } = res.data.data;
      refetch();
      onChange([...value, Number(id)]);
      toast.success(MESSAGES("thuộc tính").SUCCESS.CREATE);
    } catch (error: any) {
      toast.error(error?.message ?? MESSAGES("thuộc tính").ERROR.CREATE);
    }
  };
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name={"properties" as Path<T>}
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
