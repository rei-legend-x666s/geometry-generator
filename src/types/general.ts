import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { DATA_TYPE_VALUE } from "../constants/column-format";

export interface IMenuItem {
  name: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
  route: string;
}

export interface IColumnProperties {
  id: string;
  name: string;
  dataFormat: DATA_TYPE_VALUE | null;
}

export interface IColumnDataFormat {
  label: string;
  value: number;
}

export interface IDummyDataProps {
  id: string;
  data: string | number | null; // TODO: More strictly
}

export interface IDummyDataRecord {
  id: string;
  record: IDummyDataProps[];
}

export interface IDummyDataSet {
  id: string;
  columnPropsList: IColumnProperties[];
  records: IDummyDataRecord[];
}
