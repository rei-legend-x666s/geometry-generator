import { IColumnDataFormat } from "../types/general";

export const DATA_TYPE_VALUE = {
  LAST_NAME: 0,
  FIRST_NAME: 1,
} as const;

export type DATA_TYPE_VALUE =
  typeof DATA_TYPE_VALUE[keyof typeof DATA_TYPE_VALUE];

export const COLUMN_FORMAT_LIST: IColumnDataFormat[] = [
  {
    label: "Last Name",
    value: DATA_TYPE_VALUE.LAST_NAME,
  },
  {
    label: "First Name",
    value: DATA_TYPE_VALUE.FIRST_NAME,
  },
];
