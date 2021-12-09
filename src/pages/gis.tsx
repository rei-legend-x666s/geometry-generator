import { Box, Grid } from "@mui/material";
import type { NextPage } from "next";
import MapPanel from "../components/Gis/MapPanel";
import CustomHead from "../components/Head";

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
