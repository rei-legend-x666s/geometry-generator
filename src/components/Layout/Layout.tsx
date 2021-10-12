import { Box, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopAppBar from "./TopAppBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <TopAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
