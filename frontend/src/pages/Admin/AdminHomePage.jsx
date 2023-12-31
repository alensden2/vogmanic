/**
 * Admin Home Page Component
 *
 * This component represents the admin dashboard home page of the VogueManic website.
 * It displays an overview of various statistics such as total sales, items sold, and orders.
 * The component also provides sales insights, including average sale per order, average items per order,
 * and a predefined profit value.
 *
 * @returns {React Component} - The rendered admin home page component.
 */

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import React, { useEffect, useState } from 'react';
import AdminBar from '../../components/adminbar';
import Footer from '../../components/footer';
import { HOSTED_BASE_URL } from '../../../src/constants';

export default function AdminHomePage() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [totalSales, setTotalSales] = useState(null);
  const [totalItemsSold, setTotalItemsSold] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);
  const [averageSalePerOrder, setAverageSalePerOrder] = useState(null);
  const [averageItemsPerOrder, setAverageItemsPerOrder] = useState(null);
  const profit = 4500;
  /**
   * Toggles the Navbar
   *
   * Function to toggle the visibility of the admin navigation bar.
   */
  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  /**
   * Fetches Admin Dashboard Data
   *
   * This effect fetches various data related to the admin dashboard, such as total sales, total items sold,
   * and total orders. It uses the access token stored in local storage for authorization.
   */
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    fetch(`${HOSTED_BASE_URL}/admin/totalSaleAllOrders`, { headers })
      .then((response) => response.json())
      .then((data) => setTotalSales(data.totalSales))
      .catch((error) => console.error("Error fetching total sales:", error));
    fetch(`${HOSTED_BASE_URL}/admin/totalItemsSold`, { headers })
      .then((response) => response.json())
      .then((data) => setTotalItemsSold(data.totalItemsSold))
      .catch((error) => console.error("Error fetching total items sold:", error));
    fetch(`${HOSTED_BASE_URL}/admin/totalOrders`, { headers })
      .then((response) => response.json())
      .then((data) => setTotalOrders(data.TotalOrders))
      .catch((error) => console.error("Error fetching total orders:", error));
  }, []);

  /**
   * Calculate Average Sale and Items per Order
   *
   * This effect calculates and sets the average sale per order and average items per order based on
   * the fetched total sales, total items sold, and total orders. It performs the calculations only when
   * all required data is available and updates whenever any of the relevant data changes.
   */
  useEffect(() => {
    if (totalSales !== null && totalOrders !== null) {
      const avgSalePerOrder = totalSales / totalOrders;
      setAverageSalePerOrder(avgSalePerOrder.toFixed(2));
    }
    if (totalItemsSold !== null && totalOrders !== null) {
      const avgItemsPerOrder = totalItemsSold / totalOrders;
      setAverageItemsPerOrder(avgItemsPerOrder.toFixed(2));
    }
  }, [totalSales, totalItemsSold, totalOrders]);

  return (
    <div>
      <AdminBar isOpen={isNavbarOpen} onToggle={handleNavbarToggle} />
      <div style={styles.container}>
        <h2 style={styles.heading}>Overview</h2>

        <div style={styles.box1}>Welcome Admin!</div>

        <div style={styles.quicksightBox}>
          <div style={styles.quicksightText}>
            <h5>Quicksight</h5>
          </div>
        </div>
        <div style={styles.quickInfoContainer}>
          <div style={styles.quickInfoBox}>
            <MonetizationOnIcon style={styles.quickInfoIcon} />
            <div style={styles.quickInfoText}>
              {totalSales === null ? 'Total Sales: Loading...' : `$${totalSales}`}
            </div>
          </div>
          <div style={styles.quickInfoBox}>
            <ShoppingBagIcon style={styles.quickInfoIcon} />
            <div style={styles.quickInfoText}>
              {totalItemsSold === null ? 'Items Sold: Loading...' : `Items Sold: ${totalItemsSold}`}
            </div>
          </div>
          <div style={styles.quickInfoBox}>
            <LocalShippingIcon style={styles.quickInfoIcon} />
            <div style={styles.quickInfoText}>
              {totalOrders === null ? 'Total Orders: Loading...' : `Total Orders: ${totalOrders}`}
            </div>
          </div>
        </div>
        <div style={styles.quicksightBox}>
          <div style={styles.quicksightText}>
            <h5>Sales Insights</h5>
          </div>
        </div>
        <div style={styles.salesInsightsBox}>
          <div style={styles.salesInsightsContent}>
            <div style={styles.salesInsight}>
              <div>Average Sale per Order:</div>
              <div>{averageSalePerOrder === null ? 'Calculating...' : `$${averageSalePerOrder}`}</div>
            </div>
            <div style={styles.salesInsight}>
              <div>Average Items per Order:</div>
              <div>{averageItemsPerOrder === null ? 'Calculating...' : averageItemsPerOrder}</div>
            </div>
            <div style={styles.salesInsight}>
              <div>Profit:</div>
              <div>{`+$${profit}`}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/**
 * Styles for Admin Home Page
 *
 * This JavaScript object defines a set of styles used to structure and style
 * the components and sections of the Admin Home Page. It includes responsive design
 * considerations with media queries to ensure consistent and visually pleasing layout
 * across different screen sizes. The styles cover various elements such as headings,
 * boxes, quick info sections, sales insights, and more.
 *
 * @constant {Object} styles - An object containing styling rules for different components
 * and sections of the Admin Home Page.
 */
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
  quickInfoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    maxWidth: '1400px',
    marginTop: '20px',
    gap: '20px',
  },
  quickInfoBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  quickInfoIcon: {
    fontSize: '4rem',
  },
  quickInfoText: {
    marginTop: '10px',
    fontWeight: 'bold',
  },
  salesInsightsBox: {
    width: '90%',
    maxWidth: '1385px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    padding: '10px',
  },
  salesInsightsContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '8px',
    textAlign: 'center',
  },
  salesInsight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '5px 0',
  },

  '@media (max-width: 768px)': {
    quickInfoContainer: {
      flexDirection: 'column',
    },
    quickInfoBox: {
      width: '100%',
    },
  },

  '@media (max-width: 600px)': {
    container: {
      padding: '10px',
      marginTop: '20px',
    },
    heading: {
      fontSize: '28px',
      marginBottom: '10px',
    },
    box1: {
      height: '80px',
      fontSize: '20px',
    },
    quicksightBox: {
      height: '24px',
      fontSize: '20px',
      marginTop: '10px',
    },
    quicksightText: {
      fontSize: '20px',
    },
    quickInfoContainer: {
      flexDirection: 'column',
      gap: '10px',
    },
    quickInfoBox: {
      padding: '8px',
      fontSize: '18px',
    },
    quickInfoIcon: {
      fontSize: '3rem',
    },
    quickInfoText: {
      marginTop: '8px',
      fontSize: '16px',
    },
    salesInsightsBox: {
      padding: '5px',
      width: '100%',
    },
    salesInsight: {
      fontSize: '18px',
    },
  },
};
