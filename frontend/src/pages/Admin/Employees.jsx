import React, { useState } from "react";
import AdminBar from "../../components/adminbar";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import Footer from "../../components/footer";

const sampleEmployees = [
  {
    "_id": "64b8a036f57ecaaeee634fa1",
    "firstName": "Jane",
    "lastName": "Smith",
    "address": "456 Elm Street",
    "email": "jane.smith@example.com",
    "phone": "987-654-3210",
    "employeeId": "EMP002",
    "createdAt": "2023-07-20T02:47:18.994Z",
    "updatedAt": "2023-07-20T02:47:18.994Z",
    "__v": 0
  },
  {
    "_id": "64b8a05bf57ecaaeee634fa4",
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main Street",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "employeeId": "EMP001",
    "createdAt": "2023-07-20T02:47:55.933Z",
    "updatedAt": "2023-07-20T02:47:55.933Z",
    "__v": 0
  },
  {
    "_id": "64b8a063f57ecaaeee634fa6",
    "firstName": "Michael",
    "lastName": "Johnson",
    "address": "789 Oak Avenue",
    "email": "michael.johnson@example.com",
    "phone": "555-123-4567",
    "employeeId": "EMP003",
    "createdAt": "2023-07-20T02:48:03.042Z",
    "updatedAt": "2023-07-20T02:48:03.042Z",
    "__v": 0
  },
  {
    "_id": "64b8a069f57ecaaeee634fa8",
    "firstName": "Emily",
    "lastName": "Williams",
    "address": "321 Maple Lane",
    "email": "emily.williams@example.com",
    "phone": "888-999-7777",
    "employeeId": "EMP004",
    "createdAt": "2023-07-20T02:48:09.843Z",
    "updatedAt": "2023-07-20T02:48:09.843Z",
    "__v": 0
  }
];

const Employees = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleAddClick = () => {
    setIsAddDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
    setNewEmployee({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleAddEmployee = () => {
    console.log("Adding employee:", newEmployee);
    handleDialogClose();
  };

  const handleDeleteEmployee = (employeeId) => {
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <AdminBar isOpen={isNavbarOpen} onToggle={handleNavbarToggle} />
      <div style={{ padding: "20px" }}>
        <IconButton color="primary" aria-label="add employee" onClick={handleAddClick} style={{ float: "right" }}>
          <AddIcon />
        </IconButton>

        <Typography sx={{ padding: '5px' }} variant="h5" gutterBottom>
          Employee List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleEmployees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.address}</TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      aria-label="delete employee"
                      onClick={() => handleDeleteEmployee(employee._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog open={isAddDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={newEmployee.firstName}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={newEmployee.lastName}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={newEmployee.email}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={newEmployee.phone}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={newEmployee.address}
            onChange={handleInputChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddEmployee} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Employees;
