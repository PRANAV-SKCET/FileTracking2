package com.springboot.springboot.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Applications {
    @Id
    private String applicationNumber;
    private String applicantName;
    private String applicantMail;
    private String applicantMobileNumber;
    private String applicantAddress;
    private int applicationTypeId;
    private String applicationName;
    private String applicationStatus;
    private String applicationDate;
    private String applicationClosedDate;
    private int officeId;
    private int maxDays;

    public Applications() {
    }
    public Applications(String applicationNumber, String applicantName, String applicantMail,
            String applicantMobileNumber, String applicantAddress, int applicationTypeId, String applicationName,
            String applicationStatus, String applicationDate, String applicationClosedDate,int officeId,int maxDays) {
        this.applicationNumber = applicationNumber;
        this.applicantName = applicantName;
        this.applicantMail = applicantMail;
        this.applicantMobileNumber = applicantMobileNumber;
        this.applicantAddress = applicantAddress;
        this.applicationTypeId = applicationTypeId;
        this.applicationName = applicationName;
        this.applicationStatus = applicationStatus;
        this.applicationDate = applicationDate;
        this.applicationClosedDate = applicationClosedDate;
        this.officeId=officeId;
        this.maxDays=maxDays;
    }
    public String getApplicationNumber() {
        return applicationNumber;
    }
    public void setApplicationNumber(String applicationNumber) {
        this.applicationNumber = applicationNumber;
    }
    public String getApplicantName() {
        return applicantName;
    }
    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }
    public String getApplicantMail() {
        return applicantMail;
    }
    public void setApplicantMail(String applicantMail) {
        this.applicantMail = applicantMail;
    }
    public String getApplicantMobileNumber() {
        return applicantMobileNumber;
    }
    public void setApplicantMobileNumber(String applicantMobileNumber) {
        this.applicantMobileNumber = applicantMobileNumber;
    }
    public String getApplicantAddress() {
        return applicantAddress;
    }
    public void setApplicantAddress(String applicantAddress) {
        this.applicantAddress = applicantAddress;
    }
    public int getApplicationTypeId() {
        return applicationTypeId;
    }
    public void setApplicationTypeId(int applicationTypeId) {
        this.applicationTypeId = applicationTypeId;
    }
    public String getApplicationName() {
        return applicationName;
    }
    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }
    public String getApplicationStatus() {
        return applicationStatus;
    }
    public void setApplicationStatus(String applicationStatus) {
        this.applicationStatus = applicationStatus;
    }
    public String getApplicationDate() {
        return applicationDate;
    }
    public void setApplicationDate(String applicationDate) {
        this.applicationDate = applicationDate;
    }
    public String getApplicationClosedDate() {
        return applicationClosedDate;
    }
    public void setApplicationClosedDate(String applicationClosedDate) {
        this.applicationClosedDate = applicationClosedDate;
    }
    public int getOfficeId() {
        return officeId;
    }
    public void setOfficeId(int officeId) {
        this.officeId = officeId;
    }
    public int getMaxDays() {
        return maxDays;
    }
    public void setMaxDays(int maxDays) {
        this.maxDays = maxDays;
    }

    
}
