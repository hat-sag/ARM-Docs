// components/filterbar.jsx
import React from 'react';

const FilterBar = ({
  reportFilters,
  productSpecificFilters,
  toggleReportFilter,
  toggleProductSpecificFilter,
}) => {
  const reportOptions = ['Revenue', 'Occupancy', 'Rate Increase'];
  const productOptions = ['Yes', 'No'];

  return (
    <div className="flex flex-wrap gap-6 mb-4 items-center">
      <div className="flex gap-2 items-center">
        <span className="text-sm font-medium text-gray-700">Reports:</span>
        {reportOptions.map((report) => (
          <button
            key={report}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              reportFilters.includes(report)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
            onClick={() => toggleReportFilter(report)}
          >
            {report}
          </button>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <span className="text-sm font-medium text-gray-700">Product-Specific:</span>
        {productOptions.map((value) => (
          <button
            key={value}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              productSpecificFilters.includes(value)
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
            onClick={() => toggleProductSpecificFilter(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
