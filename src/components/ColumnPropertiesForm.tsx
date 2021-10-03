import { Add, Clear, Delete, PlayCircle } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { NATURAL_NUMBER } from "../constants/regex-constant";
import { IColumnProperties } from "../types/general";
import Title from "./Title";

const ColumnPropertiesForm = () => {
  const [columnProperties, setColumnProperties] = useState<IColumnProperties[]>(
    [{ id: uuidV4(), name: "", dataFormat: null }]
  );

  const [rowCount, setRowCount] = useState(1);
  const [isRowCountInputError, setIsRowCountInputError] = useState(false);

  const handleChangeRowCount = (event: ChangeEvent<HTMLInputElement>) => {
    setIsRowCountInputError(!NATURAL_NUMBER.test(event.target.value));
    setRowCount(Number(event.target.value));
  };

  const handleChangeColumnProperty =
    (id: string, prop: keyof IColumnProperties) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setColumnProperties(
        columnProperties.map((columnProperties) =>
          columnProperties.id === id
            ? { ...columnProperties, [prop]: event.target.value }
            : columnProperties
        )
      );
    };

  const addRow = () => {
    setColumnProperties([
      ...columnProperties,
      { id: uuidV4(), name: "", dataFormat: null },
    ]);
  };

  const deleteRow = (id: string) => {
    setColumnProperties(columnProperties.filter((row) => row.id !== id));
  };

  const clearRows = () => {
    setColumnProperties([{ id: uuidV4(), name: "", dataFormat: null }]);
  };

  const dataFormatList = [
    {
      label: "姓",
      value: 0,
    },
    {
      label: "名",
      value: 1,
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Title>Column Properties</Title>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{ m: 1 }}
            onClick={addRow}
          >
            ADD
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Clear />}
            sx={{ m: 1 }}
            onClick={clearRows}
          >
            CLEAR
          </Button>
        </Grid>
        <Grid item>
          <TextField
            label="Row Count"
            error={isRowCountInputError}
            type="number"
            variant="standard"
            size="small"
            defaultValue={rowCount}
            onChange={handleChangeRowCount}
            helperText={isRowCountInputError ? "Input natural number" : " "}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlayCircle />}
            sx={{ m: 1 }}
          >
            GENERATE
          </Button>
        </Grid>
      </Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Row name</TableCell>
              <TableCell align="center">Data format</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {columnProperties.map((columnProperties, idx) => (
              <TableRow key={columnProperties.id}>
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                <TableCell align="center">
                  <TextField
                    placeholder="Row name"
                    variant="outlined"
                    size="small"
                    value={columnProperties.name}
                    onChange={handleChangeColumnProperty(
                      columnProperties.id,
                      "name"
                    )}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    select
                    size="small"
                    sx={{ minWidth: 240, textAlign: "left" }}
                    value={columnProperties.dataFormat}
                    onChange={handleChangeColumnProperty(
                      columnProperties.id,
                      "dataFormat"
                    )}
                  >
                    {dataFormatList.map((dataFormat) => (
                      <MenuItem key={dataFormat.value} value={dataFormat.value}>
                        {dataFormat.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => deleteRow(columnProperties.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ColumnPropertiesForm;
