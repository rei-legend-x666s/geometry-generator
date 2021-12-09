import { Box, Grid } from "@mui/material";
import { NextPage } from "next";
import CustomHead from "../components/Head";
import DataViewTable from "../components/Result/DataViewTable";

const Result: NextPage = () => {
  return (
    <>
      <CustomHead title="Result" />
      <Box width="100%">
        <Grid item xs={12} sx={{ p: 2 }}>
          <DataViewTable />
        </Grid>
      </Box>
    </>
  );
};

export default Result;
