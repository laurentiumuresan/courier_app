import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CouriersPage from './pages/CouriersPage';
import PackagesPage from './pages/PackagesPage';
import Navigation from './components/Navigation';
import EditPackagePage from './pages/EditPackagePage';
import AddPackagePage from './pages/AddPackagePage';   
import EditCourierPage from './pages/EditCourierPage';
import CouriersWithoutPendingPage from './pages/CouriersWithoutPendingPage';
import ManagersDeliveredCountPage from './pages/ManagersDeliveredCountPage';
import ManagersWithDeliveredPackagesPage from './pages/ManagersWithDeliveredPackagesPage';
import CourierPackagesPage from './pages/CourierPackagesPage';

function App() {
 
  return (
      <Router>
        <div>
          <Navigation/>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/couriers" element={<CouriersPage />} />
          <Route path="/add-package" element={<AddPackagePage />} />
          <Route path="/edit-package/:id" element={<EditPackagePage />} />
          <Route path="/edit-courier/:id" element={<EditCourierPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/couriers/withoutPending" element={<CouriersWithoutPendingPage />} />
          <Route path="/couriers/managers/deliveredCount" element={<ManagersDeliveredCountPage />} />
          <Route path="/couriers/managers/deliveredPackages" element={<ManagersWithDeliveredPackagesPage />} />
          <Route path="/courier/:courierId/packages" element={<CourierPackagesPage />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;
