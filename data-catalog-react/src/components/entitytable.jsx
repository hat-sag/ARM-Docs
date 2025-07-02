// components/entitytable.jsx
import React from 'react';
import { ChevronRight } from 'lucide-react';

const badgeColors = {
  Revenue: 'bg-green-100 text-green-800',
  Occupancy: 'bg-blue-100 text-blue-800',
  'Rate Increase': 'bg-orange-100 text-orange-800',
};

const EntityTable = ({ entities, onView }) => (
  <div className="bg-white rounded-lg shadow-sm border">
    <div className="px-6 py-4 border-b">
      <h3 className="text-lg font-semibold text-gray-900">Entities Summary</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reports</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source Table</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grain</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entities.map((entity, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{entity.Entity}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  entity["Entity Type"] === 'Fact Table'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {entity["Entity Type"]}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                {entity.Reports?.split(',').map((tag, i) => (
                  <span key={i} className={`inline-block px-2 py-0.5 mr-1 text-xs rounded-full ${
                    badgeColors[tag.trim()] || 'bg-gray-200 text-gray-800'
                  }`}>
                    {tag.trim()}
                  </span>
                ))}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-xs">{entity.Description}</td>
              <td className="px-6 py-4 text-sm font-mono text-gray-600">{entity["Source Table"]}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{entity.Grain}</td>
              <td className="px-6 py-4 text-sm font-medium">
                <button
                  onClick={() => onView(entity)}
                  className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                >
                  <span>View</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default EntityTable;
