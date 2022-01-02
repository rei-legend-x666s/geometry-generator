import { IDatetimeColumnOptions } from "../types/general";

const isDatetimeOptions = (options: any): options is IDatetimeColumnOptions => {
  return (
    options.range !== undefined &&
    options.range.min !== undefined &&
    options.format !== undefined
  );
};

export { isDatetimeOptions };
