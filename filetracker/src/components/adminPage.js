import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './context';
import Navbar from './navbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function AdminPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setIsAdminLoggedIn, setDistrictId } = useContext(AuthContext);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/AdminLogin/${email}/${password}`);
            if (response.data === true) {
                const response2 = await axios.get(`http://localhost:8080/AdminLoginDetails/${email}/${password}`);
                setDistrictId(response2.data.districtId);
                setIsAdminLoggedIn(true);
                setMessage('Login successful');
                setTimeout(() => {
                    navigate("/adminWorking");
                }, 0);
            } else {
                setMessage('Invalid email or password. Please try again.');
                setTimeout(() => {
                    setMessage('');
                }, 2500);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <div className="flex flex-grow">
               
                <div className="hidden md:flex w-1/2 bg-cover bg-center" 
                     style={{ backgroundImage: 'url(https://t3.ftcdn.net/jpg/05/58/37/98/360_F_558379870_PYYTrOCh9jC1zuA7CWxSp0XvVFB42bGm.jpg)' }}>
                </div>

                {/* Right Half: Form */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-black text-white">
                    <div className="w-full max-w-md rounded-lg shadow-lg p-8">
                        <h1 className="text-3xl font-bold mb-6 flex items-center justify-center text-gray-300">
                            <AccountCircleIcon className="mr-3" style={{ fontSize: '40px' }} />
                            Admin Login
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2 text-gray-300">Email:</label>
                                <input 
                                    className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    type="email" 
                                    value={email} 
                                    onChange={handleEmailChange} 
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2 text-gray-300">Password:</label>
                                <input 
                                    className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    type="password" 
                                    value={password} 
                                    onChange={handlePasswordChange} 
                                />
                            </div>
                            {message && (
                                <div className="mb-4 text-center text-red-500">{message}</div>
                            )}
                            <button 
                                className="w-full py-3 rounded-lg bg-gray-700 text-white font-bold hover:bg-gray-600 transition-colors duration-300"
                                type="submit"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

