import { ChangeEvent, useState } from "react";

interface useInputProps {
  value: string;
  error?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const useInput = (
  initialValue: string,
  isValidated?: (value: string) => boolean
): [useInputProps, (value?: string) => void] => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState(false);
  return [
    {
      value,
      error: isValidated ? error : undefined,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        if (isValidated) {
          setError(!isValidated(e.currentTarget.value));
        }
        setValue(e.currentTarget.value);
      },
    },
    (value) => setValue(value || initialValue),
  ];
};

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

export { useInput, useChecked };
