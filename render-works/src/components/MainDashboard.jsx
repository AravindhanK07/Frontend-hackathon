import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import axios from "axios";

export const MainDashboard = () => {
  const [salesKpiData, setSalesKpiData] = useState(null);

  const salesKpi = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/salesKPI1");
      console.log("Full Response:", response.data);

      // Destructure and remove status & msg keys
      const { status, msg, ...filteredData } = response.data;

      // Set the remaining data
      setSalesKpiData(filteredData);
    } catch (error) {
      console.error("Error fetching Sales KPI:", error);
    }
  };

  useEffect(() => {
    salesKpi();
  }, []);

  return (
    <Grid container spacing={2} sx={{ padding: "18px" }}>
      {/* 1st Row: 3 Columns */}
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            // height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-4xl font-bold text-left text-gray-800 dark:text-white text-center">
            Total sales
          </p>

          <p class="ml-2 text-gray-700 text-md dark:text-gray-50">30,000</p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Column 2</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Column 3</Typography>
        </Paper>
      </Grid>

      {/* 2nd Row: 1 Full-Width Column */}
      <Grid item xs={12}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#e0e0e0",
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Full-Width Column</Typography>
        </Paper>
      </Grid>

      {/* 3rd Row: 3 Columns with Heading and Content */}
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Row 3 Heading
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">Row 3, Column 1 Content</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">Row 3, Column 2 Content</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">Row 3, Column 3 Content</Typography>
        </Paper>
      </Grid>

      {/* 4th Row: 3 Columns with Heading and Content */}
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Row 4 Heading
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">Row 4, Column 1 Content</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">Row 4, Column 2 Content</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">Row 4, Column 3 Content</Typography>
        </Paper>
      </Grid>

      {/* 5th Row: 3 Columns with Heading and Content */}
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Row 5 Heading
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">Row 5, Column 1 Content</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">Row 5, Column 2 Content</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">Row 5, Column 3 Content</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
