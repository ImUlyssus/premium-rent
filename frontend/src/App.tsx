import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import PropertyTasksPage from './pages/PropertyTasksPage';

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">NOSBAAN</h1>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Router>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/properties/:propertyId/tasks" element={<PropertyTasksPage />} />
            </Routes>
          </Router>
        </div>
      </main>
    </div>
  );
}

export default App;
