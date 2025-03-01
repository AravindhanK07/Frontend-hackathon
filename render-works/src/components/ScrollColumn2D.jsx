import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Load FusionCharts modules
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

// Function to convert YYYY-MM to short month name (e.g., "2025-03" → "Mar")
const getMonthName = (dateString) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = parseInt(dateString.split("-")[1], 10) - 1;
  return months[monthIndex];
};

const ScrollColumn2DChart = ({ expensesVsSales }) => {
  // Transform data into FusionCharts format
  const categories = [
    {
      category: expensesVsSales.map((data) => ({
        label: getMonthName(data.month), // Convert YYYY-MM to short month name
      })),
    },
  ];

  const dataset = [
    {
      seriesname: "Total Sales",
      data: expensesVsSales.map((data) => ({
        value: data.total_sales.toString(),
      })),
    },
    {
      seriesname: "Total Expenses",
      data: expensesVsSales.map((data) => ({
        value: data.total_expenses.toString(),
      })),
    },
  ];

  const dataSource = {
    chart: {
      caption: "Monthly Sales vs Expenses",
      subcaption: "2025",
      xaxisname: "Month",
      yaxisname: "Amount (in USD)",
      theme: "fusion",
      scrollheight: "10", // Enables scrolling if data exceeds the width
      numvisibleplot: "6", // Number of bars visible at once
    },
    categories,
    dataset,
  };

  return (
    <ReactFC
      type="scrollcolumn2d"
      width="100%"
      height="400"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default ScrollColumn2DChart;
