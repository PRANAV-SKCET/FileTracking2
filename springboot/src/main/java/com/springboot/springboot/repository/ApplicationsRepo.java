package com.springboot.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


import com.springboot.springboot.entity.Applications;

public interface ApplicationsRepo extends JpaRepository<Applications,String>{
    @Modifying
    @Transactional
    @Query(value = "UPDATE applications SET application_status = 'Completed' , application_closed_date=?2 WHERE application_number=?1", nativeQuery = true)
    public void edit(String applicationNumber,String date);

    @Modifying
    @Transactional
    @Query(value = "SELECT applicant_name FROM applications WHERE application_number=?1", nativeQuery = true)
    public List<String> getApplicantName(String applicationNumber);

    @Modifying
    @Transactional
    @Query(value = "SELECT application_name FROM applications WHERE application_number=?1", nativeQuery = true)
    public List<String> getApplicationName(String applicationNumber);

    @Modifying
    @Transactional
    @Query(value = "SELECT applicant_mail FROM applications WHERE application_number=?1", nativeQuery = true)
    public List<String> getMail(String applicationNumber);

    @Modifying
    @Transactional
    @Query(value = "SELECT * FROM applications WHERE office_id=?1 and application_status!='Completed' ORDER BY application_type_id , application_date", nativeQuery = true)
    public List<Applications> getPendingsForOffice(int officeId);
}
