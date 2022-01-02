import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { DATA_TYPE_VALUE } from "../constants/column-format";
import { CRS_VALUE } from "../constants/utils";

export interface IMenuItem {
  name: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
  route: string;
}

export interface IColumnProperties {
  id: string;
  name: string;
  dataFormat: DATA_TYPE_VALUE;
  options: IDefaultColumnOptions | IDatetimeColumnOptions | IGisColumnOptions;
}

export interface IDefaultColumnOptions {
  formatter?: (data: DummyData) => string;
}

export interface IDatetimeColumnOptions {
  range: {
    min: number | null;
    max: number | null;
  };
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

export interface IDummyDataSet {
  id: string;
  name: string;
  columnPropsList: IColumnProperties[];
  records: IDummyDataRecord[];
  createdAt: string;
}

export type Locale = "ja" | "en";
