// components/homeview.jsx
import React from 'react';
import { FileText } from 'lucide-react';

const HomeView = ({ setActiveTab }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Data Catalog</h2>
      <p className="text-gray-600">Explore your organization's data entities and metrics</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </span>
          <h3 className="text-lg font-semibold text-gray-900">Entities</h3>
        </div>
        <p className="text-gray-600 mb-4">Browse data entities, source tables, and dimensional structures</p>
        <button
          onClick={() => setActiveTab('entities')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Explore Entities
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </span>
          <h3 className="text-lg font-semibold text-gray-900">Metrics</h3>
        </div>
        <p className="text-gray-600 mb-4">Discover key business metrics and their definitions</p>
        <button
          onClick={() => setActiveTab('metrics')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Explore Metrics
        </button>
      </div>
    </div>
  </div>
);

export default HomeView;
