import { useCallback } from "react";

import { debounce } from "@mui/material";

export const useDebounce = (
  callback: (...args: any[]) => any,
  waitTime: number,
  deps: React.DependencyList = []
) => {
  return useCallback(debounce(callback, waitTime), [...deps]);
};
