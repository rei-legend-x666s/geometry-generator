import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { createData } from "../functions/fakerData";
import { IColumnProperties, IDummyDataRecord } from "../types/general";

type DummyDataContextProps = {
  dummyDataRecords: IDummyDataRecord[];
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
  const [dummyDataRecords, setDummyDataRecords] = useState<IDummyDataRecord[]>(
    []
  );

  const createDummyData = ({ id, dataFormat }: IColumnProperties) => ({
    id: id,
    data: createData(dataFormat),
  });

  const createDummyDataRecords = (
    columnProperties: IColumnProperties[],
    rowCount: number
  ) => {
    const createdDummyDataRecords = [...Array(rowCount)].map((_) => ({
      id: uuidV4(),
      record: columnProperties.map(createDummyData),
    }));
    setDummyDataRecords(createdDummyDataRecords);
  };

  return (
    <DummyDataContext.Provider
      value={{ dummyDataRecords, createDummyDataRecords }}
    >
      {children}
    </DummyDataContext.Provider>
  );
};

export default DummyDataProvider;
