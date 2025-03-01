import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Typography,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import eye icons
import backgroundImage from "../assets/Login_page.png";

const RegisterPage = () => {
  const navigate = useNavigate();
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    gender: "",
    pinCode: "",
    dateOfBirth: "",
    city: "",
    phone: "",
    state: "",
    status: "A", // Default
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State for API response feedback
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
      case "name":
        if (!value.trim()) errorMessage = "Name is required.";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          errorMessage = "Invalid email.";
        break;
      case "address":
        if (!value.trim()) errorMessage = "Address is required.";
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) errorMessage = "Phone must be 10 digits.";
        break;
      case "gender":
        if (!value) errorMessage = "Gender is required.";
        break;
      case "dateOfBirth":
        if (!value) errorMessage = "Date of Birth is required.";
        break;
      case "city":
        if (!value.trim()) errorMessage = "City is required.";
        break;
      case "state":
        if (!value.trim()) errorMessage = "State is required.";
        break;
      case "pinCode":
        if (!/^\d{6}$/.test(value)) errorMessage = "Pin Code must be 6 digits.";
        break;
      case "password": // Add validation for password
        if (!value.trim()) errorMessage = "Password is required.";
        else if (value.length < 8)
          errorMessage = "Password must be at least 8 characters.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
    return !errorMessage;
  };

  // Validate the entire form
  const validateForm = () => {
    const fields = Object.keys(formData);
    let isValid = true;

    fields.forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    return isValid;
  };

  // const formatDate = (dateString) => {
  //   const [year, month, day] = dateString.split("-");
  //   return `${day}-${month}-${year}`;
  // };

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
      // Make API call
      // const formattedData = {
      //   ...formData,
      //   dateOfBirth: formatDate(formData.dateOfBirth),
      // };
      // console.log(formattedData);
      // const response = await axios.post(
      //   "http://localhost:8080/register",
      //   formData // This should be the request body
      // );

      // Convert phone and pinCode to numbers
      const payload = {
        ...formData,
        phone: Number(formData.phone), // Convert phone to number
        pinCode: Number(formData.pinCode), // Convert pinCode to number
      };

      // Make API call
      const response = await axios.post(
        "http://localhost:8080/register",
        payload // Send the modified payload
      );

      if (response.status === 200) {
        navigate("/login");
        setSnackbar({
          open: true,
          message: "Registration successful!",
          severity: "success",
        });
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          address: "",
          phone: "",
          gender: "",
          dateOfBirth: "",
          city: "",
          state: "",
          pinCode: "",
          password: "", // Reset password field
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Registration failed. Please try again.",
        severity: "error",
      });
    }
  };

  // Check if the form is valid
  const isFormValid = () => {
    return (
      Object.values(errors).every((x) => x === "") &&
      Object.values(formData).every((x) => x !== "")
    );
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Define input fields dynamically based on formData keys
  const inputFields = Object.keys(formData).map((field) => {
    switch (field) {
      case "name":
        return (
          <TextField
            key={field}
            fullWidth
            label="Name"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            error={!!errors[field]}
            helperText={errors[field]}
            margin="normal"
          />
        );
      case "email":
        return (
          <TextField
            key={field}
            fullWidth
            label="Email"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            error={!!errors[field]}
            helperText={errors[field]}
            margin="normal"
          />
        );
      case "password":
        return (
          <TextField
            key={field}
            fullWidth
            label="Password"
            name={field}
            type={showPassword ? "text" : "password"}
            value={formData[field]}
            onChange={handleChange}
            error={!!errors[field]}
            helperText={errors[field]}
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
        );
      case "address":
        return (
          <TextField
            key={field}
            fullWidth
            label="Address"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            error={!!errors[field]}
            helperText={errors[field]}
            margin="normal"
          />
        );
      case "phone":
        return (
          <TextField
            key={field}
            fullWidth
            label="Phone"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            error={!!errors[field]}
            helperText={errors[field]}
            margin="normal"
          />
        );
      case "gender":
        return (
          <FormControl
            key={field}
            fullWidth
            margin="normal"
            error={!!errors[field]}
          >
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData[field]}
              label="Gender"
              name={field}
              onChange={handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            {errors[field] && (
              <Typography variant="body2" color="error">
                {errors[field]}
              </Typography>
            )}
          </FormControl>
        );
      case "dateOfBirth":
        return (
          <TextField
            key={field}
            fullWidth
            label="Date of Birth"
            name={field}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData[field]}
            onChange={handleChange}
            error={!!errors[field]}
            helperText={errors[field]}
            margin="normal"
          />
        );
      case "city":
        return (
          <TextField
            key={field}
            fullWidth
            label="City"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            error={!!errors[field]}
            helperText={errors[field]}
            margin="normal"
          />
        );
      case "state":
        return (
          <TextField
            key={field}
            fullWidth
            label="State"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            error={!!errors[field]}
            helperText={errors[field]}
            margin="normal"
          />
        );
      case "pinCode":
        return (
          <TextField
            key={field}
            fullWidth
            label="Pin Code"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            error={!!errors[field]}
            helperText={errors[field]}
            margin="normal"
          />
        );
      default:
        return null;
    }
  });

  return (
    <div
      className="min-h-screen flex bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="grid grid-cols-2 w-full">
        {/* First div: Title in the top-left corner */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-white">My App</h1>
        </div>
        <div className="flex justify-center items-center p-8">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <Typography variant="h4" align="center" gutterBottom>
              Register
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Render input fields dynamically */}
              {inputFields}

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!isFormValid()}
                sx={{ mt: 3 }}
              >
                Register
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Go to login?{" "}
                <Link href="/login" underline="hover">
                  Login
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

export default RegisterPage;
