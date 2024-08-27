import React from 'react';

const AdminAbout = () => {
    return (
        <div className="bg-gray-100 p-8 mt-12">
            <h1 className="text-3xl font-bold text-black mb-6">About FileTracker</h1>
            <div className="space-y-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-black mb-4">Overview</h2>
                    <p className="text-gray-800">
                        FileTracker is a powerful tool designed to streamline document management and tracking. It allows users to upload, retrieve, and manage files efficiently.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-black mb-4">Features</h2>
                    <ul className="list-disc list-inside text-gray-800 space-y-2">
                        <li>Easy document upload and retrieval</li>
                        <li>Secure access control</li>
                        <li>Real-time tracking of document status</li>
                        <li>Automated notifications and reminders</li>
                    </ul>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-black mb-4">Benefits</h2>
                    <p className="text-gray-800">
                        FileTracker simplifies document management, reduces administrative overhead, and ensures that all files are securely stored and easily accessible.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-black mb-4">Screenshots</h2>
                    <div className="flex space-x-4">
                        <img src="your_image_path_here_1" alt="Screenshot 1" className="w-1/2 h-auto rounded-lg shadow-md" />
                        <img src="your_image_path_here_2" alt="Screenshot 2" className="w-1/2 h-auto rounded-lg shadow-md" />
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-black mb-4">Contact Us</h2>
                    <p className="text-gray-800">
                        For more information, contact us at <a href="mailto:support@filetracker.com" className="text-black hover:underline">support@filetracker.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminAbout;
