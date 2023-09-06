/*
 * The `UserInfo` component displays and allows editing of the user's profile information and contact details.
 *
 * Core Functionality:
 * - Fetches user information from the backend and displays it in a presentational format.
 * - Provides an "Edit" button to enable users to update their profile details.
 * - Utilizes Material-UI components for responsive and visually appealing design.
 * - Supports editing and saving changes to the user's username, bio, email, primary and secondary addresses.
 *
 * Features:
 * - Presents a user's username and bio in a presentational format.
 * - Displays the user's contact information, including email and addresses.
 * - Enables users to initiate the editing of their profile information.
 * - Utilizes a dialog for editing user details with validation and save functionality.
 * - Communicates with the backend API to update and persist user information.
 *
 * Overall, the `UserInfo` component enhances the user experience by providing easy access to and management of profile information.
 */
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HOSTED_BASE_URL } from '../../constants';

/*
 * The `cardStyles` object defines the styling properties for the information cards displayed in the `ProductCard` component.
 *
 * Styling Properties:
 * - `marginBottom`: Adds vertical spacing between cards.
 * - `display`: Uses flex layout with a column direction to arrange card elements.
 * - `justifyContent`: Distributes space evenly between card content, creating space between the header, content, and actions.
 * - `background`: Sets the background color of the card to beige (#FFFFFF).
 * - `color`: Sets the text color to black (#000000).
 * - `width`: Ensures the card takes up the full width of the parent container on smaller screens.
 *
 * These styles contribute to a visually appealing and user-friendly card design.
 */
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
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPrimaryAddress, setEditPrimaryAddress] = useState('');
  const [editSecondaryAddress, setEditSecondaryAddress] = useState('');
  const [isDisabled, setIsDisabled] = useState(true); // Set initial state to disabled
  /*
  * The `useEffect` hook fetches user information from the backend API when the component mounts.
  *
  * Core Functionality:
  * - Retrieves the user's data including username, bio, email, addresses, etc.
  * - Makes an authenticated GET request to the backend using the access token from local storage.
  * - Updates the state variables with the fetched user information.
  *
  * Features:
  * - Enables dynamic rendering of user data for display in the component.
  * - Enhances user experience by providing personalized content based on fetched data.
  * - Handles potential errors during the data fetching process and logs them for debugging.
  *
  * Overall, the `useEffect` hook facilitates the retrieval and display of user information from the backend API.
  */
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${accessToken}` };
    axios
      .get(`${HOSTED_BASE_URL}/dashboard/`, { headers })
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
  /*
  * The `handleSaveUserInfo` function updates and saves user information to the backend API.
  *
  * Core Functionality:
  * - Handles the editing of user information fields and sets updated values based on the editingField.
  * - Makes an authenticated PUT request to the backend using the access token from local storage.
  * - Sends the updated user information, including username, bio, email, and addresses.
  * - Updates the state variables with the response data after successful API update.
  * - Reloads the window to reflect the updated information in the UI.
  *
  * Features:
  * - Provides a way for users to edit and save their profile details.
  * - Enables seamless communication with the backend to persist changes.
  * - Enhances user experience by reflecting updated information without the need for a full page refresh.
  * - Handles potential errors during the API request and logs them for debugging.
  *
  * Overall, the `handleSaveUserInfo` function enables users to update and save their profile information
  * by interacting with the UI, which triggers API requests and updates the UI accordingly.
  */
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
    axios.put(`${HOSTED_BASE_URL}/dashboard/`, userInfo, { headers })
      .then((response) => {
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