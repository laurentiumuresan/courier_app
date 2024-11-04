import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png'; // Adjust the path as necessary

function Navigation() {
  return (
    <nav style={styles.nav}>
      <Link to="/home"> {/* Make the logo clickable */}
        <img src={logo} alt="Logo" style={styles.logo} />
      </Link>
      <div style={styles.rightLinks}> {/* Use rightLinks for the links */}
        <Link to="/couriers" style={styles.link}>Couriers</Link>
        <Link to="/packages" style={styles.link}>Packages</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between', // Space between logo and links
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: '15px 20px',
    borderRadius: '5px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    width: '50px', // Adjust the size as needed
    height: 'auto',
    marginRight: '20px', // Space between logo and links
    cursor: 'pointer', // Visual feedback for interactivity
  },
  rightLinks: { // Right aligned links
    display: 'flex',
    alignItems: 'center', // Align links vertically center
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    margin: '0 10px',
    transition: 'background-color 0.3s, transform 0.2s',
  },
};

export default Navigation;
