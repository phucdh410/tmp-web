import { TabProps, TabsProps } from "@mui/material";

import { StyledTab, StyledTabs } from "./StyledComponents";

export const CTabs = ({ ...props }: TabsProps) => {
  return <StyledTabs {...props} />;
};

export const CTab = ({ ...props }: TabProps) => {
  return <StyledTab {...props} />;
};
