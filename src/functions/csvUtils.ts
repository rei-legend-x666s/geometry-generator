import { NEW_LINE_CODE } from "../constants/utils";
import { IColumnProperties, IDummyDataRecord } from "../types/general";

interface IConvertCsvOptions {
  needAddHead: boolean;
  newLineCode: NEW_LINE_CODE;
}

const convertCsvText = (
  columnProperties: IColumnProperties[],
  dataRecords: IDummyDataRecord[],
  options?: Partial<IConvertCsvOptions>
) => {
  const { needAddHead, newLineCode } = options
    ? options
    : { needAddHead: false, newLineCode: NEW_LINE_CODE.LF };

  const csvTextLines = [];
  if (needAddHead) {
    csvTextLines.push(columnProperties.map(({ name }) => name).join(","));
  }
  dataRecords.forEach(({ record }) => {
    csvTextLines.push(record.map(({ data }) => data).join(","));
  });
  return csvTextLines.join(newLineCode);
};

export default convertCsvText;
