import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './context';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
    const { officeId } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        employeeDesignation: '',
        email: '',
        password: '',
        officeId: officeId
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
        axios.post('http://localhost:8080/addEmployee', formData)
            .then(response => {
                setResponseMessage(response.data);

                if (response.data === "New Employee Added") {
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
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="w-full max-w-md bg-black p-8 rounded-lg shadow-lg">
                <h2 className="text-center text-2xl font-bold text-white mb-6">Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        placeholder="Employee Id"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        name="employeeName"
                        value={formData.employeeName}
                        onChange={handleChange}
                        placeholder="Employee Name"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        name="employeeDesignation"
                        value={formData.employeeDesignation}
                        onChange={handleChange}
                        placeholder="Employee Designation"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-3 mb-6 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition duration-300"
                    >
                        Add New Employee
                    </button>
                    {responseMessage && (
                        <p className="mt-4 text-center text-gray-300">
                            {responseMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
