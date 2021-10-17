import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
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
  setDummyDataInfo: (
    columnProperties: IColumnProperties[],
    dummyDataRecords: IDummyDataRecord[]
  ) => void;
};

const DummyDataContext = createContext({} as DummyDataContextProps);
export const useDummyData = () => useContext(DummyDataContext);

type DummyDataProviderProps = {
  children: ReactNode;
};

const DummyDataProvider = ({ children }: DummyDataProviderProps) => {
  const [dummyDataSet, setDummyDataSet] = useState<IDummyDataSet>();
  const workerRef = useRef<Worker>();

  // @ts-ignore
  const onWorkerMessage = ({ data: { input, output } }) => {
    setDummyDataInfo(input, output);
  };

  const createDummyDataRecords = (
    columnProperties: IColumnProperties[],
    rowCount: number
  ) => {
    workerRef.current = new Worker(
      new URL("../functions/createDataWorker", import.meta.url)
    );
    workerRef.current.onmessage = onWorkerMessage;

    workerRef.current.postMessage({ columnProperties, rowCount });
  };

  const setDummyDataInfo = (
    columnProperties: IColumnProperties[],
    dummyDataRecords: IDummyDataRecord[]
  ) => {
    setDummyDataSet({
      id: uuidV4(),
      columnPropsList: columnProperties,
      records: dummyDataRecords,
    });
  };

  return (
    <DummyDataContext.Provider
      value={{ dummyDataSet, createDummyDataRecords, setDummyDataInfo }}
    >
      {children}
    </DummyDataContext.Provider>
  );
};

export default DummyDataProvider;
