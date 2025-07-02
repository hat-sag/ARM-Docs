// components/entitiesview.jsx
import React from 'react';
import FilterBar from './filterbar';
import EntityTable from './entitytable';

const EntitiesView = ({
  filteredEntities,
  setSelectedItem,
  reportFilters,
  productSpecificFilters,
  toggleReportFilter,
  toggleProductSpecificFilter
}) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Entities Catalog</h2>
      <p className="text-gray-600">Data entities, source tables, and dimensional structures</p>
    </div>

    <FilterBar
      reportFilters={reportFilters}
      productSpecificFilters={productSpecificFilters}
      toggleReportFilter={toggleReportFilter}
      toggleProductSpecificFilter={toggleProductSpecificFilter}
    />

    <EntityTable
      entities={filteredEntities}
      onView={setSelectedItem}
    />
  </div>
);

export default EntitiesView;
