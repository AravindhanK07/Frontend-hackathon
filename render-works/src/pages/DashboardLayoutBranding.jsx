import * as React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BalanceIcon from "@mui/icons-material/AccountBalance";
import HelpIcon from "@mui/icons-material/HelpOutline";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Link, Outlet, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

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
  const navigate = useNavigate();

  const demoWindow = window !== undefined ? window() : undefined;

  function ToolbarActionsSearch() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    // Mock session state
    const [session, setSession] = React.useState({
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
    });

    const userInitial = session?.user?.name ? session.user.name.charAt(0) : "";

    // Handle dropdown menu open
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    // Handle dropdown menu close
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    // Handle logout
    const handleLogout = async () => {
      navigate("/login");
      try {
        // Make API call to logout
        const response = await fetch("https://api.example.com/logout", {
          method: "POST",
          credentials: "include", // Include cookies if needed
        });

        if (response.ok) {
          // Clear session
          setSession(null);
          // Redirect to login page
          navigate("/login");
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      } finally {
        handleMenuClose();
      }
    };

    return (
      <div>
        {/* Avatar and dropdown menu */}
        <IconButton
          aria-label="account menu"
          aria-controls="account-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          sx={{ p: 0 }}
        >
          <Avatar
            alt={session?.user?.name}
            sx={{
              width: 40,
              height: 40,
              bgcolor: "white",
              color: "#538cf0",
              fontWeight: "bold",
            }}
          >
            {userInitial}
          </Avatar>
        </IconButton>

        {/* Dropdown menu - properly aligned to the right */}
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            sx: {
              mt: 1.5, // Margin from the avatar
              minWidth: 180, // Set a proper width
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }

  return (
    <AppProvider
      // session={session}
      // authentication={authentication}
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
      window={demoWindow}
    >
      <DashboardLayout
        sx={{
          // Style for the header
          "& .MuiAppBar-root": {
            backgroundColor: "#538cf0", // Blue color for the header
            color: "white", // Text color for the header
          },
          // Style for the sidebar
          "& .MuiDrawer-paper": {
            backgroundColor: "#f5f5f5", // Light gray color for the sidebar
          },
        }}
        slots={{
          toolbarActions: ToolbarActionsSearch,
        }}
      >
        <Outlet /> {/* Render nested routes here */}
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;
