import React, { useState } from 'react';
import AdminBar from '../../components/adminbar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Footer from '../../components/footer';

export default function AdminHomePage() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div>
      <AdminBar isOpen={isNavbarOpen} onToggle={handleNavbarToggle} />

      <div style={styles.container}>
        <h2 style={styles.heading}>Overview</h2>

        <div style={styles.box1}>
          Welcome Admin!
        </div>

        <div style={styles.quicksightBox}>
          <div style={styles.quicksightText}>
            <h5>Quicksight</h5> 
          </div>
        </div>

        <div style={styles.box2}>
          <div style={styles.iconWrapper}>
            <MonetizationOnIcon style={{ fontSize: '66px' }} />
            <div style={styles.iconLabel}>Total Sales:</div>
          </div>

          <div style={styles.iconWrapper}>
            <ShoppingBagIcon style={{ fontSize: '66px' }} />
            <div style={styles.iconLabel}>Items Sold</div>
          </div>

          <div style={styles.iconWrapper}>
            <LocalShippingIcon style={{ fontSize: '66px' }} />
            <div style={styles.iconLabel}>Total Orders</div>
          </div>
        </div>

        <div style={styles.quicksightBox}>
          <div style={styles.quicksightText}>
            <h5>Sales Insights</h5>
          </div>
        </div>

        <div style={styles.box3}>
          Profit: +$4,500
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    marginTop: '70px',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '32px',
    marginBottom: '20px',
  },
  box1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    maxWidth: '1400px',
    height: '100px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '24px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  quicksightBox: {
    width: '90%',
    maxWidth: '1400px',
    height: '30px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'black',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    textAlign: 'left',
  },
  quicksightText: {
    padding: '0 10px',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  box2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    maxWidth: '1400px',
    height: '100px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '24px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    padding: '2px',
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  iconLabel: {
    marginTop: '10px',
    fontWeight: 'bold',
  },
  box3: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    maxWidth: '1400px',
    height: '140px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '24px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    padding: '2px',
  },
};
