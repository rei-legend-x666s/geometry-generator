import { DATA_TYPE_VALUE } from "../constants/column-format";
import {
  DummyData,
  IColumnProperties,
  IDummyDataProps,
} from "../types/general";

const isGeometryDataType = (dataFormat: DATA_TYPE_VALUE | null) => {
  if (dataFormat === null) return false;
  switch (dataFormat) {
    case DATA_TYPE_VALUE.LATITUDE:
    case DATA_TYPE_VALUE.LONGITUDE:
    case DATA_TYPE_VALUE.GEOMETRY_POINT:
      return true;
    default:
      return false;
  }
};

const geometryPointFormatter = (data: DummyData) => {
  if (!(data && Array.isArray(data) && data.length === 2)) {
    return `can not format data:[${data}]`;
  }
  return `POINT(${data[0]} ${data[1]})`;
};

const createFeaturePropsFromRecord = (
  columnPropsList: IColumnProperties[],
  record: IDummyDataProps[]
) => {
  return columnPropsList.reduce((featureProps, { name, options }, idx) => {
    if ("formatter" in options) {
      featureProps[name] = options.formatter
        ? options.formatter(record[idx].data)
        : record[idx].data;
    }
    return featureProps;
  }, {} as { [key: string]: any });
};

export {
  isGeometryDataType,
  geometryPointFormatter,
  createFeaturePropsFromRecord,
};
