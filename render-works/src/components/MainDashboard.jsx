import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import Doughnut2D from "./Doughnut2D";
import ScrollColumn2D from "./ScrollColumn2D";

export const MainDashboard = () => {
  const [salesKpiData, setSalesKpiData] = useState(null);
  const [topFiveProductData, setTopFiveProductData] = useState(null);
  const [expensesVsSales, setExpensesVsSales] = useState([]);
  const [kpiData3, setKpiData3] = useState(null);
  const [metricData, setMetricData] = useState(null);

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
  const topFiveProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/topFiveProduct"
      );
      console.log("Full Response:", response.data);

      // Destructure and remove status & msg keys
      const { status, msg, ...filteredData } = response.data;

      // Set the remaining data
      setTopFiveProductData(filteredData);
    } catch (error) {
      console.error("Error fetching Sales KPI:", error);
    }
  };
  const GetExpensesVsSales = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/GetExpensesVsSales"
      );
      console.log("Full Response:", response.data);

      // Destructure and remove status & msg keys
      const { status, msg, ...filteredData } = response.data;

      // Set the remaining data
      setExpensesVsSales(filteredData);
    } catch (error) {
      console.error("Error fetching Sales KPI:", error);
    }
  };
  const GetKPIData3 = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/GetKPIData3");
      console.log("Full Response:", response.data);

      // Destructure and remove status & msg keys
      // const { status, msg, ...filteredData } = response.data;

      // Set the remaining data
      setKpiData3(response.data.data);
    } catch (error) {
      console.error("Error fetching Sales KPI:", error);
    }
  };
  const FetchMetricData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/FetchMetricsData"
      );
      console.log("Full Response:", response.data);

      // Destructure and remove status & msg keys
      // const { status, msg, ...filteredData } = response.data;

      // Set the remaining data
      setMetricData(response.data.data);
    } catch (error) {
      console.error("Error fetching Sales KPI:", error);
    }
  };

  useEffect(() => {
    salesKpi();
    topFiveProduct();
    GetExpensesVsSales();
    GetKPIData3();
    FetchMetricData();
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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-3xl font-bold text-left text-gray-800 dark:text-white text-center">
            Total sales
          </p>

          <p class="ml-2 text-gray-700 text-lg dark:text-gray-50">
            {salesKpiData?.ytd_sales}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            // height: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-3xl font-bold text-left text-gray-800 dark:text-white text-center">
            Total purchase
          </p>

          <p class="ml-2 text-gray-700 text-lg dark:text-gray-50">
            {salesKpiData?.ytd_purchase}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            // height: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-3xl font-bold text-left text-gray-800 dark:text-white text-center">
            Net profit
          </p>

          <p class="ml-2 text-gray-700 text-lg dark:text-gray-50">
            {salesKpiData?.net_profit}
          </p>
        </Paper>
      </Grid>

      {/* 2nd Row: 1 Full-Width Column */}
      <Grid item xs={12}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#e0e0e0",
            // height: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ScrollColumn2D />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4}>
        <div
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Doughnut2D />
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-3xl font-bold text-left text-gray-800 dark:text-white text-center">
            Total sales
          </p>

          <p class="ml-2 text-gray-700 text-lg dark:text-gray-50">
            {kpiData3?.sku_holding_cost}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-3xl font-bold text-left text-gray-800 dark:text-white text-center">
            Total sales
          </p>

          <p class="ml-2 text-gray-700 text-lg dark:text-gray-50">
            {kpiData3?.average_transaction_value}
          </p>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-3xl font-bold text-left text-gray-800 dark:text-white text-center">
            Total sales
          </p>

          <p class="ml-2 text-gray-700 text-lg dark:text-gray-50">
            {kpiData3?.footfall_conversion_rate}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-3xl font-bold text-left text-gray-800 dark:text-white text-center">
            Total sales
          </p>

          <p class="ml-2 text-gray-700 text-lg dark:text-gray-50">
            {metricData?.expense_to_revenue_ratio}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-3xl font-bold text-left text-gray-800 dark:text-white text-center">
            Total sales
          </p>

          <p class="ml-2 text-gray-700 text-lg dark:text-gray-50">
            {metricData?.revenue_lost_due_to_stock}
          </p>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-3xl font-bold text-left text-gray-800 dark:text-white text-center">
            Total sales
          </p>

          <p class="ml-2 text-gray-700 text-lg dark:text-gray-50">
            {metricData?.profit_margin}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-3xl font-bold text-left text-gray-800 dark:text-white text-center">
            Total sales
          </p>

          <p class="ml-2 text-gray-700 text-lg dark:text-gray-50">
            {metricData?.top_selling_sku}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-3xl font-bold text-left text-gray-800 dark:text-white text-center">
            Total sales
          </p>

          <p class="ml-2 text-gray-700 text-lg dark:text-gray-50">
            {metricData?.inventory_cost}
          </p>
        </Paper>
      </Grid>
    </Grid>
  );
};
