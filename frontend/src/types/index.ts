// This file defines the "shape" of our data objects across the application.
// Using these interfaces ensures type safety and provides excellent autocompletion.

export interface Property {
  id: number;
  name: string;
  address: string;
  ownerName: string;
  monthlyRent: number;
  status: 'occupied' | 'vacant' | 'maintenance';
  createdAt?: string; // Optional because we don't send it when creating
  updatedAt?: string; // Optional
}

export interface Task {
  id: number;
  propertyId: number;
  description: string;
  type: 'cleaning' | 'maintenance' | 'inspection';
  assignedPerson: string;
  status: 'pending' | 'in progress' | 'done';
  date: string; // Using string for simplicity, can be Date object if needed
  createdAt?: string;
  updatedAt?: string;
}

// This is a special TypeScript utility type.
// It creates a new type that is the same as Property but without the 'id' field.
// This is perfect for the data we send when creating a *new* property.
export type PropertyCreationData = Omit<Property, 'id' | 'createdAt' | 'updatedAt'>;

// This creates a type for creating a *new* task.
// It's the same as the Task interface, but without the auto-generated fields.
export type TaskCreationData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;