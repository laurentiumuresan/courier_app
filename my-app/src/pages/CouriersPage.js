import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCouriers, deleteCourier } from '../services/api';

function CouriersPage() {
  const [couriers, setCouriers] = useState([]);

  useEffect(() => {
    async function fetchCouriers() {
      try {
        const { data } = await getAllCouriers();
        setCouriers(data);
      } catch (error) {
        console.error('Error fetching couriers:', error);
      }
    }
    fetchCouriers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this courier?')) {
      try {
        await deleteCourier(id);
        setCouriers(couriers.filter(courier => courier.id !== id));
      } catch (error) {
        console.error('Error deleting courier:', error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        All Couriers
        <Link to="/register" style={styles.addButton}>Add Courier</Link>
      </h2>
      {couriers.length === 0 ? (
        <p style={styles.emptyMessage}>No couriers available.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Manager ID</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {couriers.map((courier) => (
              <tr key={courier.id} style={styles.tr}>
                <td style={styles.td}>{courier.id}</td>
                <td style={styles.td}>{courier.name}</td>
                <td style={styles.td}>{courier.email}</td>
                <td style={styles.td}>
                  {courier.managerId ? courier.managerId : 'N/A'}
                </td>
                <td style={styles.td}>
                  <Link to={`/edit-courier/${courier.id}`} style={styles.editButton}>Edit</Link>
                  <button 
                    onClick={() => handleDelete(courier.id)} 
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

export default CouriersPage;
