import { useController, useWatch } from "react-hook-form";

import { amenitiesApi } from "@apis/amenities.api";
import { CCheckbox } from "@controls";
import { Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useQuery } from "@tanstack/react-query";

import { IMCheckboxRegionProps } from "./types";

export const MCheckboxRegion = ({ control }: IMCheckboxRegionProps) => {
  //#region Data
  const amenity_criteria_code = useWatch({ control, name: "criteria_code" });
  const amenitiesValue = useWatch({ control, name: "amenities" });

  const {
    field: { onChange },
  } = useController({ control, name: "amenities" });

  const { data: amenities } = useQuery({
    queryKey: ["danh-sach-cac-tien-ich", amenity_criteria_code],
    queryFn: () => amenitiesApi.getAll({ amenity_criteria_code }),
    enabled: !!amenity_criteria_code,
    select: (response) =>
      response?.data?.data?.map((e) => ({
        id: e?.id,
        code: e?.code,
        label: e?.name,
        price: e?.price,
      })),
  });
  //#endregion

  //#region Event
  const onCheckboxChange = (selectId: string) => (newValue: boolean) => {
    if (newValue) {
      const result = [...amenitiesValue, Number(selectId)];
      onChange(result);
    } else {
      const result = amenitiesValue.filter((e) => e !== Number(selectId));
      onChange(result);
    }
  };
  //#endregion

  //#region Render
  return (
    <Paper sx={{ p: 2, boxShadow: "0px 0px 18px 0px rgba(0, 0, 0, 0.10)" }}>
      <Typography fontSize={18} fontWeight={600} mb={1}>
        Danh sách các tiện ích của tiêu chí
      </Typography>
      <Grid2 container columns={4} rowSpacing={2} columnSpacing={3}>
        {amenities?.map((e) => (
          <Grid2 xs={1} key={e.id}>
            <CCheckbox
              label={`${e.label} - ${e.price}`}
              value={amenitiesValue.includes(Number(e.id))}
              onChange={onCheckboxChange(e.id)}
            />
          </Grid2>
        ))}
      </Grid2>
    </Paper>
  );
  //#endregion
};
