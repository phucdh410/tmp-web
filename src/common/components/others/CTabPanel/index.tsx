import { ICTabPanelProps } from "./types";

export const CTabPanel = ({ value, tabValue, children }: ICTabPanelProps) => {
  return (
    <div role="tabpanel" hidden={value !== tabValue}>
      {children}
    </div>
  );
};
