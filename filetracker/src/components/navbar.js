import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-black text-white p-2 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between h-12">
                <div className="logo">
                    <h1 className="text-xl font-semibold text-white">Navbar</h1>
                </div>
                <ul className="nav-links flex space-x-4">
                    <li>
                        <Link 
                            to="/" 
                            className="text-sm font-medium hover:text-gray-300 transition-colors duration-300"
                        >
                            Admin Login
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/office" 
                            className="text-sm font-medium hover:text-gray-300 transition-colors duration-300"
                        >
                            Office Login
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/employee" 
                            className="text-sm font-medium hover:text-gray-300 transition-colors duration-300"
                        >
                            Employee Login
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/monitoring" 
                            className="text-sm font-medium hover:text-gray-300 transition-colors duration-300"
                        >
                            Track Application
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
