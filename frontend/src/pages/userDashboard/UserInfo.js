import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, CardHeader, IconButton, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const EditableText = ({ label, value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onSave(editedValue);
    setEditing(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {editing ? (
        <div>
          <TextField fullWidth label={label} value={editedValue} onChange={(e) => setEditedValue(e.target.value)} />
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Save
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {label === 'Username' ? (
            <Typography variant="h3" style={{ marginRight: '8px' }}>
              {value}
            </Typography>
          ) : (
            <Typography variant="body1" style={{ marginRight: '8px' }}>
              {value}
            </Typography>
          )}
          <IconButton onClick={handleEditClick} aria-label="edit" style={{ padding: '4px' }}>
            <EditIcon />
          </IconButton>
        </div>
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

  useEffect(() => {
    axios.get('http://localhost:6001/dashboard') // Replace this URL with your backend URL
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

  const handleSaveUsername = (value) => {
    setUsername(value);
  };

  const handleSaveBio = (value) => {
    setBio(value);
  };

  const handleSaveEmail = (value) => {
    setEmail(value);
  };

  const handleSavePrimaryAddress = (value) => {
    setPrimaryAddress(value);
  };

  const handleSaveSecondaryAddress = (value) => {
    setSecondaryAddress(value);
  };

  const handleSaveOtherAddresses = (values) => {
    setOtherAddresses(values);
  };

  const saveUserInfo = () => {
    const userInfo = {
      username,
      bio,
      email,
      primaryAddress,
      secondaryAddress,
      otherAddresses,
    };

    axios.put('/api/user-dashboard', userInfo) // Replace this URL with your backend URL
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Card marginBottom="5">
        <CardHeader title={<EditableText label="Username" value={username} onSave={handleSaveUsername} />} />
        <CardContent>
          <EditableText label="Bio" value={bio} onSave={handleSaveBio} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h4">Contact Information:</Typography>
          <Typography variant="h6">Email:</Typography>
          <EditableText label="Email" value={email} onSave={handleSaveEmail} />
          <Typography variant="h6">Primary Address:</Typography>
          <EditableText label="Primary Address" value={primaryAddress} onSave={handleSavePrimaryAddress} />
          <Typography variant="h6">Secondary Address:</Typography>
          <EditableText label="Secondary Address" value={secondaryAddress} onSave={handleSaveSecondaryAddress} />
          <Typography variant="h6">Other Addresses:</Typography>
          {otherAddresses.map((address, index) => (
            <EditableText
              label={`Address ${index + 1}`}
              value={address}
              onSave={(value) => {
                const updatedAddresses = [...otherAddresses];
                updatedAddresses[index] = value;
                handleSaveOtherAddresses(updatedAddresses);
              }}
              key={index}
            />
          ))}
        </CardContent>
      </Card>
      <Button variant="contained" color="primary" onClick={saveUserInfo}>
        Save All
      </Button>
    </div>
  );
};

export default UserInfo;
