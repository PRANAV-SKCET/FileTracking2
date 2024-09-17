import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context';
import OfficeNavbar from './officeNavbar';
import { FaUserTie, FaFileAlt, FaTasks, FaDownload, FaRegThumbsDown, FaClock } from 'react-icons/fa';
import { BsPersonFillAdd } from "react-icons/bs";
import { TiUserDelete } from "react-icons/ti";
import { RiFileCloseFill } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";

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
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <OfficeNavbar />

            {/* Dashboard Section */}
            <div className="px-10 py-6 pt-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Dashboard Card Template */}
                    {[
                        {
                            icon: FaUserTie,
                            title: 'Total Employees',
                            value: '150',
                            description: 'With various designations',
                        },
                        {
                            icon: FaFileAlt,
                            title: 'Total Applications',
                            value: '500',
                            description: 'Across all types',
                        },
                        {
                            icon: FaClock,
                            title: 'Pending Applications',
                            value: '120',
                            description: 'Currently in progress',
                        },
                        {
                            icon: FaRegThumbsDown,
                            title: 'Rejected Applications',
                            value: '30',
                            description: 'Marked as rejected',
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-b from-gray-800 to-gray-700 shadow-xl rounded-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
                        >
                            <div className="bg-gray-900 p-4 flex items-center justify-center">
                                <item.icon className="text-white text-4xl" />
                            </div>
                            <div className="p-6 text-center">
                                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                                <p className="text-4xl font-bold text-white mt-2">{item.value}</p>
                                <p className="text-gray-300">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Applications Section */}
            <div className="px-10 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            icon: FaTasks,
                            title: 'In-Progress Applications',
                            value: '200',
                            description: 'Currently being processed',
                        },
                        {
                            icon: VscFeedback,
                            title: 'Employee Feedback',
                            value: '85%',
                            description: 'Overall satisfaction',
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-b from-gray-800 to-gray-700 shadow-xl rounded-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
                        >
                            <div className="bg-gray-900 p-4 flex items-center justify-center">
                                <item.icon className="text-white text-4xl" />
                            </div>
                            <div className="p-6 text-center">
                                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                                <p className="text-4xl font-bold text-white mt-2">{item.value}</p>
                                <p className="text-gray-300">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions Section */}
            <div className="px-10 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: BsPersonFillAdd, title: 'Add Employee', route: '/add-employee' },
                        { icon: TiUserDelete, title: 'Delete Employee', route: '/delete-employee' },
                        { icon: FaFileAlt, title: 'New Application', route: '/add-application' },
                        { icon: RiFileCloseFill, title: 'Rejected Application', route: '/rejected-application' },
                        { icon: FaDownload, title: 'Download Reports', route: '/download-report' },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-b from-gray-800 to-gray-700 shadow-xl rounded-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
                            onClick={() => handleCardClick(item.route)}
                        >
                            <div className="bg-gray-900 p-4 flex items-center justify-center">
                                <item.icon className="text-white text-4xl" />
                            </div>
                            <div className="p-6 text-center">
                                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logout Section */}
            <div className="flex justify-center py-10">
                <button
                    className="py-3 px-6 bg-gradient-to-b from-red-600 to-red-500 hover:bg-red-700 text-white rounded-lg font-bold transition-colors duration-300 shadow-lg"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
