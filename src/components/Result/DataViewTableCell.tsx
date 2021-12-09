import { TableCell } from "@mui/material";
import {
  DummyData,
  IDefaultColumnOptions,
  IGisColumnOptions,
} from "../../types/general";

interface DataViewTableCellProps {
  options: IDefaultColumnOptions | IGisColumnOptions;
  data: DummyData;
}

const DataViewTableCell = ({ options, data }: DataViewTableCellProps) => {
  const formattedData = () => {
    return data ? (options.formatter ? options.formatter(data) : data) : "";
  };

  return <TableCell align="center">{formattedData()}</TableCell>;
};

export default DataViewTableCell;
