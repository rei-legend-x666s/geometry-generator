import { IMenuItem } from "../types/general";
import { Map } from "@material-ui/icons";
import { GIS } from "./routes";

export const MENU_LIST_ITEMS: IMenuItem[] = [
  {
    name: "Map",
    Icon: Map,
    route: GIS,
  },
  {
    name: "Home",
    Icon: Map,
    route: GIS,
  },
];
