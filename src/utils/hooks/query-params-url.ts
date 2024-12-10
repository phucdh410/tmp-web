import { useSearchParams } from "react-router-dom";

export const useURLSearchParams = <T extends Record<string, any>>() => {
  const [_searchParams, _setSearchParams] = useSearchParams();

  const searchParams = {} as { [key in keyof T]?: string };
  for (let [key, value] of _searchParams.entries()) {
    searchParams[key as keyof T] = value;
  }
  const setSearchParams = (key: keyof T, value: any) => {
    _searchParams.set(key as string, value?.toString());
    _setSearchParams(_searchParams, { replace: true });
  };

  return { searchParams, setSearchParams };
};
