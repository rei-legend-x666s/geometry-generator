import { Box, Collapse, Grid } from "@mui/material";
import type { NextPage } from "next";
import React, { useCallback, useState } from "react";
import ColumnPropertiesForm from "../components/Home/ColumnPropertiesForm";
import DataSetList from "../components/Home/DataSetList";
import CustomHead from "../components/utils/Head";
import ColumnPropertyProvider from "../context/ColumnPropertyProvider";
import { useDummyData } from "../context/DummyDataProvider";

const Home: NextPage = () => {
  const { dummyDataSetList } = useDummyData();
  const [showInputColPropsForm, setShowInputColPropsForm] = useState(false);
  const [editingDataSetId, setEditingDataSetId] = useState("");

  const dataSet = useCallback(() => {
    return dummyDataSetList.find(({ id }) => id === editingDataSetId);
  }, [editingDataSetId]);

  return (
    <ColumnPropertyProvider>
      <CustomHead title="Home" />
      <Box width="100%">
        <Collapse in={showInputColPropsForm}>
          <Grid item xs={12} sx={{ p: 2 }}>
            {dataSet() && (
              <ColumnPropertiesForm
                closeSelf={() => setShowInputColPropsForm(false)}
                editingDataSet={dataSet()!}
              />
            )}
          </Grid>
        </Collapse>
        <Grid item xs={12} sx={{ p: 2 }}>
          <DataSetList
            showColPropFormPanel={() => setShowInputColPropsForm(true)}
            setEditingId={(id) => setEditingDataSetId(id)}
          />
        </Grid>
      </Box>
    </ColumnPropertyProvider>
  );
};

export default Home;
