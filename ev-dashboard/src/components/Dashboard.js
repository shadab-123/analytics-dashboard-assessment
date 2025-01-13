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
  processElectricVehicleTypeData,
  processCountry,
} from '../utils/processData';

const Dashboard = () => {
  const [manufacturerData, setManufacturerData] = useState({});
  const [rangeData, setRangeData] = useState({});
  const [yearData, setYearData] = useState({});
  const [vehicleTypeData, setVehicleTypeData] = useState({});
  const [evehicleTypeData, setEvehicleTypeData] = useState({});
  const [countryData, setCountryData] = useState({});
  const [keyMetrics, setKeyMetrics] = useState({
    totalEVs: 0,
    topManufacturer: '',
    averageRange: 0,
  });
    
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
            'Electric Vehicle Type': values[8],
            Country: values[1],
          };
        });

        // Process and set chart data
        setManufacturerData(processManufacturerData(json));
        setRangeData(processRangeData(json));
        setYearData(processYearData(json));
        setVehicleTypeData(processVehicleTypeData(json));
        setEvehicleTypeData(processElectricVehicleTypeData(json));
        setCountryData(processCountry(json));

        // Calculate key metrics
        const totalEVs = json.length;
        const topManufacturer = Object.entries(processManufacturerData(json))
          .sort((a, b) => b[1] - a[1])[0][0];
        const averageRange = (
          json.reduce((sum, item) => sum + item['Electric Range'], 0) / totalEVs
        ).toFixed(2);

        setKeyMetrics({ totalEVs, topManufacturer, averageRange });
      });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-500">
      <div className="space-y-6 p-6">
        {/* Title Section */}
        <div className="gap-6">
          <div className="bg-white bg-opacity-80 p-4 pl-[35vw] shadow-md rounded-lg">
          <h1 className="text-3xl font-bold">Electric Vehicle Dashboard</h1>
          <p className="text-xl pl-10">Data Insights and Visualizations</p>
          </div>     
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-80 p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Total EVs</h2>
            <p className="text-2xl font-bold">{keyMetrics.totalEVs}</p>
          </div>
          <div className="bg-white bg-opacity-80 p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Top Manufacturer</h2>
            <p className="text-2xl font-bold">{keyMetrics.topManufacturer}</p>
          </div>
          <div className="bg-white bg-opacity-80 p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Average Electric Range</h2>
            <p className="text-2xl font-bold">{keyMetrics.averageRange} km</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <BarChart data={evehicleTypeData} title="Electric Vehicle Type" />
          <BarChart data={vehicleTypeData} title="Distribution of Vehicle Models" />
          <BarChart data={yearData} title="EV Registrations by Year" />
        </div>

        {/* Pie and Line Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
          <PieChart data={manufacturerData} title="Top EV Manufacturers" />
          <LineChart data={rangeData} title="Electric Range Distribution" />
        </div>

        {/* Country Sales and DataTable */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <LineChart data={countryData} title="EV Sales by Country" />
          <DataTable data={manufacturerData}  title="Electric Vehicle Population" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
