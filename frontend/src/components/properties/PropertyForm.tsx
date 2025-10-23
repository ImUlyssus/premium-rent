import React, { useState, useEffect } from 'react';
import type { Property, PropertyCreationData } from '../../types';


interface PropertyFormProps {
  onClose: () => void;
  onSave: (property: PropertyCreationData | Property) => void;
  propertyToEdit?: Property | null;
}

const emptyFormState: PropertyCreationData = {
  name: '',
  address: '',
  ownerName: '',
  monthlyRent: 0,
  status: 'vacant',
};

const PropertyForm: React.FC<PropertyFormProps> = ({ onClose, onSave, propertyToEdit }) => {
  const [formData, setFormData] = useState<PropertyCreationData | Property>(emptyFormState);
  const isEditing = !!propertyToEdit;

  useEffect(() => {
    // If we pass a property to edit, populate the form with its data.
    // Otherwise, ensure the form is empty.
    if (propertyToEdit) {
      setFormData(propertyToEdit);
    } else {
      setFormData(emptyFormState);
    }
  }, [propertyToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      // Convert monthlyRent to a number
      [name]: name === 'monthlyRent' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    // This is the modal container
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Property' : 'Add New Property'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Form Fields */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300">Address</label>
              <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-300">Owner Name</label>
              <input type="text" name="ownerName" id="ownerName" value={formData.ownerName} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-300">Monthly Rent ($)</label>
              <input type="number" name="monthlyRent" id="monthlyRent" value={formData.monthlyRent} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-300">Status</label>
              <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option value="vacant">Vacant</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
              {isEditing ? 'Save Changes' : 'Create Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
