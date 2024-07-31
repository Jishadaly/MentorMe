import React from 'react';
import { Typography, Avatar, Tooltip } from "@material-tailwind/react";

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-hidden border border-blue-gray-100 shadow-sm rounded-lg mb-6">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                <Typography variant="small" className="text-[11px] font-medium uppercase text-blue-gray-400">
                  {col}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={`py-3 px-5 ${rowIndex === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                  {typeof row[col] === 'object' && row[col].component ? (
                    row[col].component
                  ) : (
                    <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                      {row[col]}
                    </Typography>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
