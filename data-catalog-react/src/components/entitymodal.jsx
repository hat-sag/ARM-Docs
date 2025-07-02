// components/entitymodal.jsx
import React, { useEffect } from 'react';
import { Database, X } from 'lucide-react';

const EntityModal = ({ entity, onClose, modalRef }) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [modalRef, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg max-w-5xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#466a82] px-6 py-5 text-white sticky top-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{entity.Entity}</h3>
              <p className="text-blue-100 text-sm opacity-90">Entity Details</p>
            </div>
            <div className="ml-4 flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-200" />
              <button
                className="text-white/80 hover:text-white transition-colors"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {entity["Entity Type"]?.split(',').map((type, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
              >
                {type.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Top Info */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: 'Product-Specific',
                  value: entity['Product-Specific'],
                  className: entity['Product-Specific'] === 'Yes'
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-700 border border-slate-200',
                },
                {
                  label: 'Grain',
                  value: entity.Grain,
                  isMono: true,
                },
                {
                  label: 'Reports',
                  isTags: true,
                  tags: entity.Reports?.split(',') || [],
                },
              ].map((block, idx) => (
                <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-gray-200/80">
                  <div className="text-xs font-medium text-gray-500 mb-1">{block.label}</div>
                  {block.isTags ? (
                    <div className="flex flex-wrap gap-1">
                      {block.tags.map((tag, i) => {
                        const t = tag.trim();
                        const colorClass =
                          t === 'Revenue'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : t === 'Occupancy'
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            : 'bg-orange-50 text-orange-700 border border-orange-200';
                        return (
                          <span key={i} className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
                            {t}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        block.className || ''
                      } ${block.isMono ? 'font-mono text-gray-900' : ''}`}
                    >
                      {block.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <h4 className="font-semibold text-blue-900">Description</h4>
              </div>
              <p className="text-blue-800 leading-relaxed">{entity.Description}</p>
            </div>

            {/* Detail Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🎯', title: 'Primary Use', field: 'Primary Use' },
                { icon: '🔗', title: 'Dependencies & Joins', field: 'Dependencies / Joins' },
                { icon: '📝', title: 'Notes', field: 'Notes' },
                { icon: '⚠️', title: 'Potential Issues', field: 'Potential Issues' },
              ].map(({ icon, title, field }) => (
                <div key={field} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/80">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-sm">{icon}</span>
                    {title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{entity[field]}</p>
                </div>
              ))}
            </div>

            {/* Technical Details & Structure */}
            <div className="grid grid-cols-2 gap-4">
              {/* Technical */}
              <div className="bg-gray-900 rounded-xl p-5 shadow-sm">
                <h4 className="font-semibold text-gray-100 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Technical Details
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Source Table', field: 'Source Table', color: 'text-green-300' },
                    { label: 'Original Insights Table', field: 'Original Insights Table', color: 'text-blue-300' },
                  ].map(({ label, field, color }) => (
                    <div key={field}>
                      <div className="text-xs font-medium text-gray-400 mb-1">{label}</div>
                      <code className={`text-sm bg-gray-800 ${color} px-3 py-1.5 rounded-lg font-mono block`}>
                        {entity[field]}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Structure */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200/80">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Database className="w-4 h-4 text-gray-600" />
                  Data Structure
                </h4>
                <div className="space-y-4">
                  {['Attributes', 'Timestamps', 'Measures/Facts'].map((key) => {
                    if (!entity[key]) return null;
                    const colorMap = {
                      Attributes: 'bg-gray-100 text-gray-700',
                      Timestamps: 'bg-blue-50 text-blue-700 border border-blue-200',
                      'Measures/Facts': 'bg-purple-50 text-purple-700 border border-purple-200',
                    };
                    return (
                      <div key={key}>
                        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{key}</div>
                        <div className="flex flex-wrap gap-1">
                          {entity[key]?.split(',').map((item, idx) => (
                            <span
                              key={idx}
                              className={`text-xs ${colorMap[key]} px-2 py-1 rounded-md font-mono`}
                            >
                              {item.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default EntityModal;
