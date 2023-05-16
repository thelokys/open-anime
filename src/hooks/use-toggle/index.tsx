import { Dispatch, SetStateAction, useCallback, useState } from "react";

export const useToggle = (
  defaultValue?: boolean
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = useCallback(() => setValue((prevState) => !prevState), []);

  return [value, toggle, setValue];
};
