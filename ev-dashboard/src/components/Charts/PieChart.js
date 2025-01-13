import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const PieChart = ({ data, title }) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(canvasRef.current, {
      type: 'pie',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: title,
            data: Object.values(data),
            backgroundColor: [
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 99, 132, 0.5)',
            ], // Color for each slice
            borderColor: 'rgba(0, 0, 0, 0.2)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'left',
            // Add a max height and scroll on overflow
            labels: {
              boxWidth: 20,
              padding: 10,
              font: {
                size: 10,
              },
              // Allow scrolling when there are many labels
              filter: (legendItem, chartData) => {
                return chartData.labels.length > 5; // Adjust number of labels before scrolling kicks in
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              },
            },
          },
        },
        maintainAspectRatio: false, // Prevents Chart.js from maintaining aspect ratio
        aspectRatio: 1, // Square aspect ratio, modify as needed
      },
    });

    return () => {
      chartRef.current.destroy();
    };
  }, [data, title]);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-[400px] flex">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default PieChart;
