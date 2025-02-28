import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  styled,
  Button,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SalesModel from "../Modals/SalesModel";
import { IconButton } from "@mui/material";

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
    order_date: "",
    net_amount: "",
    amount: "",
    total_amount: "",
    payment_method: "",
    status: "",
  });
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/GetAllSales");
        const result = await response.json();

        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error("Unexpected API response:", result);
          setData([]); // Set an empty array to avoid map() errors
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
        setData([]); // Ensure data is always an array
      }
    };

    fetchData();
  }, []);

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

    setData([...data, { ...formData, id: data.length + 1 }]);
    setModalOpen(false);
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
          }}>
          <AddIcon />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Customer ID</StyledTableCell>
              <StyledTableCell>Invoice Number</StyledTableCell>
              <StyledTableCell>Order Date</StyledTableCell>
              <StyledTableCell>Net Amount</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
              <StyledTableCell>Payment Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.customer_id}</TableCell>
                  <TableCell align="center">{row.invoice_no}</TableCell>
                  <TableCell align="center">{row.order_date}</TableCell>
                  <TableCell align="center">{row.net_amount}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{row.total_amount}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
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
