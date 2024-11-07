import React, { forwardRef } from "react";

import { Box, List } from "@mui/material";
import classNames from "classnames";
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
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, ...props }, ref) => {
  const { ownerState, className, ..._props } = props as any;
  return (
    <Box
      ref={ref}
      className={classNames(className, "virtual-listbox")}
      {..._props}
    >
      <Virtualizer as={ListBoxWrapper}>{children}</Virtualizer>
    </Box>
  );
});
