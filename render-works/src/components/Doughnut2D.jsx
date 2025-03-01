import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Load FusionCharts modules
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Doughnut2DChart = () => {
  const dataSource = {
    chart: {
      caption: "Sales by Category",
      subcaption: "2023",
      showpercentvalues: "1",
      defaultcenterlabel: "Sales Distribution",
      aligncaptionwithcanvas: "0",
      captionpadding: "0",
      decimals: "1",
      theme: "fusion",
    },
    data: [
      { label: "Electronics", value: "42000" },
      { label: "Clothing", value: "81000" },
      { label: "Groceries", value: "72000" },
      { label: "Furniture", value: "55000" },
    ],
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
