import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminBar from "../../components/adminbar";
import Footer from "../../components/footer";

// Custom dialog component for displaying messages
const DialogBox = ({ isOpen, onClose, title, content }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

// Custom dialog component for displaying success message after employee deletion
const SuccessDeleteDialogBox = ({ isOpen, onClose, employeeName }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{`Employee ${employeeName} is successfully deleted`}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

const Employees = () => {
  // State variables to manage component behavior
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    employeeNo: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailErrorOpen, setIsEmailErrorOpen] = useState(false);
  const [isPhoneErrorOpen, setIsPhoneErrorOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isFailureOpen, setIsFailureOpen] = useState(false);
  const [isSuccessDeleteOpen, setIsSuccessDeleteOpen] = useState(false);
  const [deletedEmployeeName, setDeletedEmployeeName] = useState("");

  // Helper functions to validate email and phone inputs using regular expressions
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(phone);
  };
  // Fetch employees data from the server on component mount
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };

    axios
      .get("https://voguemanic-be.onrender.com/admin/employees", { headers })
      .then((response) => {
        setEmployees(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setIsLoading(false);
      });
  }, []);
  // Event handler to toggle the navbar
  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  // Event handler to open the add employee dialog
  const handleAddClick = () => {
    setIsAddDialogOpen(true);
  };
  // Event handler to close the add employee dialog and reset the input fields

  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
    setNewEmployee({
      employeeNo: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    });
  };
  // Event handler to update the new employee state when input fields change

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };
  // Event handler to add a new employee to the server

  const handleAddEmployee = () => {
    if (
      !newEmployee.employeeNo ||
      !newEmployee.firstName ||
      !newEmployee.lastName ||
      !newEmployee.email ||
      !newEmployee.phone ||
      !newEmployee.address
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(newEmployee.email)) {
      setIsEmailErrorOpen(true);
      return;
    }

    if (!isValidPhoneNumber(newEmployee.phone)) {
      setIsPhoneErrorOpen(true);
      return;
    }

    const employeeData = {
      employeeId: newEmployee.employeeNo,
      firstName: newEmployee.firstName,
      lastName: newEmployee.lastName,
      email: newEmployee.email,
      phone: newEmployee.phone,
      address: newEmployee.address,
    };

    const accessToken = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };

    axios
      .post("https://voguemanic-be.onrender.com/admin/addEmployee", employeeData, { headers })
      .then((response) => {
        console.log("Employee added successfully:", response.data);

        axios
          .get("https://voguemanic-be.onrender.com/admin/employees", { headers })
          .then((response) => {
            setEmployees(response.data);
            setIsSuccessOpen(true);
            setIsAddDialogOpen(false);
          })
          .catch((error) => {
            console.error("Error fetching employees:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        setIsFailureOpen(true);
      });
  };
  // Event handler to delete an employee from the server

  const handleDeleteEmployee = (employeeId) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };

    axios
      .delete(`https://voguemanic-be.onrender.com/admin/deleteEmployee/${employeeId}`, { headers })
      .then((response) => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== employeeId)
        );

        const deletedEmployee = employees.find((employee) => employee._id === employeeId);
        if (deletedEmployee) {
          setDeletedEmployeeName(`${deletedEmployee.firstName} ${deletedEmployee.lastName}`);
          setIsSuccessDeleteOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <AdminBar isOpen={isNavbarOpen} onToggle={handleNavbarToggle} />

      <DialogBox
        isOpen={isEmailErrorOpen}
        onClose={() => setIsEmailErrorOpen(false)}
        title="Invalid Email"
        content="Please enter a valid email address."
      />
      <DialogBox
        isOpen={isPhoneErrorOpen}
        onClose={() => setIsPhoneErrorOpen(false)}
        title="Invalid Phone Number"
        content="Please enter a valid phone number in the format XXX-XXX-XXXX."
      />
      <DialogBox
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title={`Employee ${newEmployee.firstName} is successfully added`}
        content=""
      />
      <DialogBox
        isOpen={isFailureOpen}
        onClose={() => setIsFailureOpen(false)}
        title={`Employee ${newEmployee.firstName} couldn't be added`}
        content=""
      />
      <SuccessDeleteDialogBox
        isOpen={isSuccessDeleteOpen}
        onClose={() => setIsSuccessDeleteOpen(false)}
        employeeName={deletedEmployeeName}
      />
      <div style={{ padding: "20px" }}>
        <IconButton
          color="primary"
          aria-label="add employee"
          onClick={handleAddClick}
          style={{ float: "right" }}
        >
          <AddIcon />
        </IconButton>

        <Typography sx={{ padding: "5px" }} variant="h5" gutterBottom>
          Employee List
        </Typography>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee No</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell>{employee.employeeId}</TableCell>
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
        )}
      </div>

      <Dialog open={isAddDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Employee No"
            name="employeeNo"
            value={newEmployee.employeeNo}
            onChange={handleInputChange}
            margin="normal"
          />
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
            placeholder="test@test.com"
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            placeholder="XXX-XXX-XXXX or XXX.XXX.XXXX or XXX XXX XXXX"
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