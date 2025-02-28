import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const FormModal = ({
  open,
  handleClose,
  formData,
  handleInputChange,
  handleSave,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{formData.id ? "Edit Entry" : "Add New Entry"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Region Name"
          name="region_name"
          fullWidth
          margin="normal"
          value={formData.region_name}
          onChange={handleInputChange}
        />
        <TextField
          label="Cluster Name"
          name="cluster_name"
          fullWidth
          margin="normal"
          value={formData.cluster_name}
          onChange={handleInputChange}
        />
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Code"
          name="code"
          fullWidth
          margin="normal"
          value={formData.code}
          onChange={handleInputChange}
        />
        <TextField
          label="Total No. of Distributors"
          name="total_no_of_distributor"
          fullWidth
          margin="normal"
          value={formData.total_no_of_distributor}
          onChange={handleInputChange}
        />
        <TextField
          label="Remarks"
          name="remarks"
          fullWidth
          margin="normal"
          value={formData.remarks}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
