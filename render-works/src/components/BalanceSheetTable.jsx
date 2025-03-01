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
  Tabs,
  Tab,
  Button,
  Modal,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const BalanceSheetTable = () => {
  const [fixedExpenses, setFixedExpenses] = useState([]); // State for fixed expenses
  const [variableExpenses, setVariableExpenses] = useState([]); // State for variable expenses
  const [data, setData] = useState([]); // State for currently displayed data
  const [tabValue, setTabValue] = useState(0); // 0 for fixed, 1 for variable
  const [openModal, setOpenModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    expense_category: "",
    amount: "",
    due_date: "",
    status: "",
    payment_method: "",
    entered_by: "Admin",
    type: "",
  });

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/account_data"
      );
      console.log(response.data);

      // Filter data into fixed and variable expenses
      const fixedData = response.data.data.filter(
        (item) => item.type === "fixed"
      );
      const variableData = response.data.data.filter(
        (item) => item.type === "variable"
      );

      setFixedExpenses(fixedData);
      setVariableExpenses(variableData);

      // Set initial data based on the selected tab
      setData(tabValue === 0 ? fixedData : variableData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Update displayed data when tab changes
  useEffect(() => {
    setData(tabValue === 0 ? fixedExpenses : variableExpenses);
  }, [tabValue, fixedExpenses, variableExpenses]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewExpense({
      ...newExpense,
      [name]: name === "amount" ? Number(value) : value, // Convert amount to a number
    });
  };

  const handleAddExpense = async () => {
    try {
      // Simulate API call to add new expense
      const jwt_code = sessionStorage.getItem("user");
      const response = await fetch(
        "http://localhost:8080/api/balance_sheet/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt_code.token}`, // Add JWT token here
          },
          body: JSON.stringify(newExpense),
        }
      );

      if (response.ok) {
        // Refresh data after successful addition
        const newExpenseWithId = {
          ...newExpense,
          id: data.length + 1, // Generate a new ID
        };

        // Update the appropriate state based on the type
        if (newExpense.type === "fixed") {
          setFixedExpenses((prev) => [...prev, newExpenseWithId]);
        } else {
          setVariableExpenses((prev) => [...prev, newExpenseWithId]);
        }
        fetchData();
        handleCloseModal();
      } else {
        console.error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <Box sx={{ padding: "15px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <Typography variant="h4" sx={{ padding: 0, margin: 0 }} gutterBottom>
          Account Management
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: "50%",
            minWidth: "56px",
            minHeight: "56px",
            backgroundColor: "#538cf0",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleOpenModal}
        >
          <AddIcon />
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "15px",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              color: "black",
              "&.Mui-selected": {
                backgroundColor: "#538cf0",
                color: "white",
              },
            },
          }}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
        >
          <Tab label="Fixed Expenses" />
          <Tab label="Variable Expenses" />
        </Tabs>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">S.no</TableCell>
              <TableCell align="center">Expense Category</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Due Date</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.expense_category}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.due_date}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={openModal}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") handleCloseModal();
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" gutterBottom>
            Add New Expense
          </Typography>
          <TextField
            fullWidth
            label="Expense Category"
            name="expense_category"
            value={newExpense.expense_category}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={newExpense.amount}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Due Date"
            name="due_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newExpense.due_date}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Status"
            name="status"
            value={newExpense.status}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Payment method"
            name="payment_method"
            select
            value={newExpense.payment_method}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Card">Card</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Type"
            name="type"
            select
            value={newExpense.type}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="fixed">Fixed</MenuItem>
            <MenuItem value="variable">Variable</MenuItem>
          </TextField>

          {/* Centered Add Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleAddExpense}
              sx={{ backgroundColor: "red", color: "white" }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BalanceSheetTable;
