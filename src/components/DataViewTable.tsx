import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useColumnProperty } from "../context/ColumnPropertyProvider";
import { useDummyData } from "../context/DummyDataProvider";
import Title from "./Title";

const DataViewTable = () => {
  const { columnProperties } = useColumnProperty();
  const { dummyDataRecords } = useDummyData();

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Title>Result View</Title>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              {columnProperties.map(({ id, name }) => (
                <TableCell key={id} align="center">
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyDataRecords.map((dataRecord, idx) => (
              <TableRow key={dataRecord.id}>
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                {columnProperties.map((columnProp) => (
                  <TableCell key={columnProp.id} align="center">
                    {dataRecord.record.find(
                      (dataProps) => dataProps.id === columnProp.id
                    )?.data || ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataViewTable;
