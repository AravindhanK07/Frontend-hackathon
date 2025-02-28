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
  styled, // Import the styled utility
} from "@mui/material";

// Define styled components for the table header cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "red", // Font color
  fontWeight: "bold", // Bold text
  textAlign: "center",
  fontFamily: "sans-serif", // Center align text
}));

const SalesTable = () => {
  const [data, setData] = useState([]);

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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sales
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Invoice No</StyledTableCell>
              <StyledTableCell>Customer ID</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Tax</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Revenue</StyledTableCell>
              <StyledTableCell>Sold Date</StyledTableCell>
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
