import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPackages, deletePackage } from '../services/api'; // Make sure to import deletePackage

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await getAllPackages();
        setPackages(data);
      } catch (err) {
        setError('Failed to load packages.');
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(id); // Call delete API
        setPackages(packages.filter(pkg => pkg.id !== id)); // Update state to remove deleted package
      } catch (err) {
        setError('Failed to delete package.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Packages</h2>
      {error && <p style={styles.error}>{error}</p>}
      <ul style={styles.list}>
        {packages.map(pkg => (
          <li key={pkg.id} style={styles.item}>
            <span>{pkg.deliveryAddress}</span> {/* Display other package details as needed */}
            <div style={styles.actions}>
              <Link to={`/edit-package/${pkg.id}`} style={styles.editButton}>
                Edit
              </Link>
              <button onClick={() => handleDelete(pkg.id)} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Define your styles object here
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  item: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    gap: '10px', // Space between buttons
  },
  editButton: {
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: '#dc3545', // Red background for delete
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: '#e63946',
    fontSize: '14px',
  },
};

export default PackageList;
