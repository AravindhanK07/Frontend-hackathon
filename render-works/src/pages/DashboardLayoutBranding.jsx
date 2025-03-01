import * as React from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  CssBaseline,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BalanceIcon from "@mui/icons-material/AccountBalance";
import HelpIcon from "@mui/icons-material/HelpOutline";
import { Link, Outlet, useNavigate } from "react-router-dom";

// Navigation items for the sidebar
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
    title: "Account Management",
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

// Custom theme for the dashboard
const demoTheme = createTheme({
  palette: {
    primary: {
      main: "#538cf0", // Blue color for the header
    },
    background: {
      default: "#f5f5f5", // Light gray background for the sidebar
    },
  },
});

function DashboardLayoutBranding(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Mock session state
  // const [session, setSession] = React.useState({
  //   user: {
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //   },
  // });

  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userEmail = user?.email || "";
  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "";

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
    sessionStorage.clear();
    handleMenuClose();
  };

  // Drawer width
  const drawerWidth = 240;

  // Drawer content
  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Hisab
        </Typography>
      </Toolbar>
      <List>
        {NAVIGATION.map((nav) => (
          <ListItem
            button
            key={nav.segment}
            component={Link}
            to={nav.path}
            sx={{
              "&:hover": {
                backgroundColor: "#e0e0e0", // Light gray hover effect
              },
            }}
          >
            <ListItemIcon>{nav.icon}</ListItemIcon>
            <ListItemText primary={nav.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={demoTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Header */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1, // Ensures AppBar is above the Drawer
          }}
        >
          <Toolbar>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Hisab
            </Typography>
            <IconButton
              aria-label="account menu"
              aria-controls="account-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              sx={{ p: 0 }}
            >
              <Avatar
                alt={""}
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
                  mt: 1.5,
                  minWidth: 180,
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>{userEmail}</MenuItem>

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          container={container}
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% - ${drawerWidth}px)`,
          }}
        >
          <Toolbar /> {/* Offset content below the header */}
          <Outlet /> {/* Render nested routes here */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;
