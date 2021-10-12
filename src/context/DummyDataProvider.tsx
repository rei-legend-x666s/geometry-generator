import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { createData } from "../functions/fakerData";
import {
  IColumnProperties,
  IDummyDataRecord,
  IDummyDataSet,
} from "../types/general";

type DummyDataContextProps = {
  dummyDataSet: IDummyDataSet | undefined;
  createDummyDataRecords: (
    columnProperties: IColumnProperties[],
    rowCount: number
  ) => void;
};

const DummyDataContext = createContext({} as DummyDataContextProps);
export const useDummyData = () => useContext(DummyDataContext);

type DummyDataProviderProps = {
  children: ReactNode;
};

const DummyDataProvider = ({ children }: DummyDataProviderProps) => {
  const [dummyDataSet, setDummyDataSet] = useState<IDummyDataSet>();

  const createDummyData = ({ id, dataFormat }: IColumnProperties) => ({
    id: id,
    data: createData(dataFormat),
  });

  const createDummyDataRecords = (
    columnProperties: IColumnProperties[],
    rowCount: number
  ) => {
    const createdDummyDataRecords: IDummyDataRecord[] = [
      ...Array(rowCount),
    ].map((_) => ({
      id: uuidV4(),
      record: columnProperties.map(createDummyData),
    }));
    setDummyDataSet({
      id: uuidV4(),
      columnPropsList: columnProperties,
      records: createdDummyDataRecords,
    });
  };

  return (
    <DummyDataContext.Provider value={{ dummyDataSet, createDummyDataRecords }}>
      {children}
    </DummyDataContext.Provider>
  );
};

export default DummyDataProvider;
