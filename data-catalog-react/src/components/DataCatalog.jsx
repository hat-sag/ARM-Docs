import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText } from 'lucide-react';
import Papa from 'papaparse';

import Sidebar from './sidebar';
import FilterBar from './filterbar';
import EntityTable from './entitytable';
import EntityModal from './entitymodal';
import HomeView from './homeview';
import EntitiesView from './entitiesview';
import MetricsView from './metricsview';
import ARMView from './ARMView';

const DataCatalog = () => {
  const [activeTab, setActiveTab] = useState('entities');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [entities, setEntities] = useState([]);
  const [reportFilters, setReportFilters] = useState([]);
  const [productSpecificFilters, setProductSpecificFilters] = useState([]);
  const modalRef = useRef();

  useEffect(() => {
    async function loadCsv(path) {
      const response = await fetch(path);
      const text = await response.text();
      return Papa.parse(text, { header: true, skipEmptyLines: true }).data;
    }
    loadCsv('/data/entities.csv').then(setEntities);
  }, []);

  const filteredEntities = entities.filter(entity => {
    const matchesSearch =
      entity.Entity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.Description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesReport =
      reportFilters.length === 0 || reportFilters.some(filter => entity.Reports?.includes(filter));

    const matchesProductSpecific =
      productSpecificFilters.length === 0 || productSpecificFilters.includes(entity['Product-Specific']);

    return matchesSearch && matchesReport && matchesProductSpecific;
  });

  const toggleReportFilter = (report) => {
    setReportFilters(prev =>
      prev.includes(report) ? prev.filter(r => r !== report) : [...prev, report]
    );
  };

  const toggleProductSpecificFilter = (value) => {
    setProductSpecificFilters(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Data Catalog</h1>
        </div>
        {(activeTab === 'metrics' || activeTab === 'entities') && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          resetFilters={() => {
            setSelectedItem(null);
            setSearchTerm('');
            setReportFilters([]);
            setProductSpecificFilters([]);
          }}
        />

        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
          {activeTab === 'metrics' && <MetricsView />}
          {activeTab === 'entities' && (
            <EntitiesView
              filteredEntities={filteredEntities}
              setSelectedItem={setSelectedItem}
              reportFilters={reportFilters}
              productSpecificFilters={productSpecificFilters}
              toggleReportFilter={toggleReportFilter}
              toggleProductSpecificFilter={toggleProductSpecificFilter}
            />
          )}
          {activeTab === 'arm' && <ARMView />}
        </div>
      </div>

      {selectedItem && (
        <EntityModal
          entity={selectedItem}
          onClose={() => setSelectedItem(null)}
          modalRef={modalRef}
        />
      )}
    </div>
  );
};

export default DataCatalog;
