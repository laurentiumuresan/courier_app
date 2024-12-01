import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081', 
});

// Authentication
export const login = (email, password) => api.post('/couriers/login', { email, password });
export const register = (userData) => api.post('/couriers/register', userData);

// Packages
export const createPackage = (packageData) => api.post('/package/add-package', packageData);
export const getPackagesForCourier = (courierId) => api.get(`/package/courier/${courierId}`);
export const getUnassignedPackages = () => api.get('/package/unassigned');
export const assignPackage = (packageId, courierId) => api.put(`/package/${packageId}/assign`, { courierId });
export const deliverPackage = (packageId) => api.put(`/package/${packageId}/deliver`);
export const getPackageById = (packageId) => api.get(`/package/${packageId}`);
export const getCourierById = (courierId) => api.get(`/couriers/${courierId}`);
export const updatePackage = (packageId, packageData) => api.put(`/package/${packageId}`, packageData); 
export const updateCourier = (courierId, courierData) => api.put(`/couriers/${courierId}`, courierData); 
export const deletePackage = (packageId) => api.delete(`/package/${packageId}`);
export const deleteCourier = (courierId) => api.delete(`/couriers/${courierId}`);
export const getAllCouriers = () => api.get('/couriers');
export const getAllPackages = () => api.get('/package');
export const getPackagesByCourier = (courierId) => api.get(`/package/courier/${courierId}`);

//Custom
export const getCouriersWithoutPending = () => api.get('/couriers/withoutPending');
export const getManagersAndDeliveredCount = () => api.get('/couriers/managers/deliveredCount');
export const getAllManagersWithDeliveredPackages = () => api.get('/couriers/managers/getAllManagersWithDeliveredPackages');