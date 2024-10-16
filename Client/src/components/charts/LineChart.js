import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ chartData = [], chartOptions = {} }) => {
  const [data, setData] = useState(chartData);
  const [options, setOptions] = useState(chartOptions);

  useEffect(() => {
    // Update state when props change
    setData(chartData || []);
    setOptions(chartOptions || {});
  }, [chartData, chartOptions]);

  // Conditional rendering to avoid errors when data or options are not ready
  if (!data.length || Object.keys(options).length === 0) {
    return <div>Loading chart...</div>; // Display a loading state
  }

  return (
    <div style={{ width: '100%', height: '400px' }}> {/* Set explicit height */}
      <ReactApexChart
        options={options}
        series={data}
        type="line"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default LineChart;
