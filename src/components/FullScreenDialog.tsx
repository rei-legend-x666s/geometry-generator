import { Close } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { ReactNode, ReactElement } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenDialogProps {
  open: boolean;
  children: ReactNode;
  title: string;
  handleOk: () => void;
  handleClose: () => void;
}

const FullScreenDialog = ({
  open,
  children,
  title,
  handleOk,
  handleClose,
}: FullScreenDialogProps) => {
  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          <Button color="inherit" onClick={handleOk}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
};

export default FullScreenDialog;
