import * as faker from "faker";
import { DATA_TYPE_VALUE } from "../constants/column-format";

const createFirstName = () => {
  faker.setLocale("ja");
  return faker.name.firstName();
};

const createLastName = () => {
  faker.setLocale("ja");
  return faker.name.lastName();
};

const createData = (dataFormat: DATA_TYPE_VALUE | null) => {
  let data = null;
  switch (dataFormat) {
    case DATA_TYPE_VALUE.FIRST_NAME:
      data = createFirstName();
      break;
    case DATA_TYPE_VALUE.LAST_NAME:
      data = createLastName();
      break;
  }
  return data;
};

export { createData, createFirstName, createLastName };
