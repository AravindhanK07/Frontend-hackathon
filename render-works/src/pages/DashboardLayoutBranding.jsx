import * as React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BalanceIcon from "@mui/icons-material/AccountBalance";
import HelpIcon from "@mui/icons-material/HelpOutline";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Link, Outlet } from "react-router-dom";

const NAVIGATION = [
  {
    segment: "sales",
    title: "Sales",
    icon: <DashboardIcon />,
    path: "/sales",
  },
  {
    segment: "purchase",
    title: "Purchase",
    icon: <ShoppingCartIcon />,
    path: "/purchase",
  },
  {
    segment: "balance-sheet",
    title: "Balance Sheet",
    icon: <BalanceIcon />,
    path: "/balance-sheet",
  },
  {
    segment: "how-to-use",
    title: "How to Use",
    icon: <HelpIcon />,
    path: "/how-to-use",
  },
];

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

function DashboardLayoutBranding(props) {
  const { window } = props;

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION.map((nav) => ({
        ...nav,
        icon: <Link to={nav.path}>{nav.icon}</Link>,
        title: <Link to={nav.path}>{nav.title}</Link>,
      }))}
      branding={{
        logo: "",
        title: "",
        homeUrl: "/",
      }}
      theme={demoTheme}
      window={demoWindow}>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;
