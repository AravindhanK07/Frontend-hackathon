import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  styled,
  IconButton,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PurchaseModel from "../Modals/purchaseModel";

const StyledTableCell = styled(TableCell)({
  color: "red",
  fontWeight: "bold",
  textAlign: "center",
  fontFamily: "Roboto",
});

const PurchaseTable = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    purchase_id: "",
    vendor_id: "",
    invoice_no: "",
    purchase_date: "",
    product_name: "",
    sku_code: "",
    amount: "",
    tax: "",
    total_amount: "",
    payment_method: "",
    status: "",
    entered_by: "",
  });
  const [alertMessage, setAlertMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/GetAllPurchases");
      const result = await response.json();
      if (result) {
        setData(result.data);
      } else {
        console.error("Unexpected API response:", result);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddNewEntry = () => {
    setFormData({
      purchase_id: "",
      vendor_id: "",
      invoice_no: "",
      purchase_date: "",
      product_name: "",
      sku_code: "",
      amount: "",
      tax: "",
      total_amount: "",
      payment_method: "",
      status: "",
      entered_by: "",
    });
    setAlertMessage("");
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Validate required fields
    if (
      !formData.vendor_id ||
      !formData.invoice_no ||
      !formData.purchase_date ||
      !formData.product_name ||
      !formData.sku_code ||
      !formData.amount ||
      !formData.tax ||
      !formData.total_amount ||
      !formData.payment_method ||
      !formData.status ||
      !formData.entered_by
    ) {
      setAlertMessage("All fields are required!");
      return;
    }

    try {
      // Send POST request to the API
      const response = await fetch("http://localhost:8080/api/CreatePurchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Purchase created successfully:", result);
        setModalOpen(false);
        fetchData(); // Refresh the table data
      } else {
        console.error("Failed to create purchase:", response.statusText);
        setAlertMessage("Failed to create purchase. Please try again.");
      }
    } catch (error) {
      console.error("Error creating purchase:", error);
      setAlertMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Box>
      {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <IconButton
          color="primary"
          onClick={handleAddNewEntry}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            width: 48,
            height: 48,
            paddingLeft: "10px",
            padding: "10px",
            marginRight: "10px",
            marginTop: "10px",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Purchase ID</StyledTableCell>
              <StyledTableCell>Vendor ID</StyledTableCell>
              <StyledTableCell>Invoice No</StyledTableCell>
              <StyledTableCell>Purchase Date</StyledTableCell>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>SKU Code</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Tax</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
              <StyledTableCell>Payment Method</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Entered By</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.purchase_id}</TableCell>
                  <TableCell align="center">{row.vendor_id}</TableCell>
                  <TableCell align="center">{row.invoice_no}</TableCell>
                  <TableCell align="center">{row.purchase_date}</TableCell>
                  <TableCell align="center">{row.product_name}</TableCell>
                  <TableCell align="center">{row.sku_code}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{row.tax}</TableCell>
                  <TableCell align="center">{row.total_amount}</TableCell>
                  <TableCell align="center">{row.payment_method}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.entered_by}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No Purchase data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <PurchaseModel
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default PurchaseTable;
