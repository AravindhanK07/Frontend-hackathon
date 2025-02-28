import * as React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Link, Outlet } from "react-router-dom";

// Navigation items for the sidebar
const NAVIGATION = [
  {
    segment: "sales",
    title: "Sales",
    icon: <DashboardIcon />,
    path: "/sales", // Updated path
  },
  {
    segment: "purchase",
    title: "Purchase",
    icon: <ShoppingCartIcon />,
    path: "/purchase", // Updated path
  },
  {
    segment: "balance-sheet",
    title: "Balance Sheet",
    icon: <ShoppingCartIcon />,
    path: "/balance-sheet", // Updated path
  },
  {
    segment: "how-to-use",
    title: "How to Use",
    icon: <ShoppingCartIcon />,
    path: "/how-to-use", // Updated path
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

// Dashboard layout with custom branding
function DashboardLayoutBranding(props) {
  const { window } = props;

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION.map((nav) => ({
        ...nav,
        // Use Link to handle navigation
        icon: <Link to={nav.path}>{nav.icon}</Link>,
        title: <Link to={nav.path}>{nav.title}</Link>,
      }))}
      branding={{
        logo: "",
        title: "",
        homeUrl: "/", // Updated home URL
      }}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <Outlet /> {/* Render nested routes here */}
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutBranding;
