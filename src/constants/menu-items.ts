import { Home, Map } from "@mui/icons-material";
import { IMenuItem } from "../types/general";
import { GIS, HOME } from "./routes";

export const MENU_LIST_ITEMS: IMenuItem[] = [
  {
    name: "Home",
    Icon: Home,
    route: HOME,
  },
  {
    name: "Map",
    Icon: Map,
    route: GIS,
  },
];
