import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import {
  IColumnProperties,
  IDummyDataRecord,
  IDummyDataSet,
} from "../types/general";

type DummyDataContextProps = {
  dummyDataSet: IDummyDataSet | undefined;
  dummyDataSetList: IDummyDataSet[];
  createDummyDataRecords: (
    columnProperties: IColumnProperties[],
    rowCount: number
  ) => void;
  setViewDataSet: (id: string) => void;
  removeDataSet: (id: string) => void;
};

const DummyDataContext = createContext({} as DummyDataContextProps);
export const useDummyData = () => useContext(DummyDataContext);

type DummyDataProviderProps = {
  children: ReactNode;
};

const DummyDataProvider = ({ children }: DummyDataProviderProps) => {
  const [dummyDataSet, setDummyDataSet] = useState<IDummyDataSet>();
  const [dummyDataSetList, setDummyDataSetList] = useState<IDummyDataSet[]>([]);
  const workerRef = useRef<Worker>();

  // @ts-ignore
  const onWorkerMessage = ({ data: { input, output } }) => {
    setDummyDataSetList([...dummyDataSetList, createNewDataSet(input, output)]);
  };

  const createNewDataSet = (
    columnPropsList: IColumnProperties[] = [],
    records: IDummyDataRecord[] = []
  ) => {
    return {
      id: uuidV4(),
      columnPropsList,
      records,
    };
  };

  const removeDataSet = (id: string) => {
    setDummyDataSetList(dummyDataSetList.filter((d) => d.id != id));
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

  const setViewDataSet = (id: string) => {
    const dataSet = dummyDataSetList.find((d) => d.id === id);
    if (dataSet) {
      setDummyDataSet(dataSet);
    }
  };

  return (
    <DummyDataContext.Provider
      value={{
        dummyDataSet,
        dummyDataSetList,
        createDummyDataRecords,
        setViewDataSet,
        removeDataSet,
      }}
    >
      {children}
    </DummyDataContext.Provider>
  );
};

export default DummyDataProvider;
