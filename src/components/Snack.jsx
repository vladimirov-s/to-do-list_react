import { Alert, Snackbar } from "@mui/material";

const Snack = ({ open, string, type, handleClose }) => {
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}>
      <Alert severity={type}>{string}</Alert>
    </Snackbar>
  );
};

export default Snack;
