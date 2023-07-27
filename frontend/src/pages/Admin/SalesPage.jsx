import { LocalShipping } from '@mui/icons-material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminBar from '../../components/adminbar';
import Footer from '../../components/footer';

export default function SalesPage() {
  // State variables to manage the state of the component
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [totalSales, setTotalSales] = useState(null);
  const [totalOrder, setTotalOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  // Event handler to toggle the navbar
  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  // Fetch data from the server on component mount using useEffect

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };

    fetch('https://voguemanic-be.onrender.com/admin/totalSaleAllOrders', { headers })
      .then((response) => response.json())
      .then((data) => setTotalSales(parseFloat(data.totalSales).toFixed(2)))
      .catch((error) => console.error('Error fetching total sales:', error));

    fetch('https://voguemanic-be.onrender.com/admin/totalOrders', { headers })
      .then((response) => response.json())
      .then((data) => setTotalOrder(data.TotalOrders))
      .catch((error) => console.error('Error fetching total orders:', error));

    fetch('https://voguemanic-be.onrender.com/admin/totalSalePerOrders', { headers })
      .then((response) => response.json())
      .then((data) => setOrderDetails(data))
      .catch((error) => console.error('Error fetching order details:', error));
  }, []);

  // Return the JSX for rendering the SalesPage component

  return (
    <div>
      <AdminBar isOpen={isNavbarOpen} onToggle={handleNavbarToggle} />
      <div style={{ display: 'flex', marginTop: '70px', justifyContent: 'center' }}>
        <div style={{ width: '80%', maxWidth: '1200px' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
            <Typography variant="h4" gutterBottom>
              Per Order Sales
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">Order ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Total Cost</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetails.map((sale) => (
                  <TableRow key={sale.orderId}>
                    <TableCell>
                      <Typography variant="body1">{sale.orderId}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">${sale.totalCost.toFixed(2)}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#f8f8f8' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <MonetizationOnIcon style={{ marginRight: '10px', color: '#FF4081' }} />
                <Typography variant="h6" gutterBottom style={{ color: '#FF4081' }}>
                  Total Sales
                </Typography>
              </div>
              <Typography variant="h5" gutterBottom style={{ color: '#FF4081' }}>
                {totalSales === null ? 'Loading...' : `$${totalSales}`}
              </Typography>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <LocalShipping style={{ marginRight: '10px', color: '#FF4081' }} />
                <Typography variant="h6" gutterBottom style={{ color: '#FF4081' }}>
                  Total Orders
                </Typography>
              </div>
              <Typography variant="h5" gutterBottom style={{ color: '#FF4081' }}>
                {totalOrder === null ? 'Loading...' : totalOrder}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
