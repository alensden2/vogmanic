const mongoose = require('mongoose');

// Defining the schema for the employee, containing personal details and unique employee ID
const employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true, // First name of the employee is required
    },
    lastName: {
        type: String,
        required: true, // Last name of the employee is required
    },
    address: {
        type: String,
        required: true, // Address of the employee is required
    },
    email: {
        type: String,
        required: true, // Email of the employee is required
        unique: true,   // Email must be unique to avoid duplicate entries
    },
    phone: {
        type: String,
        required: true, // Phone number of the employee is required
    },
    employeeId: {
        type: String,
        required: true, // Employee ID is required
        unique: true,   // Employee ID must be unique to avoid duplicate entries
    },
}, { timestamps: true }); // Including timestamps for created_at and updated_at fields

const Employee = mongoose.model('employees', employeeSchema);

module.exports = Employee;
