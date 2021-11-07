import { Box, Grid } from "@mui/material";
import type { NextPage } from "next";
import CustomHead from "../components/Head";
import MapPanel from "../components/MapPanel";

const Gis: NextPage = () => {
  return (
    <>
      <CustomHead title="GIS" />
      <Box width="100%">
        <Grid item xs={12} sx={{ p: 2 }}>
          <MapPanel />
        </Grid>
      </Box>
    </>
  );
};

export default Gis;
