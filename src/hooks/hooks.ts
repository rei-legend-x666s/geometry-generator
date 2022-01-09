import { ChangeEvent, useState } from "react";

interface useCheckedProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const useChecked = (initialValue: boolean): [useCheckedProps, () => void] => {
  const [checked, setValue] = useState<boolean>(initialValue);
  return [
    {
      checked,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.checked),
    },
    () => setValue(initialValue),
  ];
};

export { useChecked };
