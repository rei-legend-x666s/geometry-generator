import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface IMenuItem {
  name: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
  route: string;
}

export interface IColumnProperties {
  id: string;
  name: string;
  dataFormat: number | null;
}
