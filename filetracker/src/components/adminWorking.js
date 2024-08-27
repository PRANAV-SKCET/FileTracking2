import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context';

export default function AdminWorking() {
    const navigate = useNavigate();
    const { setIsAdminLoggedIn } = useContext(AuthContext);

    const handleCardClick = (route) => {
        navigate(route);
    };

    function handleLogout() {
        setIsAdminLoggedIn(false);
        navigate("/admin");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div 
                    className="bg-black p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-800 transition duration-300" 
                    onClick={() => handleCardClick('/add-office')}
                >
                    <h2 className="text-xl font-semibold text-center text-white">Add Office</h2>
                </div>
                <div 
                    className="bg-black p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-800 transition duration-300" 
                    onClick={() => handleCardClick('/delete-office')}
                >
                    <h2 className="text-xl font-semibold text-center text-white">Delete Office</h2>
                </div>
                <div 
                    className="bg-black p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-800 transition duration-300" 
                    onClick={() => handleCardClick('/workload')}
                >
                    <h2 className="text-xl font-semibold text-center text-white">Workload Manager</h2>
                </div>
            </div>
            <button 
                className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300" 
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}
