import { useState } from "react";

import { TCTableHeaders } from "@components/others/CTable/types";
import { Checkbox, Link, Stack } from "@mui/material";
import { CTable } from "@others";

interface IMockup {
  feature: string;
  key: string;
}
const MOCKUP = [
  { feature: "Phiếu luân chuyển", key: "transfer" },
  { feature: "Phiếu thanh lý", key: "liquidate" },
  { feature: "Phiếu thu hồi", key: "recovery" },
  { feature: "Phiếu ghi tăng", key: "receipt" },
  { feature: "Phiếu ghi giảm", key: "issue" },
  { feature: "Phiếu khấu hao", key: "deprecate" },
];

const MTestPage = () => {
  const [permissions, setPermissions] = useState([
    "transfer.view",
    "transfer.create",
    "transfer.update",
    "transfer.delete",
    "liquidate.view",
    "liquidate.export",
    "liquidate.approve",
    "liquidate.print",
    "deprecate.view",
  ]);

  const onCheck =
    (feature: string, permission: string) =>
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setPermissions((prev) => {
        const permissionKey = `${feature}.${permission}`;
        const viewPermissionKey = `${feature}.view`;

        if (checked) {
          return permission === "view"
            ? [...prev, permissionKey]
            : [...new Set([...prev, permissionKey, viewPermissionKey])];
        }

        return permission === "view"
          ? prev.filter((e) => !e.includes(feature))
          : prev.filter((e) => e !== permissionKey);
      });
    };

  const checkAll = (feature: string) => () => {
    const full = [
      `${feature}.view`,
      `${feature}.create`,
      `${feature}.update`,
      `${feature}.delete`,
      `${feature}.export`,
      `${feature}.print`,
      `${feature}.approve`,
    ];
    setPermissions((prev) => [...new Set([...prev, ...full])]);
  };

  const headers: TCTableHeaders<IMockup> = [
    {
      key: "feature",
      label: "chức năng",
      align: "left",
      width: 450,
      cellRender: (value, record, index) => (
        <Link
          href="#"
          sx={{ textDecoration: "none", fontWeight: 500 }}
          onClick={checkAll(record.key)}
        >
          {value}
        </Link>
      ),
    },
    {
      key: "view",
      label: "xem",
      width: 80,
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Checkbox
          checked={permissions.includes(`${record.key}.view`)}
          onChange={onCheck(record.key, "view")}
        />
      ),
    },
    {
      key: "create",
      label: "thêm",
      width: 80,
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Checkbox
          checked={permissions.includes(`${record.key}.create`)}
          onChange={onCheck(record.key, "create")}
        />
      ),
    },
    {
      key: "update",
      label: "sửa",
      width: 80,
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Checkbox
          checked={permissions.includes(`${record.key}.update`)}
          onChange={onCheck(record.key, "update")}
        />
      ),
    },
    {
      key: "delete",
      label: "xóa",
      width: 80,
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Checkbox
          checked={permissions.includes(`${record.key}.delete`)}
          onChange={onCheck(record.key, "delete")}
        />
      ),
    },
    {
      key: "print",
      label: "in",
      width: 80,
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Checkbox
          checked={permissions.includes(`${record.key}.print`)}
          onChange={onCheck(record.key, "print")}
        />
      ),
    },
    {
      key: "export",
      label: "export",
      width: 80,
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Checkbox
          checked={permissions.includes(`${record.key}.export`)}
          onChange={onCheck(record.key, "export")}
        />
      ),
    },
    {
      key: "approve",
      label: "duyệt",
      width: 80,
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Checkbox
          checked={permissions.includes(`${record.key}.approve`)}
          onChange={onCheck(record.key, "approve")}
        />
      ),
    },
  ];
  return (
    <Stack maxWidth={1200}>
      <CTable
        headers={headers}
        headerTransform="capitalize"
        showIndexCol={false}
        rowKey="feature"
        data={MOCKUP}
      />
    </Stack>
  );
};
export default MTestPage;
