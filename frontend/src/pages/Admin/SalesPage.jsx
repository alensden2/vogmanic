import React, { useState, useEffect } from 'react';
import AdminBar from "../../components/adminbar";
import Footer from '../../components/footer';
import { Typography, Grid, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const samplePreorderSales = [
  {
    "orderId": "order123",
    "totalCost": 55.83
  },
  {
    "orderId": "order456",
    "totalCost": 16.49
  }
];

export default function SalesPage() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  // Calculate total order and total sales
  const totalOrder = samplePreorderSales.length;
  const totalSales = samplePreorderSales.reduce((total, sale) => total + sale.totalCost, 0);

  return (
    <div>
      <AdminBar isOpen={isNavbarOpen} onToggle={handleNavbarToggle} />
      <div style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Total Orders: {totalOrder}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Total Sales: ${totalSales.toFixed(2)}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Preorder Sales
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Total Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {samplePreorderSales.map(sale => (
              <TableRow key={sale.orderId}>
                <TableCell>{sale.orderId}</TableCell>
                <TableCell>${sale.totalCost.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Footer />
    </div>
  )
}
