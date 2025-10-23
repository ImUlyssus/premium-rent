import React, { useState, useEffect } from 'react';
import type { Task, TaskCreationData } from '../../types';

interface TaskFormProps {
  onClose: () => void;
  onSave: (task: TaskCreationData | Task) => void;
  propertyId: number;
  taskToEdit?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, onSave, propertyId, taskToEdit }) => {
  const emptyFormState: TaskCreationData = {
    description: '',
    type: 'cleaning',
    assignedPerson: '',
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
    propertyId: propertyId,
  };
    
  const [formData, setFormData] = useState<TaskCreationData | Task>(emptyFormState);
  const isEditing = !!taskToEdit;

  useEffect(() => {
    setFormData(taskToEdit ? taskToEdit : emptyFormState);
  }, [taskToEdit, propertyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={3} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-300">Type</label>
              <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm">
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
                <option value="inspection">Inspection</option>
              </select>
            </div>
            <div>
              <label htmlFor="assignedPerson" className="block text-sm font-medium text-gray-300">Assigned To</label>
              <input type="text" name="assignedPerson" id="assignedPerson" value={formData.assignedPerson} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-300">Status</label>
              <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm">
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
             <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300">Date</label>
              <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm" />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">{isEditing ? 'Save Changes' : 'Create Task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
