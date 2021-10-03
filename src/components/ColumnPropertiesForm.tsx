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
import { COLUMN_FORMAT_LIST } from "../constants/column-format";
import { NATURAL_NUMBER } from "../constants/regex-constant";
import { useColumnProperty } from "../context/ColumnPropertyProvider";
import Title from "./Title";

const ColumnPropertiesForm = () => {
  const {
    columnProperties,
    addColumnProperties,
    deleteColumnProperties,
    clearColumnProperties,
    handleChangeColumnProperty,
  } = useColumnProperty();

  const [rowCount, setRowCount] = useState(1);
  const [isRowCountInputError, setIsRowCountInputError] = useState(false);

  const handleChangeRowCount = (event: ChangeEvent<HTMLInputElement>) => {
    setIsRowCountInputError(!NATURAL_NUMBER.test(event.target.value));
    setRowCount(Number(event.target.value));
  };

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
            onClick={addColumnProperties}
          >
            ADD
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Clear />}
            sx={{ m: 1 }}
            onClick={clearColumnProperties}
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
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {COLUMN_FORMAT_LIST.map((dataFormat) => (
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
                    onClick={() => deleteColumnProperties(columnProperties.id)}
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
