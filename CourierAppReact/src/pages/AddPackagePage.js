import React, { useState } from 'react';
import { createPackage } from '../services/api'; // Ensure you import the createPackage function
import { useNavigate } from 'react-router-dom';

// AddPackageForm Component
const AddPackageForm = () => {
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const packageData = {
      deliveryAddress,
      payOnDelivery,
      status: 'NEW', // Set a default status
    };

    try {
      await createPackage(packageData); // Use createPackage to send the data to the API
      navigate('/packages'); // Redirect to All Packages page after successful submission
    } catch (err) {
      setError('Failed to add package. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Add New Package</h2>
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Delivery Address"
          required
          style={styles.input}
        />
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={payOnDelivery}
            onChange={(e) => setPayOnDelivery(e.target.checked)}
          />
          Pay on Delivery
        </label>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Adding Package...' : 'Add Package'}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

// AddPackagePage Component
const AddPackagePage = () => {
  return <AddPackageForm />;
};

// Define your styles object here
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    paddingTop: '10vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    background: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    margin: '10px 0',
    padding: '12px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    marginTop: '20px',
    width: '100%',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    marginTop: '15px',
    color: '#e63946',
    fontSize: '14px',
  },
};

export default AddPackagePage;
