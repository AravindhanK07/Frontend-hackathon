import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Snackbar,
  Typography,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import backgroundImage from "../assets/Login_page.png";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate the field on change
    validateField(name, value);
  };

  // Validate individual fields
  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          errorMessage = "please enter your email address.";
        break;
      case "password":
        if (value.length < 6) errorMessage = "Password enter your password.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
    return !errorMessage;
  };

  // Validate the entire form
  const validateForm = () => {
    return (
      Object.values(errors).every((x) => x === "") &&
      formData.email &&
      formData.password
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please fix all errors before submitting.",
        severity: "error",
      });
      return;
    }

    try {
      // Make API call to login
      const response = await axios.post(
        "http://localhost:8080/login",
        formData
      );

      if (response.status === 200) {
        // Store user data along with email in session storage
        sessionStorage.setItem(
          "user",
          JSON.stringify({ ...response.data, email: formData.email })
        );

        // Redirect to home page
        navigate("/");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Invalid email or password. Please try again.",
        severity: "error",
      });
    }
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div
      className="min-h-screen flex bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="grid grid-cols-2 w-full">
        <div className="p-8">
          <h4 className="text-4xl font-bold text-white">Hisab</h4>
        </div>

        {/* Second div: Login form */}
        <div className="flex justify-center items-center p-8">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                // helperText={errors.email}
                helperText={errors.email ? <strong>{errors.email}</strong> : ""}
                margin="normal"
              />

              {/* Password */}
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                // helperText={errors.password}
                helperText={
                  errors.password ? <strong>{errors.password}</strong> : ""
                }
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Login Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!validateForm()}
                sx={{ mt: 3 }}
              >
                Login
              </Button>

              {/* Register Link */}
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{" "}
                <Link href="/register" underline="hover">
                  Register
                </Link>
              </Typography>
            </form>
          </div>
        </div>
      </div>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </div>
  );
};

export default LoginPage;
