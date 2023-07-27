import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, CardHeader, Button, TextField } from '@mui/material';
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
            <Button variant="contained" color="primary" onClick={handleSaveClick} style={{ backgroundColor: 'black', color: 'white' }}>
              Save
            </Button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {label === 'Username' ? (
            <Typography variant="h3" style={{ marginRight: '8px', color: 'black' }}>
              {value}
            </Typography>
          ) : (
            <Typography variant="body1" style={{ marginRight: '8px', color: 'black' }}>
              {value}
            </Typography>
          )}
          {editable && (
            <Button onClick={handleEditClick} variant="outlined" style={{ color: 'black' }}>
              <EditIcon />
              Edit
            </Button>
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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };
    axios.get('https://voguemanic-be.onrender.com/dashboard/', { headers }) // Replace this URL with your backend URL
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

  const saveUserInfo = () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };
    const userInfo = {
      username,
      email,
      bio,
      primaryAddress,
      secondaryAddress,
      otherAddresses,
    };

    axios.put('https://voguemanic-be.onrender.com/dashboard/', userInfo, { headers }) // Replace this URL with your backend URL
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ backgroundColor: 'beige', padding: '20px' }}>
      <Card marginBottom="5">
        <CardHeader title={<EditableText label="Username" value={username} onSave={handleSaveUsername} editable={false} />} />
        <CardContent>
          <EditableText label="Bio" value={bio} onSave={handleSaveBio} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h4">Contact Information:</Typography>
          <Typography variant="h6">Email:</Typography>
          <EditableText label="Email" value={email} onSave={handleSaveEmail} editable={false} />
          <Typography variant="h6">Primary Address:</Typography>
          <EditableText label="Primary Address" value={primaryAddress} onSave={handleSavePrimaryAddress} />
          <Typography variant="h6">Secondary Address:</Typography>
          <EditableText label="Secondary Address" value={secondaryAddress} onSave={handleSaveSecondaryAddress} />
        </CardContent>
      </Card>
      <Button variant="contained" color="primary" onClick={saveUserInfo} style={{ backgroundColor: 'black', color: 'white', marginTop: '20px' }}>
        Save All
      </Button>
    </div>
  );
};

export default UserInfo;
