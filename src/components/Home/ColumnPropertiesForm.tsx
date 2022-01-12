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
  TextFieldProps,
} from "@mui/material";
import { INTEGER, NATURAL_NUMBER } from "../../constants/regex-constant";
import { useColumnProperty } from "../../context/ColumnPropertyProvider";
import { useDummyData } from "../../context/DummyDataProvider";
import { useInput } from "../../hooks/hooks";
import Title from "../utils/Title";
import ColumnPropsTableRow from "./ColumnPropsTableRow";

const textFieldProps: TextFieldProps = {
  variant: "standard",
  size: "small",
  InputLabelProps: {
    shrink: true,
  },
  sx: {
    mx: 1,
  },
};

const ColumnPropertiesForm = () => {
  const {
    columnProperties,
    addColumnProperties,
    deleteColumnProperties,
    clearColumnProperties,
    handleChangeColumnProperty,
  } = useColumnProperty();

  const { createDummyDataRecords } = useDummyData();

  const [dataSetNameProps] = useInput("");
  const [rowCountProps] = useInput("1", (value) => NATURAL_NUMBER.test(value));
  const [seedProps] = useInput("", (value) => INTEGER.test(value));

  const handleClickGenerate = () => {
    createDummyDataRecords(
      columnProperties,
      dataSetNameProps.value,
      Number(rowCountProps.value),
      seedProps.value ? Number(seedProps.value) : undefined
    );
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
            {...textFieldProps}
            {...dataSetNameProps}
          />
          <TextField
            label="Row Count"
            {...textFieldProps}
            {...rowCountProps}
            helperText={rowCountProps.error ? "Input natural number" : " "}
          />
          <TextField
            label="Seed"
            {...textFieldProps}
            {...seedProps}
            helperText={seedProps.error ? "Input integer" : " "}
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
