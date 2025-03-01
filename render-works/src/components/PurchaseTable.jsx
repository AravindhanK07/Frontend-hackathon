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
import PurchaseModel from "../Modals/purchaseModel";
import { IconButton } from "@mui/material";

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
    purchase_date: "",
    amount: "",
    tax: "",
    payment_method: "",
    status: "",
  });
  const [alertMessage, setAlertMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8082/api/GetAllPurchases");
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
      vendor_name: "",
      purchase_number: "",
      purchase_date: "",
      net_amount: "",
      tax: "",
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
      !formData.vendor_name ||
      !formData.purchase_number ||
      !formData.purchase_date ||
      !formData.net_amount ||
      !formData.tax ||
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
              <StyledTableCell>Purchase ID</StyledTableCell>
              <StyledTableCell>Vendor ID</StyledTableCell>
              <StyledTableCell>Purchase Date</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Tax</StyledTableCell>
              <StyledTableCell>Payment Method</StyledTableCell>
              <StyledTableCell>Payment Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.purchase_id}</TableCell>
                  <TableCell align="center">{row.vendor_id}</TableCell>
                  <TableCell align="center">{row.purchase_date}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{row.tax}</TableCell>
                  <TableCell align="center">{row.payment_method}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
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
