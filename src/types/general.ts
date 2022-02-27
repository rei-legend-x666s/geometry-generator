import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactNode } from "react";
import { DATA_TYPE_VALUE } from "../constants/column-format";
import { CRS_VALUE, DATASET_STATUS } from "../constants/utils";

export interface IProviderProps {
  children: ReactNode;
}

export interface IMenuItem {
  name: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
  route: string;
}

export interface IColumnProperties {
  id: string;
  name: string;
  dataFormat: DATA_TYPE_VALUE;
  options: ColumnOptions;
}

export type ColumnOptions =
  | IDefaultColumnOptions
  | IDatetimeColumnOptions
  | IGisColumnOptions
  | INumberRangeColumnOptions;

export interface IDefaultColumnOptions {
  formatter?: (data: DummyData) => string;
}

export interface INumberRangeColumnOptions {
  range: {
    min: number | null;
    max: number | null;
  };
}

export interface IDatetimeColumnOptions extends INumberRangeColumnOptions {
  format: string;
}

export interface IGisColumnOptions {
  range: {
    xMinMax: number[];
    yMinMax: number[];
  };
  formatter?: (data: DummyData) => string;
  crs: CRS_VALUE;
}

export interface IColumnDataFormat {
  label: string;
  value: number;
  options: ColumnOptions;
}

export interface IDummyDataProps {
  id: string;
  data: DummyData;
}

export type DummyData = string | number | number[] | null;

export interface IDummyDataRecord {
  id: string;
  record: IDummyDataProps[];
}

export interface IDummyDataSet extends IDataSetInputForm {
  id: string;
  records: IDummyDataRecord[];
  createdAt: string;
  status: DATASET_STATUS;
}

export interface IDataSetInputForm {
  name: string;
  columnPropsList: IColumnProperties[];
  rowCount: number;
  seed?: number;
}

export type Locale = "ja" | "en";
