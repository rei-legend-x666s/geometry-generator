import { IColumnDataFormat } from "../types/general";

export const DATA_TYPE_VALUE = {
  NONE: 0,
  LAST_NAME: 1,
  FIRST_NAME: 2,
  LATITUDE: 3,
  LONGITUDE: 4,
  GEOMETRY_POINT: 5,
  DATETIME: 6,
  DATE: 7,
} as const;

export type DATA_TYPE_VALUE =
  typeof DATA_TYPE_VALUE[keyof typeof DATA_TYPE_VALUE];

export const COLUMN_FORMAT_LIST: IColumnDataFormat[] = [
  {
    label: "None",
    value: DATA_TYPE_VALUE.NONE,
  },
  {
    label: "Last Name",
    value: DATA_TYPE_VALUE.LAST_NAME,
  },
  {
    label: "First Name",
    value: DATA_TYPE_VALUE.FIRST_NAME,
  },
  {
    label: "Latitude",
    value: DATA_TYPE_VALUE.LATITUDE,
  },
  {
    label: "Longitude",
    value: DATA_TYPE_VALUE.LONGITUDE,
  },
  {
    label: "Geometry(Point)",
    value: DATA_TYPE_VALUE.GEOMETRY_POINT,
  },
  {
    label: "Datetime",
    value: DATA_TYPE_VALUE.DATETIME,
  },
  {
    label: "Date",
    value: DATA_TYPE_VALUE.DATE,
  },
];
