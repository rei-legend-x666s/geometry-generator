// @ts-ignore
import { v4 as uuidV4 } from "uuid";
import { IColumnProperties, IDummyDataRecord } from "../types/general";
import FakerDataGenerator from "./FakerDataGenerator";

const worker = self as unknown as Worker;
worker.onmessage = ({ data: { id, columnPropertiesJson, rowCount, seed } }) => {
  const columnProperties = JSON.parse(
    columnPropertiesJson
  ) as IColumnProperties[];
  const fakerDataGenerator = new FakerDataGenerator({ seed });
  const dummyDataRecords: IDummyDataRecord[] = [...Array(rowCount)].map(
    (_) => ({
      id: uuidV4(),
      record: columnProperties.map((columnProp: IColumnProperties) => ({
        id: columnProp.id,
        data: fakerDataGenerator.createData(columnProp),
      })),
    })
  );
  postMessage({ id, dummyDataRecords });
};
