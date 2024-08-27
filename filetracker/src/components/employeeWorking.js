import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './context';
import emailjs from 'emailjs-com';

export default function EmployeeWorking() {
    const { employeeMail } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [delayedCount, setDelayedCount] = useState(0);
    const [showWarning, setShowWarning] = useState(false);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const fetchPendingTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/pending/${employeeMail}`);
            setTasks(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const fetchDelayedCount = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/delayed/count/${employeeMail}`);
            setDelayedCount(response.data);
            setShowWarning(true);
        } catch (err) {
            console.error('Failed to fetch delayed count:', err);
        }
    };

    useEffect(() => {
        fetchPendingTasks();
        fetchDelayedCount();
    }, []);

    const handleCommentChange = (taskId, comment) => {
        setComments({ ...comments, [taskId]: comment });
    };

    const handleComplete = async (taskId, ApplicationNumber) => {
        const comment = comments[taskId] || '-';
        try {
            const response = await axios.post(`http://localhost:8080/complete/${ApplicationNumber}/${comment}/${employeeMail}`);
            fetchPendingTasks();
            fetchDelayedCount();
            if (response.data === "finished") {
                const name = await axios.get(`http://localhost:8080/getName/${ApplicationNumber}`);
                const applicationName = await axios.get(`http://localhost:8080/getApplicationName/${ApplicationNumber}`);
                const officeId = (await axios.get(`http://localhost:8080/getOfficeId/${employeeMail}`)).data;
                const officeName = await axios.get(`http://localhost:8080/getOfficeName/${officeId}`);
                const mail = await axios.get(`http://localhost:8080/getMail/${ApplicationNumber}`);
                const templateParams = {
                    application_number: ApplicationNumber,
                    applicant_name: name.data,
                    application: applicationName.data,
                    office_name: officeName.data,
                    to_email: mail.data
                };

                emailjs.send("service_2sg82vx", "template_efj54fh", templateParams, "r7-vFKI6iM_8Dyl01")
                    .then((response) => {
                        console.log('Email successfully sent!', response.status, response.text);
                    }, (err) => {
                        console.error('Failed to send email:', err);
                    });
            }
        } catch (err) {
            console.error(`Failed to complete task ${taskId}:`, err);
        }
    };

    const handleReject = async (taskId, ApplicationNumber) => {
        const comment = comments[taskId] || '-';
        try {
            await axios.post(`http://localhost:8080/reject/${ApplicationNumber}/${comment}/${employeeMail}`);

            const name = await axios.get(`http://localhost:8080/getName/${ApplicationNumber}`);
            const applicationName = await axios.get(`http://localhost:8080/getApplicationName/${ApplicationNumber}`);
            const designation = await axios.get(`http://localhost:8080/getDesignation/${employeeMail}`);
            const officeId = (await axios.get(`http://localhost:8080/getOfficeId/${employeeMail}`)).data;
            const officeName = await axios.get(`http://localhost:8080/getOfficeName/${officeId}`);
            const mail = await axios.get(`http://localhost:8080/getMail/${ApplicationNumber}`);

            fetchPendingTasks();
            fetchDelayedCount();
            const templateParams = {
                application_number: ApplicationNumber,
                applicant_name: name.data,
                application: applicationName.data,
                employee_designation: designation.data,
                comments: comment,
                office_name: officeName.data,
                to_email: mail.data
            };

            emailjs.send("service_2sg82vx", "template_luxl33q", templateParams, "r7-vFKI6iM_8Dyl01")
                .then((response) => {
                    console.log('Email successfully sent!', response.status, response.text);
                }, (err) => {
                    console.error('Failed to send email:', err);
                });
        } catch (err) {
            console.error(`Failed to reject task ${taskId}:`, err);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTasks = tasks.filter(task =>
        task.ApplicationNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="text-center text-lg text-gray-700">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-lg text-red-500">Error loading tasks: {error.message}</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen mt-12">
            <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
            {showWarning && delayedCount > 0 && (
                <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md mb-4">
                    You have {delayedCount} delayed application(s).
                </div>
            )}
            <input
                type="text"
                placeholder="Search by Application Number"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 p-2 border border-gray-300 rounded-md w-full max-w-md"
            />
            <ul className="space-y-4">
                {filteredTasks.map(task => (
                    <li key={task.id} className="bg-white shadow-md rounded-md p-4 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{task.ApplicationNumber}</span>
                            <span className={`px-2 py-1 rounded-full text-sm ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {task.status}
                            </span>
                            <span className="text-gray-500">{formatDate(task.created_at)}</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter comment"
                            value={comments[task.id] || ''}
                            onChange={(e) => handleCommentChange(task.id, e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                        />
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleComplete(task.id, task.ApplicationNumber)}
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            >
                                Complete
                            </button>
                            <button
                                onClick={() => handleReject(task.id, task.ApplicationNumber)}
                                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                            >
                                Reject
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
