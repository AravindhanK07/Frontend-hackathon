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
import SalesModel from "../Modals/SalesModel";

const StyledTableCell = styled(TableCell)({
  color: "red",
  fontWeight: "bold",
  textAlign: "center",
  fontFamily: "Roboto",
});

const SalesTable = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: "",
    invoice_no: "",
    amount: "",
    tax: "",
    total_amount: "",
    payment_method: "",
    status: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [createSale, setCreateSale] = useState(null); // New state to trigger sale creation

  // Fetch sales data
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/GetAllSales");
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

  useEffect(() => {
    if (createSale) {
      const handleCreateSale = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/sales/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer your-token",
            },
            body: JSON.stringify(createSale),
          });

          const result = await response.json();
          if (response.ok) {
            setAlertMessage(""); // Clear alert on successful save
            setModalOpen(false); // Close the modal
            fetchData(); // Re-fetch the sales data after creation
          } else {
            setAlertMessage(result.message || "Failed to create sale entry.");
          }
        } catch (error) {
          console.error("Error saving data:", error);
          setAlertMessage("Something went wrong. Please try again.");
        }
      };

      handleCreateSale();
      setCreateSale(null);
    }
  }, [createSale]);

  const handleAddNewEntry = () => {
    setFormData({
      customer_name: "",
      invoice_number: "",
      invoice_date: "",
      net_amount: "",
      tax: "",
      total_amount: "",
      payment_method: "",
      payment_status: "",
    });
    setAlertMessage("");
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (
      !formData.customer_name ||
      !formData.invoice_number ||
      !formData.invoice_date ||
      !formData.net_amount ||
      !formData.tax ||
      !formData.total_amount ||
      !formData.payment_method ||
      !formData.payment_status
    ) {
      setAlertMessage("All fields are required!");
      return;
    }

    // Trigger the new useEffect to create the sale by updating `createSale` state
    setCreateSale(formData);
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
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Invoice Number</StyledTableCell>
              <StyledTableCell>Customer ID</StyledTableCell>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell>Ordered Date</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
              <StyledTableCell>Payment Method</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.invoice_no}</TableCell>
                  <TableCell align="center">{row.customer_id}</TableCell>
                  <TableCell align="center">{row.product}</TableCell>
                  <TableCell align="center">{row.ordered_date}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{row.total_amount}</TableCell>
                  <TableCell align="center">{row.payment_method}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No sales data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <SalesModel
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default SalesTable;
