import React, { useState } from "react";
import { Box } from "@mui/material";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Alert,
} from "@mui/material";

const SalesModel = ({
  open,
  handleClose,
  formData,
  handleInputChange,
  handleSave,
}) => {
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");

  const handleCloseDialog = () => {
    setErrors({});
    setAlertMessage("");
    handleClose();
  };

  const validateFields = () => {
    let newErrors = {};

    if (!formData.customer_name.trim())
      newErrors.customer_name = "Customer Name is required";
    if (!formData.invoice_number.trim())
      newErrors.invoice_number = "Invoice Number is required";
    if (!formData.invoice_date.trim())
      newErrors.invoice_date = "Invoice Date is required";
    if (!formData.net_amount.trim() || isNaN(formData.net_amount))
      newErrors.net_amount = "Enter a valid Net Amount";
    if (!formData.tax.trim() || isNaN(formData.tax))
      newErrors.tax = "Enter a valid Tax Amount";
    if (!formData.total_amount.trim() || isNaN(formData.total_amount))
      newErrors.total_amount = "Enter a valid Total Amount";
    if (!formData.payment_method.trim())
      newErrors.payment_method = "Payment Method is required";
    if (!formData.payment_status.trim())
      newErrors.payment_status = "Payment Status is required";

    setErrors(newErrors);
    setAlertMessage();
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      handleSave();
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          textAlign: "center",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          color: "#1976d2",
        }}>
        <DialogTitle
          sx={{
            textAlign: formData.id ? "center" : "left", // Align left for "Add Sales"
            fontFamily: "sans-serif",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: formData.id ? "transparent" : "#1976d2", // Blue only for "Add Sales"
            padding: "12px",
            pl: 3, // Add left padding for better spacing
          }}>
          {formData.id ? "Edit Entry" : "Add Sales"}
        </DialogTitle>
      </DialogTitle>
      <DialogContent>
        {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
        {[
          { label: "Customer Name", name: "customer_name" },
          { label: "Invoice Number", name: "invoice_number" },
          { label: "Invoice Date", name: "invoice_date", type: "date" },
          { label: "Net Amount", name: "net_amount" },
          { label: "Tax", name: "tax" },
          { label: "Total Amount", name: "total_amount" },
          { label: "Payment Method", name: "payment_method" },
          { label: "Payment Status", name: "payment_status" },
        ].map(({ label, name, type = "text" }) => (
          <TextField
            key={name}
            label={label}
            name={name}
            fullWidth
            margin="normal"
            type={type}
            value={formData[name]}
            onChange={handleInputChange}
            error={!!errors[name]}
            helperText={errors[name]}
            InputLabelProps={type === "date" ? { shrink: true } : {}}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default SalesModel;
