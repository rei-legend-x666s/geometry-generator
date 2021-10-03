import { Box, Grid, Paper } from "@mui/material";
import type { NextPage } from "next";
import ColumnPropertiesForm from "../components/ColumnPropertiesForm";
import CustomHead from "../components/Head";
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
          <Paper elevation={3}>
            <div>
              <main>
                <h1>Result View</h1>
              </main>
            </div>
          </Paper>
        </Grid>
      </Box>
    </ColumnPropertyProvider>
  );
};

export default Home;
