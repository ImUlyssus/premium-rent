// src/components/properties/PropertyCard.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (propertyId: number) => void;
}

const statusStyles = {
  vacant: 'bg-green-500/20 text-green-400',
  occupied: 'bg-yellow-500/20 text-yellow-400',
  maintenance: 'bg-red-500/20 text-red-400',
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete property "${property.name}"?`)) {
      onDelete(property.id);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-white mb-1">{property.name}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[property.status]}`}>
            {property.status}
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-4">{property.address}</p>
        <div className="text-sm text-gray-300">
          <p>Owner: {property.ownerName}</p>
          <p>Rent: ${property.monthlyRent}/month</p>
        </div>
      </div>
      <div className="bg-gray-700/50 p-3 flex justify-end space-x-2">
        <button
          onClick={() => onEdit(property)}
          className="text-xs font-semibold text-gray-300 hover:text-white bg-gray-600/50 hover:bg-gray-600 px-3 py-1 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={handleDeleteClick}
          className="text-xs font-semibold text-red-300 hover:text-red-500 bg-red-600/20 hover:bg-red-600/30 px-3 py-1 rounded-md"
        >
          Delete
        </button>
        <button
          onClick={() => navigate(`/properties/${property.id}/tasks`)}
          className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-md"
        >
          Tasks
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
