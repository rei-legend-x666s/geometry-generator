import { Typography } from "@mui/material";
import React from "react";

interface TitleProps {
  children?: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <Typography component="h2" variant="h5" color="primary" gutterBottom>
      {children}
    </Typography>
  );
};

export default Title;
