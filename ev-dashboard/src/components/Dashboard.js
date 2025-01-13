import React, { useEffect, useState } from 'react';
import BarChart from './Charts/BarChart';
import PieChart from './Charts/PieChart';
import LineChart from './Charts/LineChart';
import DataTable from './Charts/DataTable';
import {
  processManufacturerData,
  processRangeData,
  processYearData,
  processVehicleTypeData,
} from '../utils/processData';

const Dashboard = () => {
  const [manufacturerData, setManufacturerData] = useState({});
  const [rangeData, setRangeData] = useState({});
  const [yearData, setYearData] = useState({});
  const [vehicleTypeData, setVehicleTypeData] = useState({});

  useEffect(() => {
    fetch('/Electric_Vehicle_Population_Data.csv')
      .then((response) => response.text())
      .then((csvData) => {
        const rows = csvData.split('\n').slice(1);
        const json = rows.map((row) => {
          const values = row.split(',');
          return {
            Make: values[6],
            'Electric Range': parseInt(values[10], 10) || 0,
            'Model Year': parseInt(values[5], 10) || 0,
            'Vehicle Type': values[7],
          };
        });

        setManufacturerData(processManufacturerData(json));
        setRangeData(processRangeData(json));
        setYearData(processYearData(json));
        setVehicleTypeData(processVehicleTypeData(json));
      });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
      <div className="space-y-6 p-6">
        {/* Title Section */}
        <div className="text-center text-white mb-10">
          <h1 className="text-3xl font-bold">Electric Vehicle Dashboard</h1>
          <p className="text-xl">Data Insights and Visualizations</p>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-80 p-4 shadow-md rounded-lg transition-transform hover:scale-105">
            <BarChart data={manufacturerData} title="Top EV Manufacturers" />
          </div>
          <div className="bg-white bg-opacity-80 p-4 shadow-md rounded-lg transition-transform hover:scale-105">
            <LineChart data={vehicleTypeData} title="Distribution of Vehicle Types" />
          </div>
          <div className="bg-white bg-opacity-80 p-4 shadow-md rounded-lg transition-transform hover:scale-105">
            <BarChart data={yearData} title="EV Registrations by Year" />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-80 p-4 shadow-md rounded-lg transition-transform hover:scale-105">
            <PieChart data={manufacturerData} title="Top EV Manufacturers" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-80 p-4 shadow-md rounded-lg transition-transform hover:scale-105">
            <BarChart data={rangeData} title="EV Registrations by Year" />
          </div>
          <div className="bg-white bg-opacity-80 p-4 shadow-md rounded-lg transition-transform hover:scale-105">
            <LineChart data={vehicleTypeData} title="EV Registrations by Year (Line Chart)" />
          </div>
        </div>
        </div>

        <div className="bg-white bg-opacity-80 p-4 shadow-md rounded-lg transition-transform hover:scale-105">
          <DataTable data={manufacturerData} title="Top EV Manufacturers" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
