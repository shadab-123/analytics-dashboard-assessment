import React from 'react';

const DataTable = ({ data, title }) => {
  const rows = Object.entries(data);
  const limitedRows = rows.slice(0, 10);
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Company</th>
            <th className="px-4 py-2 border">Count</th>
          </tr>
        </thead>
        <tbody>
          {limitedRows.map(([key, value]) => (
            <tr key={key}>
              <td className="px-4 py-2 border">{key}</td>
              <td className="px-4 py-2 border">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
