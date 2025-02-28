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
} from "@mui/material";

const PurchaseTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/purchase");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching purchase data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Purchase
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Purchase ID</TableCell>
              <TableCell align="center">Vendor ID</TableCell>
              <TableCell align="center">Invoice No</TableCell>
              <TableCell align="center">Purchase Date</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Tax</TableCell>
              <TableCell align="center">Total Amount</TableCell>
              <TableCell align="center">Payment Methord</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.purchase_id}</TableCell>
                <TableCell align="center">{row.vendor_id}</TableCell>
                <TableCell align="center">{row.invoice_no}</TableCell>
                <TableCell align="center">{row.purchase_date}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.tax}</TableCell>
                <TableCell align="center">{row.total_amount}</TableCell>
                <TableCell align="center">{row.payment_methord}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PurchaseTable;
