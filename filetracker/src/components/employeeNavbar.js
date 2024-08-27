import { Link } from 'react-router-dom';
import { AuthContext } from './context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeNavbar() {
    const { setIsEmployeeLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        setIsEmployeeLoggedIn(false);
        navigate("/employee");
    }

    return (
        <nav className="bg-gray-800 text-gray-200 p-2 shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between">
                <ul className="flex space-x-8">
                    <li>
                        <Link 
                            to="/employeeWorking" 
                            className="text-base font-semibold uppercase tracking-wider hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/pending" 
                            className="text-base font-semibold uppercase tracking-wider hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Delayed Applications
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/officeabout" 
                            className="text-base font-semibold uppercase tracking-wider hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/employeeGO" 
                            className="text-base font-semibold uppercase tracking-wider hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            G.O
                        </Link>
                    </li>
                </ul>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white py-1 px-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300 ease-in-out ml-auto"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
