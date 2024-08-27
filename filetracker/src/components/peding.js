import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './context';

export default function Pending() {
    const { employeeMail } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    useEffect(() => {
        const fetchPendingTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/delayed/${employeeMail}`);
                setTasks(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchPendingTasks();
    }, [employeeMail]);

    if (loading) {
        return <div className="text-center text-lg text-gray-700">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-lg text-red-500">Error loading tasks: {error.message}</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen mt-12">
            <h1 className="text-2xl font-bold mb-4">Delayed Work</h1>
            <ul className="space-y-4">
                {tasks.map(task => (
                    <li key={task.id} className="bg-white shadow-md rounded-md p-4">
                        <div className="text-lg font-semibold mb-2">
                            <strong>Application Number:</strong> {task.ApplicationNumber}
                        </div>
                        <div className="text-sm text-gray-700 mb-2">
                            <strong>Status:</strong> {task.status}
                        </div>
                        <div className="text-sm text-gray-500">
                            <strong>Created At:</strong> {formatDate(task.created_at)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
