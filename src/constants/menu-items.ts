import { FormatListNumbered, Home, Map } from "@mui/icons-material";
import { IMenuItem } from "../types/general";
import { GIS, HOME, RESULT } from "./routes";

export const MENU_LIST_ITEMS: IMenuItem[] = [
  {
    name: "Home",
    Icon: Home,
    route: HOME,
  },
  {
    name: "Result",
    Icon: FormatListNumbered,
    route: RESULT,
  },
  {
    name: "Map",
    Icon: Map,
    route: GIS,
  },
];
