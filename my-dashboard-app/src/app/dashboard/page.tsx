"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // For dynamically importing ApexCharts
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions for TypeScript

// Dynamically load ApexCharts (for Candlestick chart)
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string | string[];
    backgroundColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
  }[];
}

interface CandlestickData {
  x: string; // Date in ISO format
  open: number;
  high: number;
  low: number;
  close: number;
}

// Define a type for the series data expected by ApexCharts
interface CandlestickSeriesData {
  x: number; // timestamp in milliseconds
  y: [number, number, number, number]; // open, high, low, close values
}

const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState<ChartData | null>(null);
  const [barChartData, setBarChartData] = useState<ChartData | null>(null);
  const [pieChartData, setPieChartData] = useState<ChartData | null>(null);
  const [candlestickData, setCandlestickData] = useState<CandlestickSeriesData[]>([]);
  
  // Error states
  const [lineChartError, setLineChartError] = useState<string | null>(null);
  const [barChartError, setBarChartError] = useState<string | null>(null);
  const [pieChartError, setPieChartError] = useState<string | null>(null);
  const [candlestickChartError, setCandlestickChartError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch Line Chart Data
    axios.get('http://127.0.0.1:8000/api/line-chart-data/')
      .then(response => {
        setLineChartData({
          labels: response.data.labels,
          datasets: [{
            label: 'Line Chart Data',
            data: response.data.data,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          }]
        });
      })
      .catch(error => {
        setLineChartError('Failed to load Line Chart data.');
        console.error('Error fetching line chart data:', error);
      });

    // Fetch Bar Chart Data
    axios.get('http://127.0.0.1:8000/api/bar-chart-data/')
      .then(response => {
        setBarChartData({
          labels: response.data.labels,
          datasets: [{
            label: 'Bar Chart Data',
            data: response.data.data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        });
      })
      .catch(error => {
        setBarChartError('Failed to load Bar Chart data.');
        console.error('Error fetching bar chart data:', error);
      });

    // Fetch Pie Chart Data
    axios.get('http://127.0.0.1:8000/api/pie-chart-data/')
      .then(response => {
        setPieChartData({
          labels: response.data.labels,
          datasets: [{
            label: 'Pie Chart Data',
            data: response.data.data,
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1
          }]
        });
      })
      .catch(error => {
        setPieChartError('Failed to load Pie Chart data.');
        console.error('Error fetching pie chart data:', error);
      });

    // Fetch Candlestick Chart Data
    axios.get('http://127.0.0.1:8000/api/candlestick-data/')
      .then(response => {
        const data = response.data.data.map((item: CandlestickData) => ({
          x: new Date(item.x).getTime(),
          y: [item.open, item.high, item.low, item.close],
        }));
        setCandlestickData(data);
      })
      .catch(error => {
        setCandlestickChartError('Failed to load Candlestick Chart data.');
        console.error('Error fetching candlestick data:', error);
      });
  }, []);

  const candlestickChartOptions: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'Candlestick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {lineChartError ? (
        <p style={{ color: 'red' }}>{lineChartError}</p>
      ) : lineChartData && (
        <div>
          <h2>Line Chart</h2>
          <Line data={lineChartData} />
        </div>
      )}

      {barChartError ? (
        <p style={{ color: 'red' }}>{barChartError}</p>
      ) : barChartData && (
        <div>
          <h2>Bar Chart</h2>
          <Bar data={barChartData} />
        </div>
      )}

      {pieChartError ? (
        <p style={{ color: 'red' }}>{pieChartError}</p>
      ) : pieChartData && (
        <div>
          <h2>Pie Chart</h2>
          <Pie data={pieChartData} />
        </div>
      )}

      {candlestickChartError ? (
        <p style={{ color: 'red' }}>{candlestickChartError}</p>
      ) : candlestickData.length > 0 && (
        <div>
          <h2>Candlestick Chart</h2>
          <ApexCharts
            options={candlestickChartOptions}
            series={[{ data: candlestickData }]}
            type="candlestick"
            height={350}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
