import {
  Add,
  Delete,
  Edit,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import {
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { DATASET_STATUS, DATE_FORMAT } from "../../constants/utils";
import { useDummyData } from "../../context/DummyDataProvider";
import { useGlobalData } from "../../context/GlobalDataProvider";
import { formatFromISO } from "../../functions/dateUtils";
import { IDummyDataSet } from "../../types/general";
import ConfirmDialog from "../utils/ConfirmDialog";
import Title from "../utils/Title";

interface DataSetListProps {
  openDialog: (handleClickOk: () => void, message: string) => void;
}

const DataSetList = ({ openDialog }: DataSetListProps) => {
  const { isEditing, setEditingDataSetId } = useGlobalData();
  const {
    dummyDataSet,
    dummyDataSetList,
    createDataSet,
    setViewDataSet,
    addDataSet,
    removeDataSet,
  } = useDummyData();

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [targetingId, setTargetingId] = useState<string | null>(null);

  const setDataSet = (id?: string) => {
    if (!id) {
      const newDataSet = createDataSet();
      addDataSet(newDataSet);
      id = newDataSet.id;
    }
    setEditingDataSetId(id);
  };

  const handleClickAddEditDataSet = (id?: string) => () => {
    isEditing
      ? openDialog(() => setDataSet(id), "Do you want to switch datasets?")
      : setDataSet(id);
  };

  const handleClickDelete = (id: string) => () => {
    setTargetingId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteOk = () => {
    if (targetingId) {
      removeDataSet(targetingId);
    }
    handleDeleteDialogClose();
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setTargetingId(null);
  };

  const showDataSet =
    ({ id }: IDummyDataSet) =>
    () => {
      setViewDataSet(id);
    };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Title>Data Set List</Title>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Showing</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Count</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>
                <IconButton
                  aria-label="new data set"
                  onClick={handleClickAddEditDataSet()}
                  sx={{ backgroundColor: "#f9f9f9", mx: 1 }}
                >
                  <Add color="primary" />
                </IconButton>
                <label
                  color="inherit"
                  style={{
                    verticalAlign: "middle",
                    fontSize: "large",
                  }}
                >
                  New Data Set
                </label>
              </TableCell>
            </TableRow>
            {dummyDataSetList.map((dataSet, idx) => (
              <TableRow key={dataSet.id}>
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="showing"
                    color="primary"
                    onClick={showDataSet(dataSet)}
                  >
                    {dataSet.id === dummyDataSet?.id ? (
                      <RadioButtonChecked />
                    ) : (
                      <RadioButtonUnchecked />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  {dataSet.name || <em>No Name</em>}
                </TableCell>
                <TableCell align="center">
                  {dataSet.status === DATASET_STATUS.CREATING ? (
                    <LinearProgress />
                  ) : (
                    dataSet.records.length
                  )}
                </TableCell>
                <TableCell align="center">
                  {formatFromISO(dataSet.createdAt, DATE_FORMAT.TYPE2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={handleClickAddEditDataSet(dataSet.id)}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={handleClickDelete(dataSet.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDialog
        open={openDeleteDialog}
        message="Do you want to delete?"
        handleOk={handleDeleteOk}
        handleCancel={handleDeleteDialogClose}
      />
    </Paper>
  );
};

export default DataSetList;
