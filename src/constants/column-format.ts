import { geometryPointFormatter } from "../functions/gisUtils";
import { IColumnDataFormat } from "../types/general";
import { CRS_VALUE, DATE_FORMAT } from "./utils";

export const DATA_TYPE_VALUE = {
  NONE: 0,
  LAST_NAME: 1,
  FIRST_NAME: 2,
  LATITUDE: 3,
  LONGITUDE: 4,
  GEOMETRY_POINT: 5,
  DATETIME: 6,
  DATE: 7,
  NUMBER: 8,
} as const;

export type DATA_TYPE_VALUE =
  typeof DATA_TYPE_VALUE[keyof typeof DATA_TYPE_VALUE];

const DEFAULT_COLUMN_OPTION = {};

const GIS_COLUMN_COMMON_OPTION = {
  range: {
    xMinMax: [-50, 50],
    yMinMax: [-100, 100],
  },
  crs: CRS_VALUE.EPSG_4326,
};

const NUMBER_RANGE_COLUMN_COMMON_OPTION = {
  range: {
    min: null,
    max: null,
  },
};

export const COLUMN_FORMAT_LIST: IColumnDataFormat[] = [
  {
    label: "None",
    value: DATA_TYPE_VALUE.NONE,
    options: DEFAULT_COLUMN_OPTION,
  },
  {
    label: "Last Name",
    value: DATA_TYPE_VALUE.LAST_NAME,
    options: DEFAULT_COLUMN_OPTION,
  },
  {
    label: "First Name",
    value: DATA_TYPE_VALUE.FIRST_NAME,
    options: DEFAULT_COLUMN_OPTION,
  },
  {
    label: "Latitude",
    value: DATA_TYPE_VALUE.LATITUDE,
    options: GIS_COLUMN_COMMON_OPTION,
  },
  {
    label: "Longitude",
    value: DATA_TYPE_VALUE.LONGITUDE,
    options: GIS_COLUMN_COMMON_OPTION,
  },
  {
    label: "Geometry(Point)",
    value: DATA_TYPE_VALUE.GEOMETRY_POINT,
    options: {
      ...GIS_COLUMN_COMMON_OPTION,
      formatter: geometryPointFormatter,
    },
  },
  {
    label: "Datetime",
    value: DATA_TYPE_VALUE.DATETIME,
    options: {
      ...NUMBER_RANGE_COLUMN_COMMON_OPTION,
      format: DATE_FORMAT.TYPE2,
    },
  },
  {
    label: "Date",
    value: DATA_TYPE_VALUE.DATE,
    options: {
      ...NUMBER_RANGE_COLUMN_COMMON_OPTION,
      format: DATE_FORMAT.TYPE3,
    },
  },
  {
    label: "Number",
    value: DATA_TYPE_VALUE.NUMBER,
    options: NUMBER_RANGE_COLUMN_COMMON_OPTION,
  },
];
