import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ chartData = [], chartOptions = {} }) => {
  const [data, setData] = useState(chartData);
  const [options, setOptions] = useState(chartOptions);

  useEffect(() => {
    setData(chartData || []);
    setOptions(chartOptions || {});
  }, [chartData, chartOptions]);

  // Only render the chart when data and options are valid
  if (!data.length || Object.keys(options).length === 0) {
    return <div>Loading chart...</div>; // Show loading message while data is unavailable
  }

  return (
    <div style={{ width: '100%', height: '400px' }}> {/* Explicit size */}
      <ReactApexChart
        options={options}
        series={data}
        type='area'
        width='100%'
        height='100%'
      />
    </div>
  );
};

export default LineChart;
