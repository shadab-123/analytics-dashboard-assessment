import React, { useState } from 'react';

const DataTable = ({ data, title }) => {
  const rows = Object.entries(data);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const sortData = (column) => {
    const sortedRows = [...rows].sort(([keyA, valueA], [keyB, valueB]) => {
      if (sortOrder === 'asc') {
        return keyA.localeCompare(keyB);
      } else {
        return keyB.localeCompare(keyA);
      }
    });

    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    return sortedRows;
  };

  const handlePagination = (direction) => {
    if (direction === 'next') {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev') {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="bg-white p-6 shadow-md rounded-lg overflow-hidden">
      <h2 className="text-xl font-bold mb-4 text-gray-700">{title}</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th
              className="px-4 py-2 border cursor-pointer text-left text-gray-600"
              onClick={() => sortData('company')}
            >
              Company
            </th>
            <th
              className="px-4 py-2 border cursor-pointer text-left text-gray-600"
              onClick={() => sortData('count')}
            >
              Count
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {displayedRows.map(([company, count], index) => (
            <tr
              key={company}
              className={`${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } hover:bg-gray-100 transition-all`}
            >
              <td className="px-4 py-2 border">{company}</td>
              <td className="px-4 py-2 border">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          onClick={() => handlePagination('prev')}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {Math.ceil(rows.length / rowsPerPage)}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          onClick={() => handlePagination('next')}
          disabled={currentPage * rowsPerPage >= rows.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
