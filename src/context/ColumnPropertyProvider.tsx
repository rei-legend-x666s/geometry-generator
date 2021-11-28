import {
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { v4 as uuidV4 } from "uuid";
import { DATA_TYPE_VALUE } from "../constants/column-format";
import { CRS_VALUE } from "../constants/utils";
import {
  IColumnProperties,
  IDefaultColumnOptions,
  IGisColumnOptions,
} from "../types/general";

type ColumnPropertyContextProps = {
  columnProperties: IColumnProperties[];
  addColumnProperties: () => void;
  deleteColumnProperties: (id: string) => void;
  clearColumnProperties: () => void;
  setOptions: (id: string, options: IGisColumnOptions) => void;
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
  options: {},
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

  const setOptions = (id: string, options: IGisColumnOptions) => {
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
      case DATA_TYPE_VALUE.GEOMETRY_POINT:
        return createLatLonOptions();
      default:
        return createDefaultOptions();
    }
  };

  const createLatLonOptions = (): IGisColumnOptions => {
    return {
      range: {
        xMinMax: [-90, 90],
        yMinMax: [-180, 180],
      },
      crs: CRS_VALUE.ESPG_4326,
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
