import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import "../style.css";

const SalesModel = ({
  open,
  handleClose,
  formData,
  handleInputChange,
  handleSave,
}) => {
  const [errors, setErrors] = useState({});

  const handleCloseDialog = () => {
    setErrors({});
    handleClose();
  };

  const validateFields = () => {
    let newErrors = {};

    if (!formData.customer_id?.trim())
      newErrors.customer_id = "Customer ID is required";
    if (!formData.invoice_no?.trim())
      newErrors.invoice_no = "Invoice Number is required";
    if (!formData.amount?.trim() || isNaN(formData.amount))
      newErrors.amount = "Enter a valid Amount";
    if (!formData.tax?.trim() || isNaN(formData.tax))
      newErrors.tax = "Enter a valid Tax Amount";
    if (!formData.total_amount?.trim() || isNaN(formData.total_amount))
      newErrors.total_amount = "Enter a valid Total Amount";
    if (!formData.payment_method?.trim())
      newErrors.payment_method = "Payment Method is required";
    if (!formData.status?.trim()) newErrors.status = "Status is required";
    if (!formData.product?.trim()) newErrors.product = "Product is required";
    if (!formData.sku?.trim()) newErrors.sku = "SKU is required";
    if (!formData.ordered_date?.trim())
      newErrors.ordered_date = "Ordered Date is required";
    if (!formData.entered_by?.trim())
      newErrors.entered_by = "Entered By is required";

    setErrors(newErrors);
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
        }}
      >
        Add Sales
      </DialogTitle>
      <DialogContent>
        {[
          { label: "Customer ID", name: "customer_id" },
          { label: "Invoice Number", name: "invoice_no" },
          { label: "Amount", name: "amount" },
          { label: "Tax", name: "tax" },
          { label: "Total Amount", name: "total_amount" },
          { label: "Payment Method", name: "payment_method" },
          { label: "Status", name: "status" },
          { label: "Product", name: "product" },
          { label: "SKU", name: "sku" },
          { label: "Ordered Date", name: "ordered_date", type: "date" },
          { label: "Entered By", name: "entered_by" },
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
