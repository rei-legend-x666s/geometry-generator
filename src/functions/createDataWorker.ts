// @ts-ignore
import { v4 as uuidV4 } from "uuid";
import { IColumnProperties, IDummyDataRecord } from "../types/general";
import FakerDataGenerator from "./FakerDataGenerator";
import RandomGenerator from "./RandomGenerator";

const worker = self as unknown as Worker;
worker.onmessage = ({ data: { columnProperties, rowCount } }) => {
  const fakerDataGenerator = new FakerDataGenerator();
  const randomGenerator = new RandomGenerator();
  const dummyDataInfo: IDummyDataRecord[] = [...Array(rowCount)].map((_) => ({
    id: uuidV4(),
    record: columnProperties.map(({ id, dataFormat }: IColumnProperties) => ({
      id,
      data: fakerDataGenerator.createData(dataFormat, randomGenerator.next()),
    })),
  }));
  postMessage({ input: columnProperties, output: dummyDataInfo });
};
