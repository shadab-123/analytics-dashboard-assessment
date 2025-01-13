import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const LineChart = ({ data, title }) => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        const gradient = canvasRef.current.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(75, 192, 192, 0.5)');
        gradient.addColorStop(1, 'rgba(153, 102, 255, 0.2)');

        chartRef.current = new Chart(canvasRef.current, {
            type: 'line',
            data: {
                labels: Object.keys(data),
                datasets: [
                    {
                        label: title,
                        data: Object.values(data),
                        fill: true,
                        backgroundColor: gradient,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            chartRef.current.destroy();
        };
    }, [data, title]);

    return (
        <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div className="h-64">
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
};

export default LineChart;
