import React, { useEffect, useState } from "react";
import axios from "axios";
import Doughnut2D from "./Doughnut2D";
import ScrollColumn2D from "./ScrollColumn2D";
import { Grid, Paper, Typography, Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"; // Import the info icon

export const MainDashboard = () => {
  const [salesKpiData, setSalesKpiData] = useState(null);
  const [topFiveProductData, setTopFiveProductData] = useState(null);
  const [expensesVsSales, setExpensesVsSales] = useState([]);
  const [kpiData3, setKpiData3] = useState(null);
  const [metricData, setMetricData] = useState(null);

  const salesKpi = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/salesKPI1");
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
        "http://localhost:8080/api/topFiveProduct"
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
        "http://localhost:8080/api/GetExpensesVsSales"
      );
      console.log("Full Response:", response.data);

      // Destructure and remove status & msg keys
      // const { status, msg, ...filteredData } = response.data;

      // Set the remaining data
      setExpensesVsSales(response.data.data);
    } catch (error) {
      console.error("Error fetching Sales KPI:", error);
    }
  };
  const GetKPIData3 = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/GetKPIData3");
      console.log("Full Response:", response.data);

      // Extract and round all numeric values
      const roundedData = Object.fromEntries(
        Object.entries(response.data.data).map(([key, value]) => [
          key,
          Math.round(value),
        ])
      );

      // Set the state with rounded values
      setKpiData3(roundedData);
    } catch (error) {
      console.error("Error fetching Sales KPI:", error);
    }
  };

  const FetchMetricData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/FetchMetricsData"
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
            backgroundColor: "#538cf0",
            // height: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-3xl font-bold text-left text-gray-100 dark:text-white text-center">
            Total sales
          </p>

          <p class="ml-2 text-gray-100 text-2xl dark:text-gray-50">
            {salesKpiData?.ytd_sales}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#538cf0",
            // height: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p class="my-4 text-3xl font-bold text-left text-gray-100 dark:text-white text-center">
            Total purchase
          </p>

          <p class="ml-2 text-gray-100 text-2xl dark:text-gray-50">
            {salesKpiData?.ytd_purchase}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#538cf0",
            // height: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Tooltip
            title={
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {
                  "Shows how much profit remains after deducting all expenses, including rent, salaries, and utilities.\nFormula:\nNet profit = Total sales - Total Expenses"
                }
              </Typography>
            }
            arrow
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>

          <p class="my-4 text-3xl font-bold text-left text-gray-100 dark:text-white text-center">
            Net profit
          </p>

          <p class="ml-2 text-gray-100 text-2xl dark:text-gray-50">
            {salesKpiData?.net_profit}
          </p>
        </Paper>
      </Grid>

      {/* 2nd Row: 1 Full-Width Column */}
      <Grid item xs={12} sm={6}>
        <div
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#e0e0e0",
            // height: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <ScrollColumn2D expensesVsSales={expensesVsSales} />
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
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
          <Doughnut2D topFiveProductData={topFiveProductData} />
        </div>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#538cf0",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Tooltip
            title={
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {
                  "Measures the cost of storing an SKU in inventory over time.\nFormula:\nHolding Cost=(storage cost per SKU Per month)*(Total SKU Units in Stock)"
                }
              </Typography>
            }
            arrow
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <p class="my-4 text-3xl font-bold text-left text-gray-100 dark:text-white text-center">
            Sku holding cost
          </p>

          <p class="ml-2 text-gray-100 text-2xl dark:text-gray-50">
            {kpiData3?.sku_holding_cost}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#538cf0",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Tooltip
            title={
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {
                  "Calculates the average amount spent per customer per transaction.\nFormula:\nATV=(Total Revenue/Total Transaction)"
                }
              </Typography>
            }
            arrow
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <p class="my-4 text-3xl font-bold text-left text-gray-100 dark:text-white text-center">
            Average transaction value
          </p>

          <p class="ml-2 text-gray-100 text-2xl dark:text-gray-50">
            {kpiData3?.average_transaction_value}
          </p>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#538cf0",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Tooltip
            title={
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {
                  "Measures how many store visitors make a purchase.\nFormula:\nConversion Rate=(total Transaction /total Visitors)*100"
                }
              </Typography>
            }
            arrow
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <p class="my-4 text-3xl font-bold text-left text-gray-100 dark:text-white text-center">
            Footfall conversion rate
          </p>

          <p class="ml-2 text-gray-100 text-2xl dark:text-gray-50">
            {kpiData3?.footfall_conversion_rate}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#538cf0",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Tooltip
            title={
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {
                  "Compares operational expenses to total revenue to monitor cost efficiency.\nFormula:\nExpense To Sales ratio=(Total Expenses/Total Revenue) * 100"
                }
              </Typography>
            }
            arrow
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <p class="my-4 text-3xl font-bold text-left text-gray-100 dark:text-white text-center">
            Expense to revenue ratio
          </p>

          <p class="ml-2 text-gray-100 text-2xl dark:text-gray-50">
            {metricData?.expense_to_revenue_ratio}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#538cf0",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Tooltip
            title={
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {
                  "Calculates the average amount spent per customer per transaction.\nFormula:\nATV=(Total Revenue/Total Transaction)"
                }
              </Typography>
            }
            arrow
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <p class="my-4 text-3xl font-bold text-left text-gray-100 dark:text-white text-center">
            Lost Sales Due to Stockouts
          </p>

          <p class="ml-2 text-gray-100 text-2xl dark:text-gray-50">
            {metricData?.revenue_lost_due_to_stock}
          </p>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#538cf0",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Tooltip
            title={
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {
                  "Calculates the average amount spent per customer per transaction.ATV."
                }
              </Typography>
            }
            arrow
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <p class="my-4 text-3xl font-bold text-left text-gray-100 dark:text-white text-center">
            Profit margin
          </p>

          <p class="ml-2 text-gray-100 text-2xl dark:text-gray-50">
            {metricData?.profit_margin}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#538cf0",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Tooltip
            title={
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {
                  "Calculates the average amount spent per customer per transaction.\nFormula:\nATV=(Total Revenue/Total Transaction)"
                }
              </Typography>
            }
            arrow
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <p class="my-4 text-3xl font-bold text-left text-gray-100 dark:text-white text-center">
            Top selling SKU
          </p>

          <p class="ml-2 text-gray-100 text-2xl dark:text-gray-50">
            {metricData?.top_selling_sku}
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#538cf0",
            // height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Tooltip
            title={
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {
                  "Calculates the average amount spent per customer per transaction.\nFormula:\nATV=(Total Revenue/Total Transaction)"
                }
              </Typography>
            }
            arrow
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <p class="my-4 text-3xl font-bold text-left text-gray-100 dark:text-white text-center">
            Inventory cost
          </p>

          <p class="ml-2 text-gray-100 text-2xl dark:text-gray-50">
            {metricData?.inventory_cost}
          </p>
        </Paper>
      </Grid>
    </Grid>
  );
};
