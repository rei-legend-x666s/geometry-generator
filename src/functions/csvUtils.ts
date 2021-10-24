import { NEW_LINE_CODE } from "../constants/utils";
import { IColumnProperties, IDummyDataRecord } from "../types/general";

interface IConvertCsvOptions {
  needHeader: boolean;
  newLineCode: string;
}

const convertCsvText = (
  columnProperties: IColumnProperties[],
  dataRecords: IDummyDataRecord[],
  options?: Partial<IConvertCsvOptions>
) => {
  const { needHeader, newLineCode } = options
    ? options
    : { needHeader: false, newLineCode: NEW_LINE_CODE.LF.code };

  const csvTextLines = [];
  if (needHeader) {
    csvTextLines.push(columnProperties.map(({ name }) => name).join(","));
  }
  dataRecords.forEach(({ record }) => {
    csvTextLines.push(record.map(({ data }) => data).join(","));
  });
  return csvTextLines.join(newLineCode);
};

export default convertCsvText;
