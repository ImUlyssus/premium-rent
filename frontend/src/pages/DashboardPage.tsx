// src/pages/DashboardPage.tsx

import React, { useState, useEffect } from 'react';
import type { Property, PropertyCreationData } from '../types';
import { getProperties, createProperty, updateProperty, deleteProperty } from '../api/propertyApi';
import PropertyList from '../components/properties/PropertyList';
import PropertyFilter from '../components/properties/PropertyFilter';
import PropertyForm from '../components/properties/PropertyForm';

const DashboardPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await getProperties(statusFilter);
      setProperties(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch properties. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [statusFilter]);

  const handleOpenAddModal = () => {
    setEditingProperty(null); // Ensure we're not editing when adding new
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProperty(null); // Clear any property being edited
  };

  // Function to handle editing a property
  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  // Function to handle deleting a property
  const handleDeleteProperty = async (propertyId: number) => {
    try {
      await deleteProperty(propertyId); // Call the API to delete
      fetchProperties(); // Refresh the list after deletion
    } catch (err) {
      setError('Failed to delete property.');
    }
  };

  const handleSaveProperty = async (propertyData: PropertyCreationData | Property) => {
    try {
      if ('id' in propertyData) {
        // This is an existing property, so we update it
        await updateProperty(propertyData as Property);
      } else {
        // This is a new property, so we create it
        await createProperty(propertyData as PropertyCreationData);
      }
      handleCloseModal();
      fetchProperties(); // Refresh the list after saving
    } catch (err) {
      setError('Failed to save property.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Properties Dashboard</h2>
        <button
          onClick={handleOpenAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          + Add Property
        </button>
      </div>
      
      <PropertyFilter currentFilter={statusFilter} onFilterChange={setStatusFilter} />

      {loading && <p>Loading properties...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && (
        <PropertyList
          properties={properties}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
        />
      )}

      {isModalOpen && (
        <PropertyForm
          onClose={handleCloseModal}
          onSave={handleSaveProperty}
          propertyToEdit={editingProperty || undefined}
        />
      )}
    </div>
  );
};

export default DashboardPage;
