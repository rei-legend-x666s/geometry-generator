import {
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { v4 as uuidV4 } from "uuid";
import { IColumnProperties } from "../types/general";

type ColumnPropertyContextProps = {
  columnProperties: IColumnProperties[];
  addColumnProperties: () => void;
  deleteColumnProperties: (id: string) => void;
  clearColumnProperties: () => void;
  handleChangeColumnProperty: (
    id: string,
    prop: keyof IColumnProperties
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
};

const ColumnPropertyContext = createContext({} as ColumnPropertyContextProps);
export const useColumnProperty = () => useContext(ColumnPropertyContext);

type ColumnPropertyProviderProps = {
  children: ReactNode;
};

const createInitColumnProperty = (): IColumnProperties => ({
  id: uuidV4().toString(),
  name: "",
  dataFormat: null,
});

const ColumnPropertyProvider = ({ children }: ColumnPropertyProviderProps) => {
  const [columnProperties, setColumnProperties] = useState<IColumnProperties[]>(
    [createInitColumnProperty()]
  );

  const addColumnProperties = () => {
    setColumnProperties([...columnProperties, createInitColumnProperty()]);
  };

  const deleteColumnProperties = (id: string) => {
    setColumnProperties(columnProperties.filter((row) => row.id !== id));
  };

  const clearColumnProperties = () => {
    setColumnProperties([createInitColumnProperty()]);
  };

  const handleChangeColumnProperty =
    (id: string, prop: keyof IColumnProperties) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setColumnProperties(
        columnProperties.map((columnProperties) =>
          columnProperties.id === id
            ? { ...columnProperties, [prop]: event.target.value }
            : columnProperties
        )
      );
    };

  return (
    <ColumnPropertyContext.Provider
      value={{
        columnProperties,
        addColumnProperties,
        deleteColumnProperties,
        clearColumnProperties,
        handleChangeColumnProperty,
      }}
    >
      {children}
    </ColumnPropertyContext.Provider>
  );
};

export default ColumnPropertyProvider;
