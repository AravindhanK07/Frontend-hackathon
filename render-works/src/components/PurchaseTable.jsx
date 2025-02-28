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
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "red",
  fontWeight: "bold",
  textAlign: "center",
  fontFamily: "sans-serif",
}));

const PurchaseTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
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
              <StyledTableCell>Vendor Name</StyledTableCell>
              <StyledTableCell>Purchase Number</StyledTableCell>
              <StyledTableCell>Purchase Date</StyledTableCell>
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
                <TableCell align="center">{row.vendor_name}</TableCell>
                <TableCell align="center">{row.purchase_number}</TableCell>
                <TableCell align="center">{row.purchase_date}</TableCell>
                <TableCell align="center">{row.net_amount}</TableCell>
                <TableCell align="center">{row.tax}</TableCell>
                <TableCell align="center">{row.total_amount}</TableCell>
                <TableCell align="center">{row.payment_methord}</TableCell>
                <TableCell align="center">{row.payment_status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PurchaseTable;
