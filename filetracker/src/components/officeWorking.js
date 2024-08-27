


import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context';
import OfficeNavbar from './officeNavbar'; // Import the OfficeNavbar component

export default function OfficeWorking() {
    const { setIsOfficeLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsOfficeLoggedIn(false);
        navigate("/office");
    };

    const handleCardClick = (route) => {
        navigate(route);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center">
            <OfficeNavbar /> {/* Use OfficeNavbar instead of Navbar */}
            <div className="flex flex-col items-center justify-center flex-grow p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div 
                        className="p-8 bg-black text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => handleCardClick('/add-employee')}
                    >
                        <h2 className="text-2xl font-semibold text-center">Add Employee</h2>
                    </div>
                    <div 
                        className="p-8 bg-black text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => handleCardClick('/delete-employee')}
                    >
                        <h2 className="text-2xl font-semibold text-center">Delete Employee</h2>
                    </div>
                    <div 
                        className="p-8 bg-black text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => handleCardClick('/add-application')}
                    >
                        <h2 className="text-2xl font-semibold text-center">New Application</h2>
                    </div>
                    <div 
                        className="p-8 bg-black text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => handleCardClick('/rejected-application')}
                    >
                        <h2 className="text-2xl font-semibold text-center">Rejected Application</h2>
                    </div>
                </div>
                <button 
                    className="w-1/4 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors duration-300 mt-8" 
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
