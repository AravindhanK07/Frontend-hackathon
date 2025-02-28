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
} from "@mui/material";
import backgroundImage from "../assets/Login_page.png";

const RegisterPage = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    state: "",
    pinCode: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State for API response feedback
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

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

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
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
      // Make API call
      const formattedData = {
        ...formData,
        dateOfBirth: formatDate(formData.dateOfBirth),
      };
      console.log(formattedData);
      const response = await axios.post(
        "https://api.example.com/register",
        formattedData
      );

      if (response.status === 200) {
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
              {/* Name */}
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
              />

              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
              />

              {/* Address */}
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                margin="normal"
              />

              {/* Phone */}
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                margin="normal"
              />

              <FormControl fullWidth margin="normal" error={!!errors.gender}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.gender}
                  label="Gender"
                  name="gender"
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
                {errors.gender && (
                  <Typography variant="body2" color="error">
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>

              {/* <FormControl fullWidth margin="normal" error={!!errors.gender}>
                <InputLabel shrink={!!formData.gender}>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
                {errors.gender && (
                  <Typography variant="body2" color="error">
                    {errors.gender}
                  </Typography>
                )}
              </FormControl> */}

              {/* Date of Birth */}
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
                margin="normal"
              />

              {/* City */}
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
                margin="normal"
              />

              {/* State */}
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={!!errors.state}
                helperText={errors.state}
                margin="normal"
              />

              {/* Pin Code */}
              <TextField
                fullWidth
                label="Pin Code"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                error={!!errors.pinCode}
                helperText={errors.pinCode}
                margin="normal"
              />

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
