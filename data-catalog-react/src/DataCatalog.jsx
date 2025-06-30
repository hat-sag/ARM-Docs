import React, { useState, useEffect } from 'react';
import { Search, Home, BarChart3, Database, ChevronRight, FileText } from 'lucide-react';

const DataCatalog = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [entities, setEntities] = useState([]);
  const [metrics, setMetrics] = useState([]);

  // Mock data - replace with your CSV data
  useEffect(() => {
    const sampleEntities = [
      {
        Product: 'Sales Analytics',
        Entity: 'Customer Orders',
        EntityType: 'Fact Table',
        Description: 'Contains all customer order transactions with detailed line items',
        Grain: 'Order Line Item',
        ProductSpecific: 'Yes',
        BaseTable: 'dim_orders'
      },
      {
        Product: 'Finance',
        Entity: 'Revenue Recognition',
        EntityType: 'Fact Table',
        Description: 'Monthly revenue recognition data by product and region',
        Grain: 'Month/Product/Region',
        ProductSpecific: 'Yes',
        BaseTable: 'fact_revenue'
      },
      {
        Product: 'HR Analytics',
        Entity: 'Employee Performance',
        EntityType: 'Dimension Table',
        Description: 'Employee performance metrics and ratings',
        Grain: 'Employee/Period',
        ProductSpecific: 'No',
        BaseTable: 'dim_employees'
      }
    ];

    const sampleMetrics = [
      {
        metricName: 'Monthly Recurring Revenue',
        type: 'Financial',
        description: 'Total recurring revenue generated each month from subscription products',
        grain: 'Month',
        sourceTables: 'fact_subscriptions, dim_products',
        dependsOn: 'Active Subscriptions, Product Pricing',
        formulaDAX: 'SUMX(fact_subscriptions, fact_subscriptions[monthly_amount] * fact_subscriptions[is_active])',
        formulaHumanReadable: 'Sum of (Monthly Amount × Active Flag) for all subscriptions',
        requiredColumns: 'monthly_amount, is_active, subscription_date',
        businessRules: 'Only include active subscriptions, exclude one-time payments',
        dateLogic: 'Current month snapshot, updated daily',
        dwVsRawNotes: 'DW aggregates by month, raw data is daily transactions',
        usedInReports: 'Executive Dashboard, Finance Monthly Report',
        notes: 'Critical metric for board reporting'
      },
      {
        metricName: 'Customer Acquisition Cost',
        type: 'Marketing',
        description: 'Average cost to acquire a new customer including all marketing expenses',
        grain: 'Month/Channel',
        sourceTables: 'fact_marketing_spend, fact_new_customers',
        dependsOn: 'Marketing Spend, New Customers',
        formulaDAX: 'DIVIDE(SUM(fact_marketing_spend[amount]), COUNT(fact_new_customers[customer_id]))',
        formulaHumanReadable: 'Total Marketing Spend ÷ Number of New Customers',
        requiredColumns: 'marketing_amount, customer_id, acquisition_date, channel',
        businessRules: 'Include all marketing channels, exclude organic acquisition',
        dateLogic: 'Monthly calculation, 3-month rolling average',
        dwVsRawNotes: 'DW pre-calculates by channel, raw data tracks individual campaigns',
        usedInReports: 'Marketing Performance Dashboard, CAC Payback Analysis',
        notes: 'Exclude enterprise deals over $100K for SMB analysis'
      }
    ];

    setEntities(sampleEntities);
    setMetrics(sampleMetrics);
  }, []);

  const filteredEntities = entities.filter(entity =>
    entity.Entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.Product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMetrics = metrics.filter(metric =>
    metric.metricName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    metric.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    metric.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderHome = () => (
    <div className="text-center py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Data Catalog</h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore our comprehensive collection of data entities and business metrics.
          Use the navigation to browse metrics and entities with detailed documentation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="bg-blue-50 border border-blue-200 rounded-lg p-6 cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => setActiveTab('metrics')}
          >
            <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Metrics Catalog</h3>
            <p className="text-blue-700">Browse business metrics with DAX formulas and documentation</p>
          </div>
          <div
            className="bg-green-50 border border-green-200 rounded-lg p-6 cursor-pointer hover:bg-green-100 transition-colors"
            onClick={() => setActiveTab('entities')}
          >
            <Database className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">Entities Catalog</h3>
            <p className="text-green-700">Discover data entities, tables, and their relationships</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMetrics = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Metrics Catalog</h2>
        <p className="text-gray-600">Business metrics with formulas, dependencies, and usage documentation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Metrics Summary</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grain</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMetrics.map((metric, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{metric.metricName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {metric.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {metric.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{metric.grain}</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <button
                          onClick={() => setSelectedItem({type: 'metric', data: metric})}
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
        </div>

        <div className="lg:col-span-1">
          {selectedItem && selectedItem.type === 'metric' ? (
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">{selectedItem.data.metricName}</h3>
                <span className="text-sm text-gray-500">{selectedItem.data.type} Metric</span>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-600">{selectedItem.data.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">DAX Formula</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                    <code>{selectedItem.data.formulaDAX}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Human Readable</h4>
                  <p className="text-sm text-gray-600">{selectedItem.data.formulaHumanReadable}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500">GRAIN:</span>
                    <p className="text-sm text-gray-900">{selectedItem.data.grain}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">SOURCE TABLES:</span>
                    <p className="text-sm text-gray-900">{selectedItem.data.sourceTables}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">DEPENDS ON:</span>
                    <p className="text-sm text-gray-900">{selectedItem.data.dependsOn}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">BUSINESS RULES:</span>
                    <p className="text-sm text-gray-900">{selectedItem.data.businessRules}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">USED IN REPORTS:</span>
                    <p className="text-sm text-gray-900">{selectedItem.data.usedInReports}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Metric</h3>
              <p className="text-gray-600">Choose a metric from the table to view detailed documentation and formulas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderEntities = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Entities Catalog</h2>
        <p className="text-gray-600">Data entities, tables, and dimensional structures</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grain</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEntities.map((entity, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{entity.Entity}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          entity.EntityType === 'Fact Table' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {entity.EntityType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{entity.Product}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{entity.Grain}</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <button
                          onClick={() => setSelectedItem({type: 'entity', data: entity})}
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
        </div>

        <div className="lg:col-span-1">
          {selectedItem && selectedItem.type === 'entity' ? (
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">{selectedItem.data.Entity}</h3>
                <span className="text-sm text-gray-500">{selectedItem.data.EntityType}</span>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-600">{selectedItem.data.Description}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500">PRODUCT:</span>
                    <p className="text-sm text-gray-900">{selectedItem.data.Product}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">ENTITY TYPE:</span>
                    <p className="text-sm text-gray-900">{selectedItem.data.EntityType}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">GRAIN:</span>
                    <p className="text-sm text-gray-900">{selectedItem.data.Grain}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">PRODUCT SPECIFIC:</span>
                    <p className="text-sm text-gray-900">{selectedItem.data.ProductSpecific}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">BASE TABLE:</span>
                    <p className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                      {selectedItem.data.BaseTable}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Entity</h3>
              <p className="text-gray-600">Choose an entity from the table to view detailed information.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-sm border-r min-h-screen p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
            <nav className="space-y-2">
              <button
                onClick={() => {setActiveTab('home'); setSelectedItem(null); setSearchTerm('');}}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                  activeTab === 'home' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => {setActiveTab('metrics'); setSelectedItem(null); setSearchTerm('');}}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                  activeTab === 'metrics' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Metrics</span>
              </button>
              <button
                onClick={() => {setActiveTab('entities'); setSelectedItem(null); setSearchTerm('');}}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                  activeTab === 'entities' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Entities</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {activeTab === 'home' && renderHome()}
            {activeTab === 'metrics' && renderMetrics()}
            {activeTab === 'entities' && renderEntities()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCatalog;

