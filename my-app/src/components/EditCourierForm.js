import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourierById, updateCourier, getAllCouriers } from '../services/api';

const EditCourierForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [managerId, setManagerId] = useState(null); // Initially set to null
  const [couriers, setCouriers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the courier being edited
    const fetchCourier = async () => {
      try {
        const { data } = await getCourierById(id);
        if (data) {
          setName(data.name || '');
          setEmail(data.email || '');
          setManagerId(data.manager_id || null); // Initialize managerId to existing value or null
        }
      } catch (err) {
        setError('Failed to load courier details.');
        console.error("Fetch error:", err);
      }
    };

    // Fetch all couriers for the manager selection dropdown
    const fetchCouriers = async () => {
      try {
        const { data } = await getAllCouriers();
        setCouriers(data);
      } catch (err) {
        setError('Failed to load couriers.');
      }
    };

    fetchCourier();
    fetchCouriers();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Ensure that managerId is correctly set to null if no manager is selected
    const courierData = {
      id,
      name,
      email,
      managerId: managerId || null, // Nullify managerId if not selected
    };

    try {
      await updateCourier(id, courierData);
      navigate('/couriers');
    } catch (err) {
      setError('Failed to update courier. Please try again.');
      console.error("Update error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Edit Courier</h2>

        <label style={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Manager:
          <select
            value={managerId || ''} // Use empty string if managerId is null
            onChange={(e) => setManagerId(e.target.value === '' ? null : e.target.value)} // Set managerId to null if 'No manager' is selected
            style={styles.select}
          >
            <option value="">No manager</option> {/* Option for null manager */}
            {couriers
              .filter(courier => String(courier.id) !== String(id)) // Exclude the current courier from being its own manager
              .map(courier => (
                <option key={courier.id} value={courier.id}>
                  {courier.name}
                </option>
              ))}
          </select>
        </label>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Updating Courier...' : 'Update Courier'}
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};



// Define your styles object here
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',  // Center vertically
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
    textAlign: 'center', // Center title text
  },
  label: {
    width: '100%',
    marginBottom: '10px',
    fontSize: '16px',
    color: '#333',
    textAlign: 'left', // Align labels to the left within the centered form
  },
  select: {
    margin: '10px 0',
    padding: '12px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  input: {
    marginTop: '5px',
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

export default EditCourierForm;
