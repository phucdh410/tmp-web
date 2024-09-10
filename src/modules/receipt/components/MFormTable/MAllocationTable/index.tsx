import { CTable } from "@others";

export const MAllocationTable = () => {
  //#region Data
  //#endregion

  //#region Render
  const headers = [
    {
      key: "code",
      label: "mã đơn vị",
    },
    {
      key: "name",
      label: "tên đơn vị",
    },
    {
      key: "place_id",
      label: "vị trí",
    },
    {
      key: "quantity",
      label: "số lượng",
    },
    {
      key: "price",
      label: "đơn giá",
    },
    {
      key: "amount",
      label: "thành tiền",
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
      headers={headers}
      data={[]}
    />
  );
  //#endregion
};
