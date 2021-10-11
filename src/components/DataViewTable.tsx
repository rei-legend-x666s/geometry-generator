import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDummyData } from "../context/DummyDataProvider";
import Title from "./Title";

const DataViewTable = () => {
  const { dummyDataSet } = useDummyData();

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Title>Result View</Title>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {dummyDataSet?.columnPropsList.map(({ id, name }) => (
                <TableCell key={id} align="center">
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyDataSet?.records.map((dataRecord) => (
              <TableRow key={dataRecord.id}>
                {dummyDataSet?.columnPropsList.map((columnProp) => (
                  <TableCell key={columnProp.id} align="center">
                    {dataRecord.record.find(
                      (dataProps) => dataProps.id === columnProp.id
                    )?.data || ""}
                  </TableCell>
                ))}
              </TableRow>
            )) || ""}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataViewTable;
