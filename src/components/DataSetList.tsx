import {
  Delete,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useDummyData } from "../context/DummyDataProvider";
import { IDummyDataSet } from "../types/general";
import ConfirmDialog from "./ConfirmDialog";
import Title from "./Title";

const DataSetList = () => {
  const { dummyDataSet, dummyDataSetList, setViewDataSet, removeDataSet } =
    useDummyData();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const [targetingId, setTargetingId] = useState<string | null>(null);

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
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                <TableCell align="center">{dataSet.records.length}</TableCell>
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
