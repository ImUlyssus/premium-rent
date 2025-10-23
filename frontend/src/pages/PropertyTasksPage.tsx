import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Property, Task, TaskCreationData } from '../types';
import { getPropertyById } from '../api/propertyApi';
import { getTasksForProperty, createTask, updateTask, deleteTask } from '../api/taskApi';
import TaskForm from '../components/tasks/TaskForm';

const PropertyTasksPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const numericPropertyId = Number(propertyId);

  const fetchData = async () => {
    if (isNaN(numericPropertyId)) {
        setError("Invalid Property ID.");
        setLoading(false);
        return;
    }
    try {
      setLoading(true);
      const propData = await getPropertyById(numericPropertyId);
      const taskData = await getTasksForProperty(numericPropertyId);
      setProperty(propData);
      setTasks(taskData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [propertyId]);

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };
  
  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = async (taskData: TaskCreationData | Task) => {
    try {
      if ('id' in taskData) {
        await updateTask(taskData as Task);
      } else {
        await createTask(taskData as TaskCreationData);
      }
      handleCloseModal();
      fetchData(); // Refresh list
    } catch (err) {
      setError("Failed to save task.");
    }
  };
  
  const handleDeleteTask = async (taskId: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
        try {
            await deleteTask(taskId);
            fetchData(); // Refresh list
        } catch (err) {
            setError("Failed to delete task.");
        }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div>
      <Link to="/" className="text-indigo-400 hover:text-indigo-300 mb-4 inline-block">&larr; Back to Dashboard</Link>
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold">{property.name}</h1>
        <p className="text-gray-400">{property.address}</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button onClick={handleOpenAddModal} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
          + Add Task
        </button>
      </div>

      <div className="space-y-4">
        {tasks.length > 0 ? tasks.map(task => (
            <div key={task.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                <div>
                    <p className="font-bold">{task.description}</p>
                    <p className="text-sm text-gray-400">
                        Type: {task.type} | Assigned to: {task.assignedPerson} | Status: <span className="font-semibold">{task.status}</span>
                    </p>
                </div>
                <div className="space-x-2">
                    <button onClick={() => handleOpenEditModal(task)} className="text-sm text-yellow-400 hover:text-yellow-300">Edit</button>
                    <button onClick={() => handleDeleteTask(task.id)} className="text-sm text-red-500 hover:text-red-400">Delete</button>
                </div>
            </div>
        )) : (
            <p className="text-gray-400">No tasks found for this property.</p>
        )}
      </div>

      {isModalOpen && (
        <TaskForm
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          propertyId={numericPropertyId}
          taskToEdit={editingTask}
        />
      )}
    </div>
  );
};

export default PropertyTasksPage;
