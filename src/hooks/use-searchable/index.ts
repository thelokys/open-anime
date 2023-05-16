import { useMemo } from "react";

export const useSearchable = <T>(
  search: string,
  list: T[],
  searchProp: (item: T) => string
) => {
  return useMemo(() => {
    return list.filter((item) =>
      searchProp(item)?.toLowerCase()?.includes(search?.toLowerCase())
    );
  }, [search, list, searchProp]);
};
