import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPackages, deletePackage } from '../services/api';

function PackagesPage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const { data } = await getAllPackages();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    }
    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(id);
        setPackages(packages.filter(pkg => pkg.id !== id));
      } catch (error) {
        console.error('Error deleting package:', error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        All Packages
        <Link to="/add-package" style={styles.addButton}>Add Package</Link>
      </h2>
      {packages.length === 0 ? (
        <p style={styles.emptyMessage}>No packages available.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Created On</th>
              <th style={styles.th}>Courier ID</th>
              <th style={styles.th}>Delivery Address</th>
              <th style={styles.th}>Pay on Delivery</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} style={styles.tr}>
                <td style={styles.td}>{pkg.id}</td>
                <td style={styles.td}>{pkg.createdOn}</td>
                <td style={styles.td}>
                  {pkg.courier && pkg.courier.id ? pkg.courier.id : "No courier"}
                </td>
                <td style={styles.td}>{pkg.deliveryAddress}</td>
                <td style={styles.td}>{pkg.payOnDelivery ? 'Yes' : 'No'}</td>
                <td style={styles.td}>{pkg.status}</td>
                <td style={styles.td}>
                  <Link to={`/edit-package/${pkg.id}`} style={styles.editButton}>Edit</Link>
                  <button 
                    onClick={() => handleDelete(pkg.id)} 
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: '18px',
    color: '#888',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  th: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  tr: {
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  addButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#ffc107',
    color: 'black',
    borderRadius: '5px',
    textDecoration: 'none',
    marginRight: '10px',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default PackagesPage;
