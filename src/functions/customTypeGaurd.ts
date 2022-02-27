import {
  IDatetimeColumnOptions,
  IGisColumnOptions,
  INumberRangeColumnOptions,
} from "../types/general";

const isGisColumnOptions = (options: any): options is IGisColumnOptions => {
  return options.range !== undefined && options.range.xMinMax !== undefined;
};

const isDatetimeColumnOptions = (
  options: any
): options is IDatetimeColumnOptions => {
  return hasNumberRangeProperty(options) && options.format !== undefined;
};

const isNumberRangeColumnOptions = (
  options: any
): options is INumberRangeColumnOptions => {
  return hasNumberRangeProperty(options);
};

const hasNumberRangeProperty = (options: any) => {
  return options.range !== undefined && options.range.min !== undefined;
};

export {
  isGisColumnOptions,
  isDatetimeColumnOptions,
  isNumberRangeColumnOptions,
};
