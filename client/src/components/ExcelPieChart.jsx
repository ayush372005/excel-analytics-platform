// client/src/components/ExcelPieChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExcelPieChart = ({ chartData, xAxis, yAxis }) => {
  const filteredData = chartData.filter(
    item => item[xAxis] !== undefined && item[yAxis] !== undefined
  );

  const data = {
    labels: filteredData.map(item => String(item[xAxis])), // ensure labels are strings
    datasets: [
      {
        label: `${yAxis}`, // ✅ label must be string
        data: filteredData.map(item => Number(item[yAxis])),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#6B7280', '#10B981',
          '#8B5CF6', '#F59E0B', '#EF4444', '#3B82F6'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: `${yAxis} Distribution`,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default ExcelPieChart;
