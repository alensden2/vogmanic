/*
 * The `UserDashboard` component serves as the user's personalized dashboard, providing access to user-related information and actions.
 *
 * Core Functionality:
 * - Displays user information and account details in the `UserInfo` component.
 * - Presents quick links and actions tailored for the user in the `AccessPanel` component.
 *
 * Features:
 * - Utilizes Material-UI's responsive grid system for a visually appealing layout.
 * - Integrates `Navbar` and `Footer` components to ensure consistent navigation and branding.
 * - Enhances user experience by organizing relevant information and actions within a single view.
 *
 * Overall, the `UserDashboard` component offers a centralized hub for users to manage their account, view personalized content, and interact with key features.
 */
import React from 'react';
import { Grid, Paper, Container } from '@mui/material';
import UserInfo from './UserInfo';
import AccessPanel from './AccessPanel';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: '64px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', background: 'black' }}>
              <UserInfo />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: 16, height: '100%', background: 'black' }}>
              <AccessPanel />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default UserDashboard;