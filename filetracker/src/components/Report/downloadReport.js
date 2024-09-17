import React, { useContext, useState,useEffect } from 'react';
import { FaDownload, FaUser, FaBuilding } from 'react-icons/fa'; 
import { AuthContext } from '../context';
import { officeReportPDF } from './officeReport';
import { employeeDetailsPDF } from './employeeListReport';
import { individualReportPDF } from './individualReportPDF';
import axios from 'axios';

export default function DownloadReport() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const { officeId,officeName } = useContext(AuthContext);
  const [empName,setEmpName]=useState('');
  const [empId,setEmpId]=useState('');


  useEffect(() => {
    async function fetchEmployees() {
        try {
            const response = await axios.get(`http://localhost:8080/getEmployees/${officeId}`);
            setEmployees(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error.message);
        }
    }

    fetchEmployees();
}, [officeId]);
  
  const handleDownloadOfficeWork = async() => {
    
    try {
      const response = await axios.get(`http://localhost:8080/getPendingsForOffice/${officeId}`);
      
      officeReportPDF(officeId, response.data,officeName);
    } catch (error) {
      console.error('Error downloading office work report:', error.message);
    }
   
  };

  const handleDownloadEmployeeDetails = async() => {
    
    try {
      const response = await axios.get(`http://localhost:8080/getEmployees/${officeId}`);
     
      employeeDetailsPDF(officeId, response.data,officeName);
    } catch (error) {
      console.error('Error downloading Employee report:', error.message);
    }
  };

  const handleDownloadParticularEmployeeWork = async() => {
    if (selectedEmployee) {
       
        const { employeeId, employeeName, email } = selectedEmployee;
        const modifiedEmail = email.replace(/[^a-zA-Z0-9]/g, "_");
        console.log("selected:",email," ",employeeName," ",employeeId);
       
        try {
          const response = await axios.get(`http://localhost:8080/getPendingsForEmployee/${modifiedEmail}`);
         
          individualReportPDF(officeId, response.data,officeName,employeeId,employeeName);
        } catch (error) {
          console.error('Error downloading Individual Employee report:', error.message);
        }
    } else {
      alert("Please select an employee first!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-wide">
          Download Reports
        </h1>

         {/* Office Pending Work  */}
        <div className="mb-8">
          <h2 className="text-gray-600 mb-2 text-sm font-semibold">Office-Wide Reports</h2>
          <button 
            className="w-full flex items-center justify-center bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 hover:scale-105 transition transform duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onClick={handleDownloadOfficeWork}
          >
            <FaBuilding className="h-5 w-5 mr-2" />
            Download Office Pending Work
          </button>
        </div>

        {/* Employee Details */}
        <div className="mb-8">
          <h2 className="text-gray-600 mb-2 text-sm font-semibold">Employee Reports</h2>
          <button 
            className="w-full flex items-center justify-center bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 hover:scale-105 transition transform duration-300 ease-in-out focus:ring-2 focus:ring-green-400 focus:outline-none"
            onClick={handleDownloadEmployeeDetails}
          >
            <FaUser className="h-5 w-5 mr-2" />
            Download Employee Details
          </button>
        </div>

        {/* Particular Employee Pending Work */}
        <div className="mb-8">
          <h2 className="text-gray-600 mb-2 text-sm font-semibold">Pending Work for Individual Employee</h2>
          <label className="block text-gray-700 mb-2 font-medium">
            Select Employee:
          </label>
          <div className="relative mb-4">
          <select
              className="block w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              value={selectedEmployee ? selectedEmployee.email : ''}
              onChange={(e) => {
                const selectedOption = employees.find(employee => employee.email === e.target.value);
                setSelectedEmployee(selectedOption);
              }}
            >
              <option value="" disabled>Select an employee</option>
              {employees.map((employee) => (
                <option key={employee.email} value={employee.email}>
                  {employee.employeeName} - {employee.employeeId}
                </option>
              ))}
            </select>
            
          </div>
          <button 
            className="w-full flex items-center justify-center bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 hover:scale-105 transition transform duration-300 ease-in-out focus:ring-2 focus:ring-purple-400 focus:outline-none"
            onClick={handleDownloadParticularEmployeeWork}
          >
            <FaDownload className="h-5 w-5 mr-2" />
            Download Individual Employee's Pending Work
          </button>
        </div>
      </div>
    </div>
  );
}
