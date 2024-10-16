import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ColumnChart = ({ chartData = [], chartOptions = {} }) => {
  const [data, setData] = useState(chartData);
  const [options, setOptions] = useState(chartOptions);

  useEffect(() => {
    // Update state if chartData or chartOptions change
    setData(chartData || []);
    setOptions(chartOptions || {});
  }, [chartData, chartOptions]);

  // Only render the chart if both data and options are available
  if (!data.length || Object.keys(options).length === 0) {
    return <div>Loading chart...</div>; // You can show a loading indicator or a message here
  }

  return (
    <div style={{ width: '100%', height: '400px' }}> {/* Explicit size */}
      <Chart
        options={options}
        series={data}
        type='bar'
        width='100%' 
        height='100%'
      />
    </div>
  );
};

export default ColumnChart;
