import { useCallback, useState } from "react";

import { debounce } from "@mui/material";

export const useDebounce = (
  callback: (...args: any[]) => any,
  waitTime: number,
  deps: React.DependencyList = []
) => {
  return useCallback(debounce(callback, waitTime), [...deps]);
};

interface IUseDebounceSearchProps {
  onGetNewValue: (newValue: string) => void;
  initialValue?: string;
  time?: number;
}

export const useDebounceSearch = ({
  onGetNewValue = (newValue: string) => {},
  initialValue = "",
  time = 400,
}: IUseDebounceSearchProps): [string, (directValue: string) => void] => {
  const [searchValue, setSearchValue] = useState<string>(initialValue ?? "");

  const debounceSearch = useDebounce(
    (value: string) => onGetNewValue(value),
    time,
    []
  );

  const onValueChange = (directValue: string) => {
    setSearchValue(directValue);
    debounceSearch(directValue);
  };

  return [searchValue, onValueChange];
};
