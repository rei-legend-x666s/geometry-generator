import { NEW_LINE_CODE } from "../constants/utils";
import { IColumnProperties, IDummyDataRecord } from "../types/general";

interface IConvertCsvOptions {
  needSerial: boolean;
  needHeader: boolean;
  newLineCode: string;
}

const convertCsvText = (
  columnProperties: IColumnProperties[],
  dataRecords: IDummyDataRecord[],
  options?: Partial<IConvertCsvOptions>
) => {
  const { needSerial, needHeader, newLineCode } = options
    ? options
    : {
        needSerial: false,
        needHeader: false,
        newLineCode: NEW_LINE_CODE.LF.code,
      };

  const csvTextLines = [];
  if (needHeader) {
    const header = columnProperties.map(({ name }) => name).join(",");
    csvTextLines.push(needSerial ? `#,${header}` : header);
  }
  dataRecords.forEach(({ record }, idx) => {
    const convertedTextLine = record
      .map(({ data }, idx1) => {
        const options = columnProperties[idx1].options;
        return "formatter" in options && options.formatter
          ? options.formatter(data)
          : data;
      })
      .join(",");
    csvTextLines.push(
      needSerial ? `${idx},${convertedTextLine}` : convertedTextLine
    );
  });
  return csvTextLines.join(newLineCode);
};

export default convertCsvText;
