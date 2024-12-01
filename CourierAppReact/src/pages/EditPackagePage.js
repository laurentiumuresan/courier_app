import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPackageById, updatePackage, getAllCouriers } from '../services/api';

// EditPackageForm Component
const EditPackageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [courierId, setCourierId] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [createdOn, setCreatedOn] = useState('');
  const [couriers, setCouriers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const { data } = await getPackageById(id);
        if (data) {
          setDeliveryAddress(data.deliveryAddress);
          setPayOnDelivery(data.payOnDelivery);
          setCourierId(data.courier?.id || ''); 
          setStatus(data.status);
          setCreatedOn(data.createdOn || '');
        }
      } catch (err) {
        setError('Failed to load package details.');
      }
    };

    const fetchCouriers = async () => {
      try {
        const { data } = await getAllCouriers();
        setCouriers(data);
      } catch (err) {
        setError('Failed to load couriers.');
      }
    };

    fetchPackage();
    fetchCouriers();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const packageData = {
      id,
      deliveryAddress,
      payOnDelivery,
      courier: courierId ? { id: courierId } : null,
      createdOn,
      status,
    };

    try {
      await updatePackage(id, packageData);
      navigate('/packages');
    } catch (err) {
      setError('Failed to update package. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Edit Package</h2>
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
        
        <label style={styles.label}>
          Courier:
          <select
            value={courierId}
            onChange={(e) => setCourierId(e.target.value)}
            style={styles.select}
          >
            <option value="">No courier</option> {/* Set value as an empty string */}
            {couriers.map(courier => (
              <option key={courier.id} value={courier.id}>
                {courier.name}
              </option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={styles.select}
          >
            <option value="PENDING">Pending</option>
            <option value="DELIVERED">Delivered</option>
            <option value="SHIPPED">Shipped</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </label>

        <label style={styles.label}>
          Created On:
          <input
            type="datetime-local"
            value={createdOn ? new Date(createdOn).toISOString().slice(0, 16) : ''}
            onChange={(e) => setCreatedOn(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Updating Package...' : 'Update Package'}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

// EditPackagePage Component
const EditPackagePage = () => {
  return <EditPackageForm />;
};

// Define styles object
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
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
  select: {
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
  label: {
    marginBottom: '10px',
    width: '100%',
    fontSize: '16px',
    color: '#333',
  },
};

export default EditPackagePage;
