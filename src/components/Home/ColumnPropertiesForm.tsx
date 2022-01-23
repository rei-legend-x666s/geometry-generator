import { Add, Clear, Close, PlayCircle } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextFieldProps,
  Toolbar,
} from "@mui/material";
import { useEffect } from "react";
import { INTEGER, NATURAL_NUMBER } from "../../constants/regex-constant";
import { useColumnProperty } from "../../context/ColumnPropertyProvider";
import { useDummyData } from "../../context/DummyDataProvider";
import { useInput } from "../../hooks/hooks";
import { IDummyDataSet } from "../../types/general";
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

interface ColumnPropertiesFormProps {
  closeSelf: () => void;
  openDialog: (handleClickOk: () => void, message: string) => void;
  editingDataSet: IDummyDataSet;
}

const ColumnPropertiesForm = ({
  closeSelf,
  openDialog,
  editingDataSet,
}: ColumnPropertiesFormProps) => {
  const {
    columnProperties,
    setColumnProps,
    addColumnProperties,
    deleteColumnProperties,
    clearColumnProperties,
    handleChangeColumnProperty,
  } = useColumnProperty();

  const { createDummyDataRecords } = useDummyData();

  const [dataSetNameProps, resetDataSetName] = useInput("");
  const [rowCountProps, resetRowCount] = useInput("1", (value) =>
    NATURAL_NUMBER.test(value)
  );
  const [seedProps, resetSeed] = useInput("", (value) => INTEGER.test(value));

  useEffect(() => {
    setColumnProps(editingDataSet.columnPropsList);
    resetDataSetName(editingDataSet.name);
    resetRowCount(editingDataSet.rowCount.toString());
    resetSeed(editingDataSet.seed?.toString() || "");
  }, [editingDataSet]);

  const handleClickClose = () => {
    openDialog(closeSelf, "Do you want to close?.");
  };

  const handleClickGenerate = () => {
    createDummyDataRecords(editingDataSet.id, {
      name: dataSetNameProps.value,
      columnPropsList: columnProperties,
      rowCount: Number(rowCountProps.value),
      seed: seedProps.value ? Number(seedProps.value) : undefined,
    });
    closeSelf();
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Toolbar variant="dense" sx={{ p: "0!important" }}>
        <Title>Column Properties</Title>
        <div style={{ flexGrow: 1 }} />
        <IconButton sx={{ p: 0 }} onClick={handleClickClose}>
          <Close />
        </IconButton>
      </Toolbar>
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
