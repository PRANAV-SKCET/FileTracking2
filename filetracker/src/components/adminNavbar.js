import { Link } from 'react-router-dom';

export default function AdminNavbar() {
    return (
        <nav className="bg-gray-800 text-gray-200 p-4 shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto">
                <ul className="flex space-x-8 justify-center items-center">
                    <li>
                        <Link 
                            to="/adminWorking" 
                            className="text-base font-semibold uppercase tracking-wider hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/admininfo" 
                            className="text-base font-semibold uppercase tracking-wider hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Administrative Information
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/adminabout" 
                            className="text-base font-semibold uppercase tracking-wider hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/adminGO" 
                            className="text-base font-semibold uppercase tracking-wider hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            G.O
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
