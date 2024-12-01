import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPackagesByCourier } from '../services/api';

function CourierPackagesPage() {
  const { courierId } = useParams();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const { data } = await getPackagesByCourier(courierId);
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    }
    fetchPackages();
  }, [courierId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Packages for Courier ID: {courierId}</h2>
      {packages.length === 0 ? (
        <p style={styles.emptyMessage}>No packages found for this courier.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Package ID</th>
              <th style={styles.th}>Delivery Address</th>
              <th style={styles.th}>Pay on Delivery</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Created On</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} style={styles.tr}>
                <td style={styles.td}>{pkg.id}</td>
                <td style={styles.td}>{pkg.deliveryAddress}</td>
                <td style={styles.td}>{pkg.payOnDelivery ? 'Yes' : 'No'}</td>
                <td style={styles.td}>{pkg.status}</td>
                <td style={styles.td}>{new Date(pkg.createdOn).toLocaleString()}</td>
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
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
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
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  tr: {
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
};

export default CourierPackagesPage;
