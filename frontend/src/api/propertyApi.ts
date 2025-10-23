import axios from 'axios';
import type { Property, PropertyCreationData } from '../types';

const API_URL = 'http://localhost:3001/api/properties';

// getProperties function
export const getProperties = async (status?: string): Promise<Property[]> => {
  let url = API_URL;
  if (status && status !== 'all') {
    url += `?status=${status}`;
  }
  const response = await axios.get(url);
  return response.data;
};

// Create a property
export const createProperty = async (propertyData: PropertyCreationData): Promise<Property> => {
  const response = await axios.post(API_URL, propertyData);
  return response.data;
};

// Update a property
export const updateProperty = async (property: Property): Promise<Property> => {
  const response = await axios.put(`${API_URL}/${property.id}`, property);
  return response.data;
};

// Get a single property by its ID
export const getPropertyById = async (id: number): Promise<Property> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Delete a property
export const deleteProperty = async (id: number): Promise<{ message: string }> => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
