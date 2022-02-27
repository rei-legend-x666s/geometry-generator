import { ChangeEvent, createContext, useContext, useState } from "react";
import {
  COLUMN_FORMAT_LIST,
  DATA_TYPE_VALUE,
} from "../constants/column-format";
import { createInitColumnProperty } from "../functions/columnUtils";
import {
  IColumnProperties,
  IProviderProps,
  ColumnOptions,
} from "../types/general";

type ColumnPropertyContextProps = {
  columnProperties: IColumnProperties[];
  setColumnProps: (columnProperties: IColumnProperties[]) => void;
  addColumnProperties: () => void;
  deleteColumnProperties: (id: string) => void;
  clearColumnProperties: () => void;
  setOptions: (id: string, options: ColumnOptions) => void;
  handleChangeColumnProperty: (
    id: string,
    prop: keyof IColumnProperties
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
};

const ColumnPropertyContext = createContext({} as ColumnPropertyContextProps);
export const useColumnProperty = () => useContext(ColumnPropertyContext);

const ColumnPropertyProvider = ({ children }: IProviderProps) => {
  const [columnProperties, setColumnProperties] = useState<IColumnProperties[]>(
    [createInitColumnProperty()]
  );

  const setColumnProps = (columnProperties: IColumnProperties[]) => {
    setColumnProperties(columnProperties);
  };

  const addColumnProperties = () => {
    setColumnProperties([...columnProperties, createInitColumnProperty()]);
  };

  const deleteColumnProperties = (id: string) => {
    setColumnProperties(columnProperties.filter((row) => row.id !== id));
  };

  const clearColumnProperties = () => {
    setColumnProperties([createInitColumnProperty()]);
  };

  const setOptions = (id: string, options: ColumnOptions) => {
    const updatedColumnProps = columnProperties.map((columnPros) =>
      columnPros.id === id ? { ...columnPros, options } : columnPros
    );
    setColumnProperties(updatedColumnProps);
  };

  const handleChangeColumnProperty =
    (id: string, prop: keyof IColumnProperties) =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      const columnPropsList = columnProperties.map((columnProp) =>
        columnProp.id === id
          ? prop === "dataFormat"
            ? createDataFormatProps(value, columnProp)
            : {
                ...columnProp,
                [prop]: value,
              }
          : columnProp
      );
      setColumnProperties(columnPropsList);
    };

  const createDataFormatProps = (value: string, props: IColumnProperties) => {
    const dataFormat = Number(value) as DATA_TYPE_VALUE;
    return {
      ...props,
      dataFormat,
      options: getOptionsFromDataType(dataFormat),
    };
  };

  const getOptionsFromDataType = (dataType: DATA_TYPE_VALUE) => {
    return COLUMN_FORMAT_LIST.find((item) => item.value === dataType)!.options;
  };

  return (
    <ColumnPropertyContext.Provider
      value={{
        columnProperties,
        addColumnProperties,
        setColumnProps,
        deleteColumnProperties,
        clearColumnProperties,
        setOptions,
        handleChangeColumnProperty,
      }}
    >
      {children}
    </ColumnPropertyContext.Provider>
  );
};

export default ColumnPropertyProvider;
