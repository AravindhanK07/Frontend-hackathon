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

const SalesTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    console.log("ST");
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sales
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Invoice No</TableCell>
              <TableCell align="center">Customer ID</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Tax</TableCell>
              <TableCell align="center">Total Amount</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Revenue</TableCell>
              <TableCell align="center">Sold Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.invoice_no}</TableCell>
                <TableCell align="center">{row.customer_id}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.tax}</TableCell>
                <TableCell align="center">{row.total_amount}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.revenue}</TableCell>
                <TableCell align="center">{row.sold_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesTable;
