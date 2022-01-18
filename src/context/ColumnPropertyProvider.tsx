import {
  ChangeEvent,
  createContext,
  useContext,
  useState,
} from "react";
import { v4 as uuidV4 } from "uuid";
import { DATA_TYPE_VALUE } from "../constants/column-format";
import { CRS_VALUE, DATE_FORMAT } from "../constants/utils";
import { geometryPointFormatter } from "../functions/gisUtils";
import {
  IColumnProperties,
  IDatetimeColumnOptions,
  IDefaultColumnOptions,
  IGisColumnOptions,
  IProviderProps,
} from "../types/general";

type ColumnPropertyContextProps = {
  columnProperties: IColumnProperties[];
  setColumnProps: (columnProperties: IColumnProperties[]) => void;
  addColumnProperties: () => void;
  deleteColumnProperties: (id: string) => void;
  clearColumnProperties: () => void;
  setOptions: (
    id: string,
    options: IGisColumnOptions | IDatetimeColumnOptions
  ) => void;
  handleChangeColumnProperty: (
    id: string,
    prop: keyof IColumnProperties
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
};

const ColumnPropertyContext = createContext({} as ColumnPropertyContextProps);
export const useColumnProperty = () => useContext(ColumnPropertyContext);

const createInitColumnProperty = (): IColumnProperties => ({
  id: uuidV4().toString(),
  name: "",
  dataFormat: DATA_TYPE_VALUE.NONE,
  options: {},
});

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

  const setOptions = (
    id: string,
    options: IGisColumnOptions | IDatetimeColumnOptions
  ) => {
    setColumnProperties(
      columnProperties.map((columnProperties) =>
        columnProperties.id === id
          ? { ...columnProperties, options }
          : columnProperties
      )
    );
  };

  const handleChangeColumnProperty =
    (id: string, prop: keyof IColumnProperties) =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setColumnProperties(
        columnProperties.map((columnProperties) =>
          columnProperties.id === id
            ? prop === "dataFormat"
              ? {
                  ...columnProperties,
                  dataFormat: Number(value) as DATA_TYPE_VALUE,
                  options: createOptions(Number(value) as DATA_TYPE_VALUE),
                }
              : { ...columnProperties, [prop]: value }
            : columnProperties
        )
      );
    };

  const createOptions = (dataFormat: DATA_TYPE_VALUE) => {
    switch (dataFormat) {
      case DATA_TYPE_VALUE.LATITUDE:
      case DATA_TYPE_VALUE.LONGITUDE:
        return createLatLonOptions();
      case DATA_TYPE_VALUE.GEOMETRY_POINT:
        const options = createLatLonOptions();
        options.formatter = geometryPointFormatter;
        return options;
      case DATA_TYPE_VALUE.DATETIME:
        return createDatetimeOptions(DATE_FORMAT.TYPE2);
      case DATA_TYPE_VALUE.DATE:
        return createDatetimeOptions(DATE_FORMAT.TYPE3);
      default:
        return createDefaultOptions();
    }
  };

  const createLatLonOptions = (): IGisColumnOptions => {
    return {
      range: {
        xMinMax: [-50, 50],
        yMinMax: [-100, 100],
      },
      crs: CRS_VALUE.EPSG_4326,
    };
  };

  const createDatetimeOptions = (format: string): IDatetimeColumnOptions => {
    return {
      range: {
        min: null,
        max: null,
      },
      format,
    };
  };

  const createDefaultOptions = (): IDefaultColumnOptions => {
    return {};
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
