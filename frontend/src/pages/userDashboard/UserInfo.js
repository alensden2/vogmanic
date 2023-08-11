import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const EditableText = ({ label, value }) => {
  return (
    <div>
      {label === 'Username' ? (
        <Typography variant="h3" style={{ color: 'black' }}>
          {value}
        </Typography>
      ) : (
        <Typography variant="body1" style={{ color: 'black' }}>
          {value}
        </Typography>
      )}
    </div>
  );
};

const UserInfo = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [primaryAddress, setPrimaryAddress] = useState('');
  const [secondaryAddress, setSecondaryAddress] = useState('');
  const [otherAddresses, setOtherAddresses] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [editing, setEditing] = useState(false);

  // Separate state variables for editing values
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPrimaryAddress, setEditPrimaryAddress] = useState('');
  const [editSecondaryAddress, setEditSecondaryAddress] = useState('');
  const [isDisabled, setIsDisabled] = useState(true); // Set initial state to disabled
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${accessToken}` };
    axios
      .get('https://voguemanic-be.onrender.com/dashboard/', { headers })
      .then((response) => {
        const { username, bio, email, primaryAddress, secondaryAddress, otherAddresses } = response.data;
        setUsername(username);
        setBio(bio);
        setEmail(email);
        setPrimaryAddress(primaryAddress);
        setSecondaryAddress(secondaryAddress);
        setOtherAddresses([...otherAddresses]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSaveUserInfo = () => {
    switch (editingField) {
      case 'username':
        setUsername(editUsername);
        break;
      case 'bio':
        setBio(editBio);
        break;
      case 'email':
        setEmail(editEmail);
        break;
      case 'primaryAddress':
        setPrimaryAddress(editPrimaryAddress);
        break;
      case 'secondaryAddress':
        setSecondaryAddress(editSecondaryAddress);
        break;
      default:
        break;
    }
    setEditing(false);

    // saving to the MongoDB
    const accessToken = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };
    const userInfo = {
      username: username,
      email: email,
      bio: editBio,
      primaryAddress: editPrimaryAddress,
      secondaryAddress: editSecondaryAddress,
      otherAddresses,
    };
    console.log(userInfo);
    axios.put('https://voguemanic-be.onrender.com/dashboard/', userInfo, { headers })
      .then((response) => {
        console.log(response.data);
        setBio(response.data.bio);
        setPrimaryAddress(response.data.primaryAddress);
      setSecondaryAddress(response.data.secondaryAddress);
      window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ backgroundColor: 'beige', padding: '20px' }}>
      <Card marginBottom="5">
        <CardHeader title={<EditableText label="Username" value={username} />} />
        <CardContent>
          <EditableText label="Bio" value={bio} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h4">Contact Information:</Typography>
          <Typography variant="h6">Email:</Typography>
          <EditableText label="Email" value={email} />
          <Typography variant="h6">Primary Address:</Typography>
          <EditableText label="Primary Address" value={primaryAddress} />
          <Typography variant="h6">Secondary Address:</Typography>
          <EditableText label="Secondary Address" value={secondaryAddress} />
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditing(true);
          setEditingField('all');
          setEditUsername(username);
          setEditBio(bio);
          setEditEmail(email);
          setEditPrimaryAddress(primaryAddress);
          setEditSecondaryAddress(secondaryAddress);
        }}
        style={{ backgroundColor: 'black', color: 'white', marginTop: '20px' }}
      >
        Edit
      </Button>

      <Dialog open={editing} onClose={() => setEditing(false)}>
        <DialogTitle>Edit User Information</DialogTitle>
        <DialogContent sx={{ padding: '1.5rem', minWidth: '300px' }}>
          {editingField === 'all' && (
            <>
              <TextField
                fullWidth
                label="Username"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                InputLabelProps={{ shrink: true }}
                disabled={isDisabled}
              />
              <TextField
                fullWidth
                label="Bio"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                sx={{ marginBottom: '1rem' }}
              />
              <TextField
                fullWidth
                label="Email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                sx={{ marginBottom: '1rem' }}
                disabled={isDisabled}
              />
              <TextField
                fullWidth
                label="Primary Address"
                value={editPrimaryAddress}
                onChange={(e) => setEditPrimaryAddress(e.target.value)}
                sx={{ marginBottom: '1rem' }}
              />
              <TextField
                fullWidth
                label="Secondary Address"
                value={editSecondaryAddress}
                onChange={(e) => setEditSecondaryAddress(e.target.value)}
                sx={{ marginBottom: '1rem' }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveUserInfo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserInfo;