import { v4 as uuidV4 } from "uuid";
import { DATA_TYPE_VALUE } from "../constants/column-format";
import { IColumnProperties } from "../types/general";

const createInitColumnProperty = (): IColumnProperties => ({
  id: uuidV4().toString(),
  name: "",
  dataFormat: DATA_TYPE_VALUE.NONE,
  options: {},
});

export { createInitColumnProperty };
