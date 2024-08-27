import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteEmployee() {
    const [employeeId, setEmployeeId] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmployeeId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/deleteEmployee/${employeeId}`)
            .then(response => {
                setResponseMessage(response.data);

                if (response.data === "Employee Deleted") {
                    setTimeout(() => {
                        navigate("/officeWorking");
                    }, 1500);
                } else {
                    setTimeout(() => {
                        setResponseMessage('');
                    }, 1500);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="bg-black text-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <Typography variant="h4" className="text-center mb-6">Delete Employee</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="employeeId"
                        value={employeeId}
                        onChange={handleChange}
                        label="Employee ID"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        className="mb-4"
                        InputProps={{
                            style: { color: 'black', backgroundColor: 'white' },
                        }}
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'gray',
                                },
                            },
                        }}
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-gray-800 text-white hover:bg-gray-700 py-2 rounded flex items-center justify-center"
                    >
                        <DeleteIcon className="mr-2" />
                        Delete Employee
                    </button>
                    {responseMessage && (
                        <Typography variant="body1" className="mt-4 text-center">
                            {responseMessage}
                        </Typography>
                    )}
                </form>
            </div>
        </div>
    );
}

export default DeleteEmployee;
