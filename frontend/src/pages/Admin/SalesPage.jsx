import React from 'react';
import AdminBar from '../../components/adminbar';
import Footer from '../../components/footer';
import { Typography, Grid, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Money, LocalShipping } from '@mui/icons-material';

const samplePreorderSales = [
  {
    orderId: 'order123',
    totalCost: 55.83,
  },
  {
    orderId: 'order456',
    totalCost: 16.49,
  },
];

export default function SalesPage() {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const totalOrder = samplePreorderSales.length;
  const totalSales = samplePreorderSales.reduce((total, sale) => total + sale.totalCost, 0);

  return (
    <div>
      <AdminBar isOpen={isNavbarOpen} onToggle={handleNavbarToggle} />
      <div style={{ display: 'flex', marginTop: '70px', justifyContent: 'center' }}>
        <div style={{ width: '80%', maxWidth: '1200px' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
            <Typography variant="h4" gutterBottom>
              Preorder Sales
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
                {samplePreorderSales.map((sale) => (
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
                <Money style={{ marginRight: '10px', color: '#FF4081' }} />
                <Typography variant="h6" gutterBottom style={{ color: '#FF4081' }}>
                  Total Sales
                </Typography>
              </div>
              <Typography variant="h5" gutterBottom style={{ color: '#FF4081' }}>
                ${totalSales.toFixed(2)}
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
                {totalOrder}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
