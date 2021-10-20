import {
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
} from "@mui/material";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useDummyData } from "../context/DummyDataProvider";
import convertCsvText from "../functions/csvUtils";
import TabPanel from "./TabPanel";
import Title from "./Title";

const DataViewTable = () => {
  const { dummyDataSet } = useDummyData();
  const [tabIndex, setTabIndex] = useState("table");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeTabIndex = (event: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const convertCsvTextValue = () => {
    return dummyDataSet?.columnPropsList && dummyDataSet?.records
      ? convertCsvText(dummyDataSet.columnPropsList, dummyDataSet.records)
      : "";
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Title>Result View</Title>
      <Tabs value={tabIndex} onChange={handleChangeTabIndex}>
        <Tab value="table" label="table" />
        <Tab value="csv" label="csv" />
      </Tabs>
      <TabPanel index="table" value={tabIndex}>
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
      </TabPanel>
      <TabPanel index="csv" value={tabIndex}>
        <TextField
          multiline
          value={convertCsvTextValue()}
          rows={dummyDataSet?.records.length || 0}
        />
      </TabPanel>
    </Paper>
  );
};

export default DataViewTable;
