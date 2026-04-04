package com.jobportal.Job.Portal.service;

import com.jobportal.Job.Portal.dto.JobDTO;
import com.jobportal.Job.Portal.exception.JobPortalException;
import jakarta.validation.Valid;

import java.util.List;

public interface JobService {

   public JobDTO postJob(@Valid JobDTO jobDTO) throws JobPortalException;

   public List<JobDTO> getAllJobs()throws JobPortalException;

   public JobDTO getJob(Long id) throws JobPortalException;
}
