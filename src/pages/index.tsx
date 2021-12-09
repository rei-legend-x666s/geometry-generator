import { Box, Grid } from "@mui/material";
import type { NextPage } from "next";
import CustomHead from "../components/Head";
import ColumnPropertiesForm from "../components/Home/ColumnPropertiesForm";
import DataSetList from "../components/Home/DataSetList";
import ColumnPropertyProvider from "../context/ColumnPropertyProvider";

const Home: NextPage = () => {
  return (
    <ColumnPropertyProvider>
      <CustomHead title="Home" />
      <Box width="100%">
        <Grid item xs={12} sx={{ p: 2 }}>
          <ColumnPropertiesForm />
        </Grid>
        <Grid item xs={12} sx={{ p: 2 }}>
          <DataSetList />
        </Grid>
      </Box>
    </ColumnPropertyProvider>
  );
};

export default Home;
