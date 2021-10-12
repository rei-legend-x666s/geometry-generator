import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDummyData } from "../context/DummyDataProvider";
import Title from "./Title";

const DataViewTable = () => {
  const { dummyDataSet } = useDummyData();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Title>Result View</Title>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {dummyDataSet?.columnPropsList.map(({ id, name }) => (
                <TableCell
                  key={id}
                  align="center"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                  }}
                >
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyDataSet?.records
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dataRecord) => (
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
      {dummyDataSet ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dummyDataSet.records.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        ""
      )}
    </Paper>
  );
};

export default DataViewTable;
