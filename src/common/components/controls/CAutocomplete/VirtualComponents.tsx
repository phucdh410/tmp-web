import React, { forwardRef } from "react";

import { Box, List } from "@mui/material";
import { CustomContainerComponentProps, Virtualizer } from "virtua";

const ListBoxWrapper = forwardRef<
  HTMLUListElement,
  CustomContainerComponentProps
>(({ children, ...props }, ref) => {
  return (
    <List ref={ref} {...props}>
      {children}
    </List>
  );
});

export const VirtualListBox = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, ...props }, ref) => {
  return (
    <Box ref={ref} {...props}>
      <Virtualizer as={ListBoxWrapper}>{children}</Virtualizer>
    </Box>
  );
});
