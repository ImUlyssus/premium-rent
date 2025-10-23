import React from 'react';

const statuses = ['all', 'vacant', 'occupied', 'maintenance'];

interface PropertyFilterProps {
  currentFilter: string;
  onFilterChange: (status: string) => void;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="mb-4">
      <div className="flex space-x-2 p-1 bg-gray-800 rounded-lg">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`w-full px-3 py-2 text-sm font-medium rounded-md transition-colors
              ${currentFilter === status
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
              }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyFilter;
