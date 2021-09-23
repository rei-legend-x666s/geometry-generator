import type { NextPage } from "next";
import CustomHead from "../components/Head";
import { Box, Paper } from "@material-ui/core";

const Home: NextPage = () => {
  return (
    <div>
      <CustomHead title="Home" />
      <Box width="100%">
        <Paper elevation={3}>
          <div>
            <main>
              <h1>Input From</h1>
            </main>
          </div>
        </Paper>
        <Paper elevation={3}>
          <div>
            <main>
              <h1>Result View</h1>
            </main>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default Home;
