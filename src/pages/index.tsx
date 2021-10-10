import { Box, Grid } from "@mui/material";
import type { NextPage } from "next";
import ColumnPropertiesForm from "../components/ColumnPropertiesForm";
import DataViewTable from "../components/DataViewTable";
import CustomHead from "../components/Head";
import ColumnPropertyProvider from "../context/ColumnPropertyProvider";
import DummyDataProvider from "../context/DummyDataProvider";

const Home: NextPage = () => {
  return (
    <ColumnPropertyProvider>
      <DummyDataProvider>
        <CustomHead title="Home" />
        <Box width="100%">
          <Grid item xs={12} sx={{ p: 2 }}>
            <ColumnPropertiesForm />
          </Grid>
          <Grid item xs={12} sx={{ p: 2 }}>
            <DataViewTable />
          </Grid>
        </Box>
      </DummyDataProvider>
    </ColumnPropertyProvider>
  );
};

export default Home;
