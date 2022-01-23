import { format } from "date-fns";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { DATE_FORMAT } from "../constants/utils";
import { createInitColumnProperty } from "../functions/columnUtils";
import {
  IDataSetInputForm,
  IDummyDataRecord,
  IDummyDataSet,
  IProviderProps,
} from "../types/general";

type DummyDataContextProps = {
  dummyDataSet: IDummyDataSet | undefined;
  dummyDataSetList: IDummyDataSet[];
  createDataSet: () => IDummyDataSet;
  createDummyDataRecords: (
    id: string,
    dataSetInputForm: IDataSetInputForm
  ) => void;
  setViewDataSet: (id: string) => void;
  addDataSet: (dataSet: IDummyDataSet) => void;
  removeDataSet: (id: string) => void;
};

const DummyDataContext = createContext({} as DummyDataContextProps);
export const useDummyData = () => useContext(DummyDataContext);

const DummyDataProvider = ({ children }: IProviderProps) => {
  const [dummyDataSet, setDummyDataSet] = useState<IDummyDataSet>();
  const [dummyDataSetList, setDummyDataSetList] = useState<IDummyDataSet[]>([]);
  const [worker, setWorker] = useState<Worker>();

  useEffect(() => {
    if (!worker) return;
    worker.onmessage = onWorkerMessage;
  }, [worker]);

  // @ts-ignore
  const onWorkerMessage = ({ data: { id, dummyDataRecords } }) => {
    updateDataSetRecords(id, dummyDataRecords);
  };

  const createDataWorker = (
    id: string,
    { columnPropsList, rowCount, seed }: IDataSetInputForm
  ) => {
    const worker: Worker = new Worker(
      new URL("../functions/createDataWorker", import.meta.url)
    );
    worker.postMessage({
      id,
      columnPropertiesJson: JSON.stringify(columnPropsList),
      rowCount,
      seed,
    });
    return worker;
  };

  const updateDataSetRecords = (
    id: string,
    dummyDataRecords: IDummyDataRecord[]
  ) => {
    const newDummyDataSetList = dummyDataSetList.map((dataSet) =>
      dataSet.id === id ? { ...dataSet, records: dummyDataRecords } : dataSet
    );
    setDummyDataSetList(newDummyDataSetList);
  };

  const createDataSet = (dataSet?: Partial<IDummyDataSet>): IDummyDataSet => {
    return Object.assign(
      {
        id: uuidV4().toString(),
        name: "",
        columnPropsList: [createInitColumnProperty()],
        rowCount: 1,
        records: [],
        seed: undefined,
        createdAt: format(new Date(), DATE_FORMAT.TYPE1),
      },
      dataSet
    );
  };

  const addDataSet = (dataSet: IDummyDataSet) => {
    setDummyDataSetList([...dummyDataSetList, dataSet]);
  };

  const removeDataSet = (id: string) => {
    setDummyDataSetList(dummyDataSetList.filter((d) => d.id != id));
  };

  const createDummyDataRecords = (
    id: string,
    dataSetInputForm: IDataSetInputForm
  ) => {
    const updatedDataSetList = dummyDataSetList.map((dataSet) =>
      dataSet.id === id ? Object.assign(dataSet, dataSetInputForm) : dataSet
    );
    setDummyDataSetList(updatedDataSetList);
    const worker = createDataWorker(id, dataSetInputForm);
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
        createDataSet,
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
