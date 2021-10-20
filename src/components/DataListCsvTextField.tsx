import { TextField } from "@mui/material";
import convertCsvText from "../functions/csvUtils";
import { IDummyDataSet } from "../types/general";

interface DataListCsvTextFieldProps {
  dataSet?: IDummyDataSet;
}

const DataListCsvTextField = ({ dataSet }: DataListCsvTextFieldProps) => {
  const convertCsvTextValue = () => {
    return dataSet?.columnPropsList && dataSet?.records
      ? convertCsvText(dataSet.columnPropsList, dataSet.records)
      : "";
  };

  return (
    <TextField
      multiline
      value={convertCsvTextValue()}
      rows={dataSet?.records.length || 0}
    />
  );
};

export default DataListCsvTextField;
