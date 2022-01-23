import { Box, Collapse, Grid } from "@mui/material";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ColumnPropertiesForm from "../components/Home/ColumnPropertiesForm";
import DataSetList from "../components/Home/DataSetList";
import ConfirmDialog from "../components/utils/ConfirmDialog";
import CustomHead from "../components/utils/Head";
import ColumnPropertyProvider from "../context/ColumnPropertyProvider";
import { useDummyData } from "../context/DummyDataProvider";
import { useGlobalData } from "../context/GlobalDataProvider";
import { IDummyDataSet } from "../types/general";

const Home: NextPage = () => {
  const { isEditing, editingDataSetId, setEditingDataSetId } = useGlobalData();
  const { dummyDataSetList } = useDummyData();
  const [editingDataSet, setEditingDataSet] = useState<IDummyDataSet>();
  const [showDialog, setShowDialog] = useState(false);
  const [okAction, setOkAction] = useState<() => () => void>(() => () => {});
  const [dialogMessage, setDialogMessage] = useState<string>("");

  useEffect(() => {
    setEditingDataSet(dummyDataSetList.find((d) => d.id === editingDataSetId));
  }, [editingDataSetId]);

  const closeColumnPropertiesForm = () => {
    setEditingDataSetId("");
  };

  const openDialog = (handleClickOk: () => void, message: string) => {
    setDialogMessage(message);
    setOkAction(() => () => {
      handleClickOk();
      setShowDialog(false);
    });
    setShowDialog(true);
  };

  return (
    <ColumnPropertyProvider>
      <CustomHead title="Home" />
      <Box width="100%">
        <Collapse in={isEditing}>
          <Grid item xs={12} sx={{ p: 2 }}>
            {editingDataSet && (
              <ColumnPropertiesForm
                closeSelf={closeColumnPropertiesForm}
                openDialog={openDialog}
                editingDataSet={editingDataSet}
              />
            )}
          </Grid>
        </Collapse>
        <Grid item xs={12} sx={{ p: 2 }}>
          <DataSetList openDialog={openDialog} />
        </Grid>
      </Box>
      <ConfirmDialog
        open={showDialog}
        title="Begin edited"
        message={dialogMessage}
        handleOk={okAction}
        handleCancel={() => setShowDialog(false)}
      />
    </ColumnPropertyProvider>
  );
};

export default Home;
