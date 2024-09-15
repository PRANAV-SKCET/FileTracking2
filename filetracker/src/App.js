import { useState, useEffect } from 'react';
import './App.css';
import { AuthContext } from './components/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Monitoring from './components/monitoring';
import AdminPage from './components/adminPage';
import OfficePage from './components/officePage';
import EmployeePage from './components/employeePage';
import AdminWorking from './components/adminWorking';
import OfficeWorking from './components/officeWorking';
import EmployeeWorking from './components/employeeWorking';
import AdminGO from './components/adminGO';
import AdminNavbar from "./components/adminNavbar";
import AdminInfo from './components/adminInfo';
import AdminAbout from './components/adminAbout';
import AddOffice from './components/addOffice';
import DeleteOffice from './components/deleteOffice';
import AddEmployee from './components/addEmployee';
import DeleteEmployee from './components/deleteEmployee';
import OfficeNavbar from './components/officeNavbar';
import AddApplication from './components/addApplication';
import AddAppType from './components/addAppType';
import EmployeeNavbar from './components/employeeNavbar';
import Pending from './components/peding';
import RejectedApplications from './components/rejectedApplication';
import OfficeGO from './components/officeGO';
import EmployeeGO from './components/employeeGO';
import Workload from './components/workload';
import DownloadReport from './components/Report/downloadReport';


function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    JSON.parse(sessionStorage.getItem('isAdminLoggedIn')) || false
  );
  const [districtId, setDistrictId] = useState(
    sessionStorage.getItem('districtId') || ''
  );
  const [isOfficeLoggedIn, setIsOfficeLoggedIn] = useState(
    JSON.parse(sessionStorage.getItem('isOfficeLoggedIn')) || false
  );
  const [isEmployeeLoggedIn, setIsEmployeeLoggedIn] = useState(
    JSON.parse(sessionStorage.getItem('isEmployeeLoggedIn')) || false
  );
  const [officeId, setOfficeId] = useState(
    sessionStorage.getItem('officeId') || ''
  );
  const [officeName, setOfficeName] = useState(
    sessionStorage.getItem('officeName') || ''
  );
  const [employeeMail, setEmployeeMail] = useState(
    sessionStorage.getItem('employeeMail') || ''
  );
  const [officeMail, setOfficeMail] = useState(
    sessionStorage.getItem('officeMail') || ''
  );

  useEffect(() => {
    sessionStorage.setItem('isAdminLoggedIn', JSON.stringify(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  useEffect(() => {
    sessionStorage.setItem('districtId', districtId);
  }, [districtId]);

  useEffect(() => {
    sessionStorage.setItem('isOfficeLoggedIn', JSON.stringify(isOfficeLoggedIn));
  }, [isOfficeLoggedIn]);

  useEffect(() => {
    sessionStorage.setItem('isEmployeeLoggedIn', JSON.stringify(isEmployeeLoggedIn));
  }, [isEmployeeLoggedIn]);

  useEffect(() => {
    sessionStorage.setItem('officeId', officeId);
  }, [officeId]);
  useEffect(() => {
    sessionStorage.setItem('officeName', officeName);
  }, [officeName]);

  useEffect(() => {
    sessionStorage.setItem('employeeMail', employeeMail);
  }, [employeeMail]);

  useEffect(() => {
    sessionStorage.setItem('officeMail', officeMail);
  }, [officeMail]);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        districtId,
        setDistrictId,
        isOfficeLoggedIn,
        setIsOfficeLoggedIn,
        officeId,
        setOfficeId,
        isEmployeeLoggedIn,
        setIsEmployeeLoggedIn,
        employeeMail,
        setEmployeeMail,
        officeMail,
        setOfficeMail,
        officeName,
        setOfficeName
      }}
    >
      <div className="App">
        <Router>
          {isAdminLoggedIn && <AdminNavbar />}
          {isOfficeLoggedIn && <OfficeNavbar />}
          {isEmployeeLoggedIn && <EmployeeNavbar />}
          <Routes>
            {/* <Route path="/" element={<OpeningPage />} /> */}
            <Route path="/" element={<AdminPage />} />
            <Route path="/office" element={<OfficePage />} />
            <Route path="/employee" element={<EmployeePage />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/adminWorking" element={<AdminWorking />} />
            <Route path="/officeWorking" element={<OfficeWorking />} />
            <Route path="/employeeWorking" element={<EmployeeWorking />} />
            <Route path="/admininfo" element={<AdminInfo />} />
            <Route path="/adminabout" element={<AdminAbout />} />
            <Route path="/adminGO" element={<AdminGO />} />
            <Route path="/add-office" element={<AddOffice />} />
            <Route path="/delete-office" element={<DeleteOffice />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/delete-employee" element={<DeleteEmployee />} />
            <Route path="/add-application" element={<AddApplication />} />
            <Route path="/rejected-application" element={<RejectedApplications />} />
            <Route path="/addAppType" element={<AddAppType />} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/officeGO" element={<OfficeGO />} />
            <Route path="/employeeGO" element={<EmployeeGO />} />
            <Route path="/workload" element={<Workload />} />
            <Route path="/download-report" element={<DownloadReport />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
    
  );
}

export default App;
