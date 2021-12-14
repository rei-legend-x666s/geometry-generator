import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DialogProps {
  open: boolean;
  title?: string;
  message: string;
  handleClose?: () => void;
  handleOk: () => void;
  handleCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  message,
  handleClose,
  handleOk,
  handleCancel,
}: DialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose ? handleClose : () => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title ? title : "Confirm"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
