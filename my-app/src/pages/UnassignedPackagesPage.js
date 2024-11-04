import React, { useEffect, useState } from 'react';
import { getUnassignedPackages, assignPackage } from '../services/api';
import PackageList from '../components/PackageList';

function UnassignedPackagesPage() {
  const [user, setUser] = useState(null); // Set initial user state
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Retrieve user data from localStorage or another source
    const storedUser = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage
    if (storedUser) {
      setUser(storedUser);
    }

    async function fetchPackages() {
      const { data } = await getUnassignedPackages();
      setPackages(data);
    }

    fetchPackages();
  }, []);

  const handleAssign = async (packageId) => {
    if (!user) return; // Ensure user is available before assigning
    await assignPackage(packageId, user.id);
    setPackages(packages.filter(pkg => pkg.id !== packageId)); // Remove assigned package from the list
  };

  if (!user) return <p>Loading user data...</p>; // Render loading message if user data is not available

  return (
    <div>
      <h2>Unassigned Packages</h2>
      <PackageList packages={packages} onAssign={handleAssign} />
    </div>
  );
}

export default UnassignedPackagesPage;

/*import React, { useEffect, useState } from 'react';
import { getPackagesForCourier, deliverPackage } from '../services/api';
import PackageList from '../components/PackageList';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import logo1 from '../assets/logo1.jpeg'; 

function HomePage() {
 const [user, setUser] = useState(null);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }

    async function fetchPackages() {
      if (storedUser) {
        const { data } = await getPackagesForCourier(storedUser.id);
        setPackages(data);
      }
    }

    fetchPackages();
  }, []);

  const handleDeliver = async (packageId) => {
    await deliverPackage(packageId);
    setPackages(packages.map(pkg => (pkg.id === packageId ? { ...pkg, status: 'DELIVERED' } : pkg)));
  };

  if (!user) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.container}>
      <Navigation />
      <div style={styles.logoContainer}>
        <img src={logo1} alt="Company Logo" style={styles.logo} />
      </div>
      <h1 style={styles.welcome}>Welcome, {user.name}</h1>
      <h2 style={styles.subtitle}>Your Packages</h2>
      <PackageList packages={packages} onDeliver={handleDeliver} />
      <div style={styles.linkContainer}>
        <Link to="/unassigned-packages" style={styles.link}>View Unassigned Packages</Link> 
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  logo: {
    width: '150px',
    height: 'auto',
  },
  welcome: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#555',
    marginBottom: '20px',
    textAlign: 'center',
  },
  loading: {
    fontSize: '18px',
    color: '#888',
    textAlign: 'center',
    marginTop: '50px',
  },
  linkContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  link: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
};

export default HomePage;
*/