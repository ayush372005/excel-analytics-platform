// client/src/components/ExcelBarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExcelBarChart = ({ chartData, xAxis, yAxis }) => {
  const filteredData = chartData.filter(
    item => item[xAxis] !== undefined && item[yAxis] !== undefined
  );

  const data = {
    labels: filteredData.map(item => String(item[xAxis])), // ensure labels are strings
    datasets: [
      {
        label: `${yAxis} by ${xAxis}`, // ✅ always a string
        data: filteredData.map(item => Number(item[yAxis])),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${yAxis} by ${xAxis}`,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ExcelBarChart;
