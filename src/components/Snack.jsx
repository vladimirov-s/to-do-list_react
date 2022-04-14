import { Alert, Snackbar } from "@mui/material";

const Snack = ({ open, string, type }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000}>
      <Alert severity={type}>{string}</Alert>
    </Snackbar>
  );
};

export default Snack;
