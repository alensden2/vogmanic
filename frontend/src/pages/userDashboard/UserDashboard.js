import React from 'react';
import { Grid, Paper, Container } from '@mui/material';
import UserInfo from './UserInfo';
import AccessPanel from './AccessPanel';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const UserDashboard = () => {
  return (
    <>
      <Navbar/>
      <Container maxWidth="lg" style={{ marginTop: '64px' }}>
        <Grid container spacing={2}>
          {/* UserInfo Grid */}
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', background: 'black' }}>
              <UserInfo />
            </Paper>
          </Grid>

          {/* AccessPanel Grid */}
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: 16, height:'100%', background: 'black' }}>
              <AccessPanel />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Footer/>
    </>
  );
};

export default UserDashboard;
