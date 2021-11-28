// @ts-ignore
import { v4 as uuidV4 } from "uuid";
import { IColumnProperties, IDummyDataRecord } from "../types/general";
import FakerDataGenerator from "./FakerDataGenerator";

const worker = self as unknown as Worker;
worker.onmessage = ({ data: { columnProperties, rowCount } }) => {
  const fakerDataGenerator = new FakerDataGenerator();
  const dummyDataInfo: IDummyDataRecord[] = [...Array(rowCount)].map((_) => ({
    id: uuidV4(),
    record: columnProperties.map((columnProp: IColumnProperties) => ({
      id: columnProp.id,
      data: fakerDataGenerator.createData(columnProp),
    })),
  }));
  postMessage({ input: columnProperties, output: dummyDataInfo });
};
