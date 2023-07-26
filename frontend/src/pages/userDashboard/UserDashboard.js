import React from 'react';
import { Grid, Paper, Typography, AppBar, Toolbar, Container } from '@mui/material';
import UserInfo from './components/UserInfo';
import AccessPanel from './components/AccessPanel';

const UserDashboard = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">User Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '10px' }}>
        <Grid container spacing={2}>
          {/* UserInfo Grid */}
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', background: '#F5F5F5' }}>
              <UserInfo />
            </Paper>
          </Grid>

          {/* AccessPanel Grid */}
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: 16, height:'100%', background: '#F5F5F5' }}>
              <AccessPanel />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <footer style={{ background: '#f5f5f5', padding: 16, textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
        <Typography variant="body2">© {new Date().getFullYear()} Your Company Name. All rights reserved.</Typography>
      </footer>
    </>
  );
};

export default UserDashboard;
