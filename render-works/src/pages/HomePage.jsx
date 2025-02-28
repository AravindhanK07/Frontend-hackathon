import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import "../style.css";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  colors,
} from "@mui/material";

// Icons for the sidebar
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // $ icon for Sales
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Icon for Purchase
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Icon for Balance Sheet
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Icon for How to Use

// Navigation items for the sidebar
const NAVIGATION = [
  {
    segment: "sales",
    title: "Sales",
    icon: <AttachMoneyIcon />, // $ icon for Sales
  },
  {
    segment: "purchase",
    title: "Purchase",
    icon: <ShoppingCartIcon />, // Shopping cart icon for Purchase
  },
  {
    segment: "balance-sheet",
    title: "Balance Sheet",
    icon: <AccountBalanceIcon />, // Account balance icon for Balance Sheet
  },
  {
    segment: "how-to-use",
    title: "How to Use",
    icon: <HelpOutlineIcon />, // Help outline icon for How to Use
  },
];

// Demo theme for the dashboard
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Sample data for tables
const sampleData = {
  sales: [
    { id: 1, product: "Product A", quantity: 10, revenue: 1000 },
    { id: 2, product: "Product B", quantity: 5, revenue: 500 },
    { id: 3, product: "Product C", quantity: 8, revenue: 800 },
  ],
  purchase: [
    { id: 1, product: "Raw Material X", quantity: 20, cost: 2000 },
    { id: 2, product: "Raw Material Y", quantity: 15, cost: 1500 },
    { id: 3, product: "Raw Material Z", quantity: 10, cost: 1000 },
  ],
  "balance-sheet": [
    { id: 1, account: "Assets", amount: 50000 },
    { id: 2, account: "Liabilities", amount: 30000 },
    { id: 3, account: "Equity", amount: 20000 },
  ],
  "how-to-use": [
    { id: 1, step: "Step 1", description: "Sign up for an account." },
    { id: 2, step: "Step 2", description: "Add your data." },
    { id: 3, step: "Step 3", description: "Generate reports." },
  ],
};

// Reusable MUI Table component
function SampleTable({ data, columns }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field} align="center">
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.field} align="center">
                  {row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SampleTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

// Content for the dashboard pages
function DemoPageContent({ pathname }) {
  let data = [];
  let columns = [];

  switch (pathname) {
    case "/sales":
      data = sampleData.sales;
      columns = [
        { field: "product", headerName: "Product", colors: "red" },
        { field: "quantity", headerName: "Quantity", colors: "red" },
        { field: "revenue", headerName: "Revenue", colors: "red" },
      ];
      break;
    case "/purchase":
      data = sampleData.purchase;
      columns = [
        { field: "product", headerName: "Product" },
        { field: "quantity", headerName: "Quantity" },
        { field: "cost", headerName: "Cost" },
      ];
      break;
    case "/balance-sheet":
      data = sampleData["balance-sheet"];
      columns = [
        { field: "account", headerName: "Account" },
        { field: "amount", headerName: "Amount" },
      ];
      break;
    case "/how-to-use":
      data = sampleData["how-to-use"];
      columns = [
        { field: "step", headerName: "Step" },
        { field: "description", headerName: "Description" },
      ];
      break;
    default:
      data = [];
      columns = [];
  }

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}>
      <Typography variant="h4" gutterBottom>
        {NAVIGATION.find((nav) => nav.segment === pathname.slice(1))?.title}
      </Typography>
      <SampleTable data={data} columns={columns} />
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// Dashboard layout with custom branding
function DashboardLayoutBranding(props) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: "",
        title: "",
        homeUrl: "/toolpad/core/introduction",
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}>
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

const HomePage = () => {
  return <DashboardLayoutBranding />;
};

export default HomePage;
