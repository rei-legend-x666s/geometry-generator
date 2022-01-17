import { format } from "date-fns";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuidV4 } from "uuid";
import { DATE_FORMAT } from "../constants/utils";
import {
  IColumnProperties,
  IDummyDataRecord,
  IDummyDataSet,
} from "../types/general";

type DummyDataContextProps = {
  dummyDataSet: IDummyDataSet | undefined;
  dummyDataSetList: IDummyDataSet[];
  createNewDataSet: () => IDummyDataSet;
  createDummyDataRecords: (
    id: string,
    columnProperties: IColumnProperties[],
    dataSetName: string,
    rowCount: number,
    seed?: number
  ) => void;
  setViewDataSet: (id: string) => void;
  addDataSet: (dataSet: IDummyDataSet) => void;
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

  const createDataSet = (
    columnPropsList: IColumnProperties[],
    dataSetName: string,
    records: IDummyDataRecord[],
    seed?: number
  ) => {
    return {
      id: uuidV4().toString(),
      name: dataSetName,
      columnPropsList,
      records,
      seed,
      createdAt: format(new Date(), DATE_FORMAT.TYPE1),
    };
  };

  const createNewDataSet = () => {
    return createDataSet([], "", []);
  };

  const addDataSet = (dataSet: IDummyDataSet) => {
    setDummyDataSetList([...dummyDataSetList, dataSet]);
  };

  const removeDataSet = (id: string) => {
    setDummyDataSetList(dummyDataSetList.filter((d) => d.id != id));
  };

  const createDummyDataRecords = (
    id: string,
    columnProperties: IColumnProperties[],
    dataSetName: string,
    rowCount: number,
    seed?: number
  ) => {
    setDummyDataSetList(
      dummyDataSetList.map((d) =>
        d.id === id
          ? {
              ...d,
              columnPropsList: columnProperties,
              name: dataSetName,
              seed,
            }
          : d
      )
    );

    const columnPropertiesJson = JSON.stringify(columnProperties);

    const worker: Worker = new Worker(
      new URL("../functions/createDataWorker", import.meta.url)
    );
    worker.postMessage({
      id,
      columnPropertiesJson,
      rowCount,
      seed,
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
        createNewDataSet,
        createDummyDataRecords,
        setViewDataSet,
        addDataSet,
        removeDataSet,
      }}
    >
      {children}
    </DummyDataContext.Provider>
  );
};

export default DummyDataProvider;
