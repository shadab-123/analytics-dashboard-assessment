import React, { useEffect, useState } from 'react';
import BarChart from './Charts/BarChart';
import {
  processManufacturerData,
  processRangeData,
  processYearData,
} from '../utils/processData';

const Dashboard = () => {
  const [manufacturerData, setManufacturerData] = useState({});
  const [rangeData, setRangeData] = useState({});
  const [yearData, setYearData] = useState({});

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
          };
        });

        setManufacturerData(processManufacturerData(json));
        setRangeData(processRangeData(json));
        setYearData(processYearData(json));
      });
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">EV Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChart data={manufacturerData} title="Top EV Manufacturers" />
        <BarChart data={rangeData} title="Electric Range Distribution" />
        <BarChart data={yearData} title="EV Registrations by Year" />
      </div>
    </div>
  );
};

export default Dashboard;
