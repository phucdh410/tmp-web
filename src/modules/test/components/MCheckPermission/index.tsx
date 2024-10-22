import { CButton } from "@controls";
import { Stack } from "@mui/material";

const permissions = ["transfer.view", "transfer.create"];

const checkPermission = (permissionKey: string) => {
  return permissions.includes(permissionKey);
};

export const CPermission = ({
  permissionKey,
  children,
}: {
  permissionKey: string;
  children: React.ReactNode;
}) => {
  return permissions.includes(permissionKey) ? children : <></>;
};

export const MCheckPermission = () => {
  return (
    <Stack maxWidth={200} gap={2}>
      <CPermission permissionKey="transfer.view">
        <CButton>Transfer View</CButton>
      </CPermission>
      <CPermission permissionKey="transfer.create">
        <CButton>Transfer Create</CButton>
      </CPermission>
      <CButton disabled={!checkPermission("recovery.create")}>
        Recovery Create
      </CButton>
    </Stack>
  );
};
