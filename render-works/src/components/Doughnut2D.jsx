import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Load FusionCharts modules
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Doughnut2DChart = ({ topFiveProductData }) => {
  // Transform API response into chart data format
  const chartData =
    topFiveProductData?.top_products?.map((product) => ({
      label: product.product_name,
      value: product.total_sales.toString(), // FusionCharts requires values as strings
    })) || [];

  const dataSource = {
    chart: {
      caption: "Top 5 Best-Selling Products",
      subcaption: "Based on Total Sales",
      showpercentvalues: "1",
      aligncaptionwithcanvas: "0",
      captionpadding: "0",
      decimals: "1",
      theme: "fusion",
      showlegend: "0",
    },
    data: chartData,
  };

  return (
    <ReactFC
      type="doughnut2d"
      width="100%"
      height="400"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default Doughnut2DChart;
