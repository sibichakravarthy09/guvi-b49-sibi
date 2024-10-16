import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ chartData = [], chartOptions = {} }) => {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    // Ensure chartData is a valid array and chartOptions is a valid object
    if (Array.isArray(chartData) && chartData.length > 0 && typeof chartOptions === 'object' && Object.keys(chartOptions).length > 0) {
      setData(chartData);
      setOptions(chartOptions);
    }
  }, [chartData, chartOptions]);

  // Render loading message if data or options aren't available yet
  if (data.length === 0 || Object.keys(options).length === 0) {
    return <div>Loading chart...</div>;
  }

  return (
    <div style={{ width: '100%', height: '400px' }}> {/* Set height for pie chart */}
      <ReactApexChart
        options={options}
        series={data}
        type="pie"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default PieChart;
