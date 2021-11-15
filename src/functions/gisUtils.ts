import { DATA_TYPE_VALUE } from "../constants/column-format";
import { IDummyDataSet } from "../types/general";

const getIndexLatLonDataType = ({
  columnPropsList,
}: IDummyDataSet): [number, number] => {
  const lonIndex = columnPropsList.findIndex(({ dataFormat }) => {
    return dataFormat === DATA_TYPE_VALUE.LONGITUDE;
  });
  const latIndex = columnPropsList.findIndex(({ dataFormat }) => {
    return dataFormat === DATA_TYPE_VALUE.LATITUDE;
  });
  return [lonIndex, latIndex];
};

export { getIndexLatLonDataType };
