import { Add, Clear, PlayCircle } from "@mui/icons-material";
import {
  Button,
  Grid,
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
import { NATURAL_NUMBER } from "../../constants/regex-constant";
import { useColumnProperty } from "../../context/ColumnPropertyProvider";
import { useDummyData } from "../../context/DummyDataProvider";
import Title from "../Title";
import ColumnPropsTableRow from "./ColumnPropsTableRow";

const ColumnPropertiesForm = () => {
  const {
    columnProperties,
    addColumnProperties,
    deleteColumnProperties,
    clearColumnProperties,
    handleChangeColumnProperty,
  } = useColumnProperty();

  const { createDummyDataRecords } = useDummyData();

  const [dataSetName, setDataSetName] = useState("");
  const [rowCount, setRowCount] = useState(1);
  const [isRowCountInputError, setIsRowCountInputError] = useState(false);

  const handleChangeDataSetName = (event: ChangeEvent<HTMLInputElement>) => {
    setDataSetName(event.target.value);
  };

  const handleChangeRowCount = (event: ChangeEvent<HTMLInputElement>) => {
    setIsRowCountInputError(!NATURAL_NUMBER.test(event.target.value));
    setRowCount(Number(event.target.value));
  };

  const handleClickGenerate = () => {
    createDummyDataRecords(columnProperties, dataSetName, rowCount);
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
            label="Data Set Name"
            variant="standard"
            size="small"
            onChange={handleChangeDataSetName}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mx: 1 }}
          />
          <TextField
            label="Row Count"
            error={isRowCountInputError}
            type="number"
            variant="standard"
            size="small"
            defaultValue={rowCount}
            onChange={handleChangeRowCount}
            helperText={isRowCountInputError ? "Input natural number" : " "}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mx: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlayCircle />}
            sx={{ m: 1 }}
            onClick={handleClickGenerate}
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
              <TableCell align="center">Column name</TableCell>
              <TableCell align="center">Data format</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {columnProperties.map((columnProperty, idx) => (
              <ColumnPropsTableRow
                key={columnProperty.id}
                idx={idx}
                columnProperty={columnProperty}
                handleChangeColumnProperty={handleChangeColumnProperty}
                deleteColumnProperties={deleteColumnProperties}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ColumnPropertiesForm;