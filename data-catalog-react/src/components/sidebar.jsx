import React from 'react';
import { Home, BarChart3, Database, FileText } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, resetFilters }) => {
  const navItems = [
    { key: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { key: 'metrics', label: 'Metrics', icon: <BarChart3 className="w-4 h-4" /> },
    { key: 'entities', label: 'Entities', icon: <Database className="w-4 h-4" /> },
    { key: 'arm', label: 'ARM Docs', icon: <FileText className="w-4 h-4" /> }, // ✅ New tab
  ];

  const handleClick = (tab) => {
    setActiveTab(tab);
    resetFilters();
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r p-6 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
      <nav className="space-y-2">
        {navItems.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => handleClick(key)}
            className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
              activeTab === key
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
