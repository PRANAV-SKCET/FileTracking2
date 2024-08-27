import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DeleteOffice() {
    const [officeId, setOfficeId] = useState('');
    const [responseMessage, setResponseMessage] = useState('');    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setOfficeId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/deleteOffice/${officeId}`)
            .then(response => {
                setResponseMessage(response.data);
    
                if (response.data === "Office Deleted") {
                    setTimeout(() => {
                        navigate("/adminWorking");
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <div className="mb-6 text-center">
                    <Typography variant="h4" className="text-gray-800">
                        Delete Office
                    </Typography>
                </div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="officeId"
                        value={officeId}
                        onChange={handleChange}
                        label="Office ID"
                        variant="outlined"
                        fullWidth
                        required
                        className="mb-4"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth className="bg-black text-white hover:bg-gray-800">
                        Delete Office
                    </Button>
                    {responseMessage && (
                        <Typography variant="body1" className="mt-4 text-center text-gray-700">
                            {responseMessage}
                        </Typography>
                    )}
                </form>
            </div>
        </div>
    );
}

export default DeleteOffice;
