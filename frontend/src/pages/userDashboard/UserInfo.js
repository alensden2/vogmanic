import React, { useState } from 'react';
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
  // Replace these with actual user data
  const [username, setUsername] = useState('JohnDoe');
  const [bio, setBio] = useState(
    'I love coding and traveling! I am a fashion enthusiast. I love dressing up. I have a lot of fashion interests'
  );
  const [email, setEmail] = useState('john.doe@example.com');
  const [primaryAddress, setPrimaryAddress] = useState('123 Main St');
  const [secondaryAddress, setSecondaryAddress] = useState('Apt 456');
  const [otherAddresses, setOtherAddresses] = useState(['789 Side Rd', '987 Back St']);

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
    </div>
  );
};

export default UserInfo;
