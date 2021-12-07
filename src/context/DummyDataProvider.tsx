import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
  const [worker, setWorker] = useState<Worker>();

  useEffect(() => {
    if (!worker) return;
    worker.onmessage = onWorkerMessage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worker]);

  // @ts-ignore
  const onWorkerMessage = ({ data: { id, dummyDataRecords } }) => {
    updateDataSetRecords(id, dummyDataRecords);
  };

  const updateDataSetRecords = (
    id: string,
    dummyDataRecords: IDummyDataRecord[]
  ) => {
    const newDummyDataSetList = dummyDataSetList.map((dataSet) => {
      return dataSet.id === id
        ? { ...dataSet, records: dummyDataRecords }
        : dataSet;
    });
    setDummyDataSetList(newDummyDataSetList);
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
    const newDataSet = createNewDataSet(columnProperties);
    setDummyDataSetList([...dummyDataSetList, newDataSet]);

    const columnPropertiesJson = JSON.stringify(columnProperties);

    const worker: Worker = new Worker(
      new URL("../functions/createDataWorker", import.meta.url)
    );
    worker.postMessage({
      id: newDataSet.id,
      columnPropertiesJson,
      rowCount,
    });
    setWorker(worker);
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
