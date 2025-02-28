// src/components/SalesTable.js
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "./Modals/SalesModel";

const StyledTableCell = styled(TableCell)({
  color: "red",
  fontWeight: "bold",
  textAlign: "center",
  fontFamily: "sans-serif",
});

const SalesTable = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    region_name: "",
    cluster_name: "",
    name: "",
    code: "",
    remarks: "",
    total_no_of_distributor: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/sales");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddNewEntry = () => {
    setFormData({
      region_name: "",
      cluster_name: "",
      name: "",
      code: "",
      remarks: "",
      total_no_of_distributor: "",
    });
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setData([...data, { ...formData, id: data.length + 1 }]);
    setModalOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sales
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddNewEntry}>
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Invoice Number</StyledTableCell>
              <StyledTableCell>Invoice Date</StyledTableCell>
              <StyledTableCell>Net Amount</StyledTableCell>
              <StyledTableCell>Tax</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
              <StyledTableCell>Payment Method</StyledTableCell>
              <StyledTableCell>Payment Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.customer_name}</TableCell>
                <TableCell align="center">{row.invoice_number}</TableCell>
                <TableCell align="center">{row.invoice_date}</TableCell>
                <TableCell align="center">{row.net_amount}</TableCell>
                <TableCell align="center">{row.tax}</TableCell>
                <TableCell align="center">{row.total_amount}</TableCell>
                <TableCell align="center">{row.payment_method}</TableCell>
                <TableCell align="center">{row.payment_status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FormModal
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
