// src/pages/ManagersWithDeliveredPackagesPage.js

import React, { useEffect, useState } from 'react';
import { getAllManagersWithDeliveredPackages } from '../services/api';

function ManagersWithDeliveredPackagesPage() {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getAllManagersWithDeliveredPackages();
        setManagers(data);
      } catch (error) {
        console.error('Error fetching managers with delivered packages:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Managers with Delivered Packages</h2>
      {managers.length === 0 ? (
        <p style={styles.emptyMessage}>No managers with delivered packages found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Manager ID</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager.id} style={styles.tr}>
                <td style={styles.td}>{manager.id}</td>
                <td style={styles.td}>{manager.name}</td>
                <td style={styles.td}>{manager.email}</td>
                <td style={styles.td}>{manager.managerId || 'N/A'}</td>
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
        maxWidth: '800px',
        margin: 'auto',
        marginTop: '20px',
      },
      title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center',
      },
      emptyMessage: {
        fontSize: '18px',
        color: '#888',
        textAlign: 'center',
        margin: '20px 0',
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
  
};

export default ManagersWithDeliveredPackagesPage;
