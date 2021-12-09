import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { IDummyDataSet } from "../../types/general";
import DataViewTableCell from "./DataViewTableCell";

interface DataListTableProps {
  dataSet?: IDummyDataSet;
}

const DataListTable = ({ dataSet }: DataListTableProps) => {
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
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {dataSet?.columnPropsList.map(({ id, name }) => (
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
            {dataSet?.records
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dataRecord) => (
                <TableRow key={dataRecord.id}>
                  {dataSet?.columnPropsList.map((columnProp) => {
                    const data = dataRecord.record.find(
                      (dataProps) => dataProps.id === columnProp.id
                    )!.data;
                    return (
                      <DataViewTableCell
                        key={columnProp.id}
                        options={columnProp.options}
                        data={data}
                      />
                    );
                  })}
                </TableRow>
              )) || ""}
          </TableBody>
        </Table>
      </TableContainer>
      {dataSet ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataSet.records.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default DataListTable;
