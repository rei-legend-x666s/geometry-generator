import { Box, Collapse, Grid } from "@mui/material";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ColumnPropertiesForm from "../components/Home/ColumnPropertiesForm";
import DataSetList from "../components/Home/DataSetList";
import CustomHead from "../components/utils/Head";
import ColumnPropertyProvider from "../context/ColumnPropertyProvider";
import { useDummyData } from "../context/DummyDataProvider";
import { useGlobalData } from "../context/GlobalDataProvider";
import { IDummyDataSet } from "../types/general";

const Home: NextPage = () => {
  const { isEditing, editingDataSetId, setEditingDataSetId } = useGlobalData();
  const { dummyDataSetList } = useDummyData();
  const [editingDataSet, setEditingDataSet] = useState<IDummyDataSet>();

  useEffect(() => {
    setEditingDataSet(dummyDataSetList.find((d) => d.id === editingDataSetId));
  }, [editingDataSetId]);

  const closeColumnPropertiesForm = () => {
    setEditingDataSetId("");
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
                editingDataSet={editingDataSet}
              />
            )}
          </Grid>
        </Collapse>
        <Grid item xs={12} sx={{ p: 2 }}>
          <DataSetList />
        </Grid>
      </Box>
    </ColumnPropertyProvider>
  );
};

export default Home;
