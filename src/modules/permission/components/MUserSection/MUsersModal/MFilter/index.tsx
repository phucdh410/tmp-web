import { useState } from "react";

import { CButton, CInput } from "@controls";
import { IParamsToGetUsersFromPos } from "@interfaces/permissions";
import { Stack } from "@mui/material";
import { CFilterInputWrapper } from "@others";

export const MFilter = ({ onSearch }) => {
  //#region Data
  const [params, setParams] = useState<IParamsToGetUsersFromPos>({
    code: "",
    name: "",
  });
  //#endregion

  //#region Event
  const onChange =
    (key: "code" | "name") => (event: React.ChangeEvent<HTMLInputElement>) =>
      setParams((prev) => ({ ...prev, [key]: event.target.value }));

  const onSubmitSearch = () => onSearch(params);
  //#endregion

  //#region Render
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="end">
      <Stack direction="row" gap={1}>
        <CFilterInputWrapper label="Mã nhân viên" width={220}>
          <CInput
            placeholder="Tìm theo mã nhân viên"
            value={params.code}
            onChange={onChange("code")}
          />
        </CFilterInputWrapper>
        <CFilterInputWrapper label="Tên nhân viên" width={280}>
          <CInput
            placeholder="Tìm theo tên nhân viên"
            value={params.name}
            onChange={onChange("name")}
          />
        </CFilterInputWrapper>
      </Stack>

      <CButton onClick={onSubmitSearch}>Tìm kiếm</CButton>
    </Stack>
  );
  //#endregion
};
