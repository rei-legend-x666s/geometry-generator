import { Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useDummyData } from "../../context/DummyDataProvider";
import Title from "../utils/Title";
import DataListCsvTextField from "./DataListCsvTextField";
import DataListTable from "./DataListTable";
import TabPanel from "./TabPanel";

const DataViewTable = () => {
  const { dummyDataSet } = useDummyData();
  const [tabIndex, setTabIndex] = useState("table");

  const handleChangeTabIndex = (event: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Title>Result View</Title>
      {dummyDataSet ? (
        <>
          <Tabs value={tabIndex} onChange={handleChangeTabIndex} sx={{ p: 1 }}>
            <Tab value="table" label="table" />
            <Tab value="csv" label="csv" />
          </Tabs>
          <TabPanel index="table" value={tabIndex}>
            <DataListTable dataSet={dummyDataSet} />
          </TabPanel>
          <TabPanel index="csv" value={tabIndex}>
            <DataListCsvTextField dataSet={dummyDataSet} />
          </TabPanel>
        </>
      ) : (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          No data selected.
        </Typography>
      )}
    </Paper>
  );
};

export default DataViewTable;
