import { Link } from 'react-router-dom';
import React from 'react';

export default function OfficeNavbar() {
    return (
        <nav className="bg-black text-white p-2 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between h-12">
                <div className="logo">
                    <h1 className="text-xl font-semibold text-white">Office Navbar</h1>
                </div>
                <ul className="nav-links flex space-x-4">
                    <li>
                        <Link 
                            to="/officeWorking" 
                            className="text-sm font-medium hover:text-gray-300 transition-colors duration-300"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/addAppType" 
                            className="text-sm font-medium hover:text-gray-300 transition-colors duration-300"
                        >
                            Add Application Type
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/officeabout" 
                            className="text-sm font-medium hover:text-gray-300 transition-colors duration-300"
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/officeGO" 
                            className="text-sm font-medium hover:text-gray-300 transition-colors duration-300"
                        >
                            G.O
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
