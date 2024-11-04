import React from 'react';
import logo1 from '../assets/logo4.png';
import logo2 from '../assets/logo3.png';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.photoRow}>
        <div style={styles.photoCard}>
          <img src={logo1} alt="Description of logo 1" style={styles.photo} />
        </div>
        <div style={styles.textCard}>
          <h2 style={styles.heading}>SlothShip: Slow & Steady</h2>
          <p style={styles.caption}>
            SlothShip is a different kind of delivery company. We believe in quality over speed,
            taking the time to ensure your package arrives safely and with care. Our sloth couriers
            move at their own pace, savoring the journey to any destination, no matter how far.
          </p>
          <p style={styles.caption}>
            When speed isn’t a priority, SlothShip is here. Our sloths are dedicated to the art of
            slow delivery, bringing a sense of calm to the logistics world. We take the scenic route
            to any location, ensuring each package gets there… eventually.
          </p>
        </div>
      </div>

      <div style={styles.photoRow}>
        <div style={styles.textCard}>
          <h2 style={styles.heading}>SlothShip: Relax and Ship</h2>
          <p style={styles.caption}>
            At SlothShip, we know life’s about the journey, not the destination. With our famously
            laid-back sloth team, your package will arrive when it’s ready, creating an experience
            that’s as relaxed as it is reliable. We may be slow, but we always get there!
          </p>
          <p style={styles.caption}>
            SlothShip is redefining the delivery industry with our unique, unhurried approach. Our
            slogan may be slow, but our sloth team is steady, reliable, and committed to bringing
            your package anywhere, at a pace that lets them truly enjoy the trip.
          </p>
        </div>
        <div style={styles.photoCard}>
          <img src={logo2} alt="Description of logo 2" style={styles.photo} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    fontFamily: "'Arial', sans-serif",
  },
  photoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    marginTop: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap', // Enables stacking on smaller screens
  },
  photoCard: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
  },
  textCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px',
  },
  photo: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  caption: {
    fontSize: '16px',
    color: '#555',
    textAlign: 'center',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
};

export default HomePage;
