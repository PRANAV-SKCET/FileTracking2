import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './context';
import { useNavigate } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

function AddOffice() {
    const { districtId } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        officeId: '',
        officeName: '',
        officeLocation: '',
        email: '',
        password: '',
        districtId: districtId
    });
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/addOffice', formData)
            .then(response => {
                setResponseMessage(response.data);

                if (response.data === "New Office Added") {
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
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                        <AccountBalanceIcon className="text-gray-700 mr-2" />
                        Add Office
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="officeId"
                        value={formData.officeId}
                        onChange={handleChange}
                        placeholder="Office Id"
                        required
                        className="mb-4 p-3 w-full border border-gray-300 rounded-lg text-gray-800 bg-gray-50"
                    />
                    <input
                        type="text"
                        name="officeName"
                        value={formData.officeName}
                        onChange={handleChange}
                        placeholder="Office Name"
                        required
                        className="mb-4 p-3 w-full border border-gray-300 rounded-lg text-gray-800 bg-gray-50"
                    />
                    <input
                        type="text"
                        name="officeLocation"
                        value={formData.officeLocation}
                        onChange={handleChange}
                        placeholder="Office Location"
                        required
                        className="mb-4 p-3 w-full border border-gray-300 rounded-lg text-gray-800 bg-gray-50"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="mb-4 p-3 w-full border border-gray-300 rounded-lg text-gray-800 bg-gray-50"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="mb-6 p-3 w-full border border-gray-300 rounded-lg text-gray-800 bg-gray-50"
                    />
                    <button type="submit" className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        Add New Office
                    </button>
                    {responseMessage && (
                        <p className="mt-4 text-center text-gray-700">
                            {responseMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AddOffice;
