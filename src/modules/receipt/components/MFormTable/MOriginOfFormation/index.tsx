import { CTable } from "@others";

export const MOriginOfFormation = () => {
  //#region Data
  //#endregion

  //#region Render
  const headers = [
    {
      key: "date",
      label: "ngày chứng từ",
    },
    {
      key: "code",
      label: "số chứng từ",
    },
    {
      key: "note",
      label: "diễn giải",
    },
    {
      key: "file",
      label: "file đính kèm",
    },
  ];
  return (
    <CTable
      showIndexCol={false}
      headerTransform="capitalize"
      headers={headers}
      data={[]}
    />
  );
  //#endregion
};
