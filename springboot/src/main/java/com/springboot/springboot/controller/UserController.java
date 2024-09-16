package com.springboot.springboot.controller;

import java.util.List;
import java.util.Map;
import java.time.LocalDate;
import java.util.ArrayList;
import java.time.DayOfWeek;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.springboot.springboot.entity.AdminUsers;
import com.springboot.springboot.entity.ApplicationSteps;
import com.springboot.springboot.entity.ApplicationType;
import com.springboot.springboot.entity.Applications;
import com.springboot.springboot.entity.EmployeeUsers;
import com.springboot.springboot.entity.GO;
import com.springboot.springboot.entity.OfficeUsers;
import com.springboot.springboot.entity.Rejected;
import com.springboot.springboot.repository.AdminUsersRepo;
import com.springboot.springboot.repository.ApplicationStepsRepo;
import com.springboot.springboot.repository.ApplicationTypeRepo;
import com.springboot.springboot.repository.ApplicationsRepo;
import com.springboot.springboot.repository.EmployeeUsersRepo;
import com.springboot.springboot.repository.GORepo;
import com.springboot.springboot.repository.OfficeUsersRepo;
import com.springboot.springboot.repository.RejectedRepo;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private AdminUsersRepo adminUsersRepo;

    @Autowired
    private OfficeUsersRepo officeUsersRepo;

    @Autowired
    private EmployeeUsersRepo employeeUsersRepo;

    @Autowired
    private ApplicationTypeRepo applicationTypeRepo;

    @Autowired
    private ApplicationStepsRepo applicationStepsRepo;

    @Autowired
    private ApplicationsRepo applicationsRepo;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private RejectedRepo rejectedRepo;

    @Autowired
    private GORepo goRepo;

    @GetMapping("/AdminLogin/{email}/{password}")
    public Boolean AdminLogin(@PathVariable String email, @PathVariable String password)
    {
        List<AdminUsers> li = adminUsersRepo.ableToLogin(email,password);
        if(li.size()>0)
        {
            return true;
        }
        return false;
    }

    @GetMapping("/AdminLoginDetails/{email}/{password}")
    public AdminUsers AdminLoginDetails(@PathVariable String email, @PathVariable String password)
    {
        List<AdminUsers> li = adminUsersRepo.ableToLogin(email,password);
        return li.get(0);
    }
    @GetMapping("/OfficeLoginDetails/{email}/{password}")
    public OfficeUsers OfficeLoginDetails(@PathVariable String email, @PathVariable String password)
    {
        List<OfficeUsers> li = officeUsersRepo.ableToLogin(email,password);
        return li.get(0);
    }

    @GetMapping("/OfficeLogin/{email}/{password}")
    public Boolean OfficeLogin(@PathVariable String email, @PathVariable String password)
    {
        List<OfficeUsers> li = officeUsersRepo.ableToLogin(email,password);
        if(li.size()>0)
        {
            return true;
        }
        return false;
    }

    @GetMapping("/EmployeeLogin/{email}/{password}")
    public Boolean EmployeeLogin(@PathVariable String email, @PathVariable String password)
    {
        List<EmployeeUsers> li = employeeUsersRepo.ableToLogin(email,password);
        if(li.size()>0)
        {
            return true;
        }
        return false;
    }

    @PostMapping("/addOffice")
    public String AddOffice(@RequestBody OfficeUsers officeUsers)
    {
        List<OfficeUsers> li = officeUsersRepo.checkExist(officeUsers.getEmail());
        if(li.size()>0)
        {
            return "Office Already Exist";
        }
        officeUsersRepo.save(officeUsers);
        return "New Office Added";
    }

    @PostMapping("/addEmployee")
    public String AddEmployee(@RequestBody EmployeeUsers employeeUsers)
    {
        List<EmployeeUsers> li = employeeUsersRepo.checkExist(employeeUsers.getEmail());
        if(li.size()>0)
        {
            return "Employee Already Exist";
        }
        createEmployeeTable(employeeUsers.getEmail());
        employeeUsersRepo.save(employeeUsers);
        return "New Employee Added";
    }

    private void createEmployeeTable(String email) {
        String tableName = email.replaceAll("[^a-zA-Z0-9]", "_");
        String createTableSql = "CREATE TABLE `" + tableName + "` ("
                + "`id` INT AUTO_INCREMENT PRIMARY KEY, "
                + "ApplicationNumber VARCHAR(255), "
                + "`status` VARCHAR(255), "
                + "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "
                + "NoOfDays INT"
                + ")";
        jdbcTemplate.execute(createTableSql);
    }

    @DeleteMapping("/deleteOffice/{officeId}")
    public String deleteOffice(@PathVariable int officeId)
    {
        OfficeUsers officeUsers = officeUsersRepo.findById(officeId).orElse(null);
        if(officeUsers==null)
        {
            return "Office Not Found";
        }
        officeUsersRepo.delete(officeUsers);
        return "Office Deleted";
    }

    @DeleteMapping("/deleteEmployee/{employeeId}")
    public String deleteEmployee(@PathVariable int employeeId)
    {
        EmployeeUsers employeeUsers = employeeUsersRepo.findById(employeeId).orElse(null);
        if(employeeUsers==null)
        {
            return "Employee Not Found";
        }
        employeeUsersRepo.delete(employeeUsers);
        deleteEmployeeTable(employeeUsers.getEmail());
        return "Employee Deleted";
    }
    private void deleteEmployeeTable(String email) {
        String tableName = email.replaceAll("[^a-zA-Z0-9]", "_");
        String dropTableSql = "DROP TABLE IF EXISTS `" + tableName + "`";
        jdbcTemplate.execute(dropTableSql);
    }

    @PostMapping("/saveApplicationType")
    public String saveApplicationType(@RequestBody ApplicationType applicationType)
    {
        ApplicationType temp = applicationTypeRepo.findById(applicationType.getApplicationId()).orElse(null);
        if(temp!=null)
        {
            return "Application Type Already Exist";
        }
        applicationTypeRepo.save(applicationType);
        return "Application Added";
    }

    @PostMapping("/saveApplicationSteps")
    public void saveApplicationSteps(@RequestBody List<ApplicationSteps> applicationSteps)
    {
        for(ApplicationSteps applicationSteps1:applicationSteps)
        applicationStepsRepo.save(applicationSteps1);
    }

    @GetMapping("/getEmployees/{officeId}")
    public List<EmployeeUsers> getEmployee(@PathVariable int officeId)
    {
        List<EmployeeUsers> li = employeeUsersRepo.findEmployeeByOffice(officeId);
        return li;
    }

    @GetMapping("/getApplicationTypes/{officeId}")
    public List<ApplicationType> getApplicationTypes(@PathVariable int officeId)
    {
        List<ApplicationType> li = applicationTypeRepo.findApplicationTypeByOffice(officeId);
        return li;
    }

    @PostMapping("/createApplication")
    public String createApplication(@RequestBody Applications applications)
    {
        Applications temp = applicationsRepo.findById(applications.getApplicationNumber()).orElse(null);
        if(temp!=null)
        {
            return "Application Already Exist";
        }
        int days = createApplicationTable(applications.getApplicationNumber(),applications.getApplicationTypeId());
        applications.setMaxDays(days);
        applicationsRepo.save(applications);
        return "Application added Successfully";
    }

    private int createApplicationTable(String applicationNumber,int applicationId) 
    {
        String tableName = applicationNumber;
        int days=0;
        String createTableSql = "CREATE TABLE " + tableName + " (" +
                                "`Step_No` INT AUTO_INCREMENT PRIMARY KEY, " +
                                "`Assigned_To` VARCHAR(255), " +
                                "`Employee_Id` VARCHAR(255), " +
                                "`status` ENUM('Pending', 'Rejected', 'Completed','Processing'), " +
                                "`Date` VARCHAR(255), " +
                                "`NoOfDays` INT, " +
                                "`Comments` VARCHAR(255))";
    
        jdbcTemplate.execute(createTableSql);


        List<Map<String, Object>> steps = getApplicationSteps(applicationId);

        for (Map<String, Object> step : steps) {
            String sql = "INSERT INTO " + applicationNumber + " " +
                         "(Assigned_To, Employee_Id, status, Date, NoOfDays, Comments) " +
                         "VALUES (?, ?, ?, ?, ?, ?)";

            jdbcTemplate.update(sql,
                                step.get("employee_name"),
                                step.get("employee_id"),
                                "Pending",
                                LocalDate.now().toString(),
                                step.get("no_of_days"),
                                "");
                                
            days=days+(int)step.get("no_of_days");
        }
        insertFirstStepIntoEmployeeTable(steps.get(0),applicationNumber);
        return days;
    }
    public void insertFirstStepIntoEmployeeTable(Map<String, Object> firstStep,String applicationNumber) {
        
        Integer employeeId = (Integer) firstStep.get("employee_id");        
        EmployeeUsers employee = employeeUsersRepo.findById(employeeId).orElse(null);
        String employeeEmail = employee.getEmail();
        String tableName = employeeEmail.replaceAll("[^a-zA-Z0-9]", "_");

        String sql = "INSERT INTO `" + tableName + "` "
                   + "(ApplicationNumber, status, created_at,NoOfDays) "
                   + "VALUES (?, ?, ?, ?)";

        jdbcTemplate.update(sql,
                            applicationNumber,
                            "Pending",
                            LocalDate.now().toString(),
                            firstStep.get("no_of_days"));
    }

    public List<Map<String, Object>> getApplicationSteps(int applicationId) {
        String sql = "SELECT employee_name, employee_id, no_of_days " +
                     "FROM application_steps WHERE application_id = ?";
        return jdbcTemplate.queryForList(sql, applicationId);
    }

     @GetMapping("/track/{applicationNumber}")
    public ResponseEntity<?> trackApplication(@PathVariable String applicationNumber) {
        try {
            String sql = "SELECT * FROM " + applicationNumber ;
            List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to track application");
            
        }
    }

    @GetMapping("/pending/{employeeMail}")
    public ResponseEntity<?> getPendingApplications(@PathVariable String employeeMail) {
        try {
            String employeeEmail = employeeMail.replaceAll("[^a-zA-Z0-9]", "_");
            String sql = "SELECT * FROM " + employeeEmail + " WHERE status = 'Pending'";
            List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);
            return ResponseEntity.ok(results);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to load!!!");
        }
    }

    @PostMapping("/complete/{ApplicationNumber}/{comment}/{employeeMail}")
    public String completeApplication (@PathVariable String ApplicationNumber,@PathVariable String comment,@PathVariable String employeeMail)
    {
        String employeeEmail = employeeMail.replaceAll("[^a-zA-Z0-9]", "_");
        String sql = "DELETE FROM " + employeeEmail + " WHERE ApplicationNumber = ?";
        jdbcTemplate.update(sql,ApplicationNumber);

        List<EmployeeUsers> employee = employeeUsersRepo.checkExist(employeeMail);
        int employeeId = employee.get(0).getEmployeeId();
        String sql1 = "UPDATE "+ ApplicationNumber +" SET status = 'Completed' , Comments = ? WHERE Employee_Id = ?";
        jdbcTemplate.update(sql1,comment,employeeId);

        String nextTaskSql = "SELECT Employee_Id, NoOfDays FROM " + ApplicationNumber + " WHERE status=?";
            List<Map<String, Object>> nextTasks = jdbcTemplate.queryForList(nextTaskSql,"Pending");
            if (nextTasks.size()>0) {
                Map<String, Object> nextTask = nextTasks.get(0);
                String employeeIdStr = (String) nextTask.get("Employee_Id");
                int nextTaskId = Integer.parseInt(employeeIdStr);
                EmployeeUsers employee2 = employeeUsersRepo.findById(nextTaskId).orElse(null);
                String employeemail2 = employee2.getEmail();
                String tableName = employeemail2.replaceAll("[^a-zA-Z0-9]", "_");
                String sql3 = "INSERT INTO `" + tableName + "` "
                + "(ApplicationNumber, status, created_at,NoOfDays) "
                + "VALUES (?, ?, ?, ?)";
                
                jdbcTemplate.update(sql3,
                ApplicationNumber,
                "Pending",
                LocalDate.now().toString(),
                nextTask.get("NoOfDays")
                );

                String updatingSQL = "UPDATE " + ApplicationNumber + " SET Date = ? WHERE Step_No = ?";
                jdbcTemplate.update(updatingSQL,LocalDate.now().toString(),nextTask.get("Step_No"));
                return "OK";

            }
            else
            {
                applicationsRepo.edit(ApplicationNumber,LocalDate.now().toString());
                return "finished";
            }
    }

    @PostMapping("/reject/{ApplicationNumber}/{comment}/{employeeMail}")
    public void rejectApplication(@PathVariable String ApplicationNumber,@PathVariable String comment,@PathVariable String employeeMail)
    {
        String employeeEmail = employeeMail.replaceAll("[^a-zA-Z0-9]", "_");
        String sql = "DELETE FROM " + employeeEmail + " WHERE ApplicationNumber = ?";
        jdbcTemplate.update(sql,ApplicationNumber);

        List<EmployeeUsers> employee = employeeUsersRepo.checkExist(employeeMail);
        int employeeId = employee.get(0).getEmployeeId();
        String sql1 = "UPDATE "+ ApplicationNumber +" SET status = 'Rejected' , Comments = ? WHERE Employee_Id = ?";
        jdbcTemplate.update(sql1,comment,employeeId);  

        int officeId = employee.get(0).getOfficeId();
        String insert = "INSERT into rejected (application_number,comment,date_of_rejection,reason_for_rejection,date_of_opening,employee_id,office_id) VALUES(?,?,?,?,?,?,?)";
        jdbcTemplate.update(insert,ApplicationNumber,"",LocalDate.now().toString(),comment,"",employeeId,officeId);

        String sql2 = "UPDATE applications SET application_status = 'Rejected' where application_number=?";
        jdbcTemplate.update(sql2,ApplicationNumber);
    }

    @GetMapping("/delayed/{employeeMail}")
    public ResponseEntity<?> getDelayedApplications(@PathVariable String employeeMail) {
        try {
            String employeeEmail = employeeMail.replaceAll("[^a-zA-Z0-9]", "_");
            String sql = "SELECT * FROM " + employeeEmail + " WHERE status = 'Pending' AND DATE_ADD(created_at, INTERVAL NoOfDays DAY) < NOW()";
            List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);
            return ResponseEntity.ok(results);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to load!!!");
        }
    }

    @GetMapping("/delayed/count/{employeeMail}")
    public ResponseEntity<?> getDelayedCountApplications(@PathVariable String employeeMail) {
        try {
            String employeeEmail = employeeMail.replaceAll("[^a-zA-Z0-9]", "_");
            String sql = "SELECT COUNT(*) AS delayedCount FROM " + employeeEmail + " WHERE status = 'Pending' AND DATE_ADD(created_at, INTERVAL NoOfDays DAY) < NOW()";
            Map<String, Object> result = jdbcTemplate.queryForMap(sql);
            int delayedCount = ((Number) result.get("delayedCount")).intValue();
            return ResponseEntity.ok(delayedCount);            
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to load!!!");
        }
    }

    @GetMapping("/getName/{ApplicationNumber}")
    public String getApplicantName(@PathVariable String ApplicationNumber)
    {
        return applicationsRepo.getApplicantName(ApplicationNumber).get(0);
    }

    @GetMapping("/getApplicationName/{ApplicationNumber}")
    public String getApplicationName(@PathVariable String ApplicationNumber)
    {
        return applicationsRepo.getApplicationName(ApplicationNumber).get(0);
    }

    @GetMapping("getDesignation/{employeeMail}")
    public String getDesignation(@PathVariable String employeeMail)
    {
        return employeeUsersRepo.getDesignation(employeeMail).get(0);
    }

    @GetMapping("/getOfficeId/{employeeMail}")
    public Integer getOfficeId(@PathVariable String employeeMail)
    {
        return employeeUsersRepo.getOfficeId(employeeMail).get(0);
    }

    @GetMapping("/getOfficeName/{officeId}")
    public String getOfficename(@PathVariable Integer officeId)
    {
        return officeUsersRepo.getOfficeName(officeId).get(0);
    }

    @GetMapping("getMail/{ApplicationNumber}")
    public String getMail(@PathVariable String ApplicationNumber)
    {
        return applicationsRepo.getMail(ApplicationNumber).get(0);
    }

    @GetMapping("/getRejectedApplications/{officeId}")
    public List<Rejected> getRejectedApplications(@PathVariable Integer officeId)
    {
        return rejectedRepo.getRejectedApplications(officeId);
    }

    @PostMapping("/reopenApplication/{applicationNumber}")
    public void reopenApplication(@PathVariable String applicationNumber)
    {
        int employeeId = rejectedRepo.findEmpId(applicationNumber).get(0);
        String employeeMail = employeeUsersRepo.findMail(employeeId).get(0);
        String tableName = employeeMail.replaceAll("[^a-zA-Z0-9]", "_");
        int days = 3;

        String sql3 = "INSERT INTO `" + tableName + "` "
        + "(ApplicationNumber, status, created_at,NoOfDays) "
        + "VALUES (?, ?, ?, ?)";
        
        jdbcTemplate.update(sql3,
        applicationNumber,
        "Pending",
        LocalDate.now().toString(),
        days
        );

        rejectedRepo.deleteById(applicationNumber);

        String sql2 = "UPDATE applications SET application_status = 'Reopened' where application_number=?";
        jdbcTemplate.update(sql2,applicationNumber);
    }

    @PostMapping("/goupload")
    public String goupload(@RequestParam("goNumber") String goNumber, @RequestParam("file") MultipartFile pdfFile) {
        try {
            goRepo.savePdf(goNumber, pdfFile.getBytes(),LocalDate.now().toString());
            return "Document uploaded successfully!";
        } catch (Exception e) {
            return "Failed to upload document.";
        }
    }

    @GetMapping("/getgo")
    public List<GO> getAllDocuments() {
        return goRepo.findAll();
    }

    @GetMapping("/downloadgo/{goNumber}")
    public ResponseEntity<ByteArrayResource> downloadDocument(@PathVariable String goNumber) {
        GO go = goRepo.findById(goNumber).orElseThrow(() -> new RuntimeException("Document not found"));
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + goNumber + ".pdf\"")
                .body(new ByteArrayResource(go.getPdfFile()));
    }

    @DeleteMapping("/deletego/{goNumber}")
    public void deleteGo(@PathVariable String goNumber)
    {
        goRepo.deleteById(goNumber);
    }

    @GetMapping("/getPendingsForOffice/{officeId}")
    public List<Applications> getPendingsForOffice(@PathVariable int officeId)
    {
        List<Applications>list = applicationsRepo.getPendingsForOffice(officeId);
        return list;
    }
    
    @GetMapping("/getDelayedForOffice/{officeId}")
    public List<Applications> getDelayedForOffice(@PathVariable int officeId)
    {
        List<Applications>applications = applicationsRepo.getPendingsForOffice(officeId);
        LocalDate currentDate = LocalDate.now();
        List<Applications> delayedApplications = new ArrayList<>();

        for (Applications app : applications) {
            String createdDateString = app.getApplicationDate(); 
            LocalDate createdDate = LocalDate.parse(createdDateString, DateTimeFormatter.ofPattern("dd-MM-yyyy"));

            int maxDays = app.getMaxDays();

            LocalDate dueDate = calculateDueDateExcludingWeekends(createdDate, maxDays);

            if (currentDate.isAfter(dueDate)) {
                delayedApplications.add(app);
            }
        }

        return delayedApplications;
    }

    private LocalDate calculateDueDateExcludingWeekends(LocalDate startDate, int maxDays) {
        int addedDays = 0;
        LocalDate dueDate = startDate;

        while (addedDays < maxDays) {
            dueDate = dueDate.plusDays(1);
            
            if (!isWeekend(dueDate)) {
                addedDays++;
            }
        }

        return dueDate;
    }

    private boolean isWeekend(LocalDate date) {
        DayOfWeek day = date.getDayOfWeek();
        return day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY;
    }

    @GetMapping("/getPendingsForEmployee/{email}")
    public List<Map<String, Object>> getPendingsForEmployee(@PathVariable String email) {
        String tableName = email;

        String query = "SELECT * FROM " + tableName + "";

        List<Map<String, Object>> list = jdbcTemplate.queryForList(query);

        return list;
    }
}
