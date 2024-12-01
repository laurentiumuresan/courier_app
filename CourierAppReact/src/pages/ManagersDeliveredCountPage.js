import React, { useEffect, useState } from 'react';
import { getManagersAndDeliveredCount } from '../services/api';

function ManagersDeliveredCountPage() {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getManagersAndDeliveredCount();
        setManagers(data);
      } catch (error) {
        console.error('Error fetching managers with delivered package count:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Managers and Delivered Package Count</h2>
      {managers.length === 0 ? (
        <p style={styles.emptyMessage}>No data on delivered packages found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Manager ID</th>
              <th style={styles.th}>Delivered Package Count</th>
            </tr>
          </thead>
          <tbody>
            {managers.map(([managerId, deliveredCount]) => (
              <tr key={managerId} style={styles.tr}>
                <td style={styles.td}>{managerId}</td>
                <td style={styles.td}>{deliveredCount}</td>
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

export default ManagersDeliveredCountPage;
