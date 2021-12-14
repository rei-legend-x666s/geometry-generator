import { Box, Grid } from "@mui/material";
import { NextPage } from "next";
import DataViewTable from "../components/Result/DataViewTable";
import CustomHead from "../components/utils/Head";

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
