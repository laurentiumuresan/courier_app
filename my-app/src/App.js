import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import UnassignedPackagesPage from './pages/UnassignedPackagesPage';
import CouriersPage from './pages/CouriersPage';
import PackagesPage from './pages/PackagesPage';
import Navigation from './components/Navigation';
import EditPackagePage from './pages/EditPackagePage';
import AddPackagePage from './pages/AddPackagePage';   
import EditCourierPage from './pages/EditCourierPage';


function App() {
 
  return (
      <Router>
        <div>
          <Navigation/>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/unassigned-packages" element={<UnassignedPackagesPage />} />
          <Route path="/couriers" element={<CouriersPage />} />
          <Route path="/add-package" element={<AddPackagePage />} />
          <Route path="/edit-package/:id" element={<EditPackagePage />} />
          <Route path="/edit-courier/:id" element={<EditCourierPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;
