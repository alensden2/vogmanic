import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, CardHeader, IconButton, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const EditableText = ({ label, value, onSave, editable = true }) => {
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
          <TextField
            fullWidth
            label={label}
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
          />
          {editable && (
            <Button variant="contained" color="primary" onClick={handleSaveClick}>
              Save
            </Button>
          )}
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
          {editable && (
            <IconButton onClick={handleEditClick} aria-label="edit" style={{ padding: '4px' }}>
              <EditIcon />
            </IconButton>
          )}
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
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:6001/dashboard/') // Replace this URL with your backend URL
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

  const handleSaveBio = (value) => {
    setBio(value);
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

  const handleAddAddress = () => {
    setOtherAddresses([...otherAddresses, newAddress]);
    setNewAddress('');
  };

  return (
    <div>
      <Card marginBottom="5">
        <CardHeader title={<EditableText label="Username" value={username} editable={false} />} />
        <CardContent>
          <EditableText label="Bio" value={bio} onSave={handleSaveBio} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h4">Contact Information:</Typography>
          <Typography variant="h6">Email:</Typography>
          <EditableText label="Email" value={email} editable={false} />
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

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField label="New Address" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
            <Button variant="contained" color="primary" onClick={handleAddAddress}>
              Add Address
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInfo;
