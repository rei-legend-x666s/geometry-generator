import { IDatetimeColumnOptions, IGisColumnOptions } from "../types/general";

const isGisColumnOptions = (options: any): options is IGisColumnOptions => {
  return options.range !== undefined && options.range.xMinMax !== undefined;
};

const isDatetimeColumnOptions = (
  options: any
): options is IDatetimeColumnOptions => {
  return (
    options.range !== undefined &&
    options.range.min !== undefined &&
    options.format !== undefined
  );
};

export { isGisColumnOptions, isDatetimeColumnOptions };
