'use client'

import React from 'react'
import AdminContentLayout from '@/components/admin/AdminContentLayout'
import { JobCard } from '@/components/admin/AdminCards'
import { useTitle } from '@/hooks/titleContext'
import {useRouter} from 'next/navigation'

const career = () => {

const dummyJobs = [
{
  id: "5",
  jobTitle: "Frontend React Developer",
  company: "StartupHub Technologies",
  location: "250 Innovation Drive, Seattle, WA 98101",
  jobType: "Full Time",
  description: "Join our dynamic team to build modern, responsive web applications using React, TypeScript, and modern CSS frameworks. You'll collaborate with designers and backend developers to create seamless user experiences."
},
{
  id: "6", 
  jobTitle: "DevOps Engineer",
  company: "CloudFirst Solutions",
  location: "Remote - United States",
  jobType: "Contract",
  description: "Manage and optimize our cloud infrastructure on AWS. Implement CI/CD pipelines, monitor system performance, and ensure high availability of our applications serving global customers."
},
{
  id: "7",
  jobTitle: "Mobile App Developer",
  company: "NextGen Mobile",
  location: "1500 Market Street, Philadelphia, PA 19102",
  jobType: "Part Time",
  description: "Develop cross-platform mobile applications using React Native and Flutter. Work on exciting consumer-facing apps with millions of downloads and focus on performance optimization."
},
{
  id: "8",
  jobTitle: "Data Science Intern",
  company: "Analytics Pro",
  location: "600 University Ave, Palo Alto, CA 94301",
  jobType: "Internship",
  description: "Gain hands-on experience in machine learning and data analysis. Work with large datasets, build predictive models, and contribute to real-world data science projects in a mentorship environment."
},
{
  id: "9",
  jobTitle: "Cybersecurity Specialist",
  company: "SecureNet Corp",
  location: "1200 Defense Boulevard, Arlington, VA 22202",
  jobType: "Full Time",
  description: "Protect our organization's digital assets by implementing security protocols, conducting vulnerability assessments, and responding to security incidents. Stay ahead of emerging cyber threats."
}
]

  const router = useRouter();
  const { setTitle } = useTitle();

  // Set title when page loads
  React.useEffect(() => {
    setTitle('Career');
  }, [setTitle]);

   const onUpload = () => {
     router.push('/admin/career/upload');
   }

   const handleEdit = (id) => {
     console.log('Edit job:', id)
     // Add edit logic here
   }

   const handleUnpublish = (id) => {
     console.log('Unpublish job:', id)
     // Add unpublish logic here
   }

   const handleDelete = (id) => {
     console.log('Delete job:', id)
     // Add delete logic here
   }

    // Props for AdminContentLayout
    const className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"

    
  return (
    <>
      <AdminContentLayout title="Career" uploadLabel="Add Career" onUpload={onUpload} className={className}>
      {
        dummyJobs.map(job => (
          <JobCard 
            key={job.id} 
            id={job.id} 
            jobTitle={job.jobTitle} 
            company={job.company} 
            location={job.location} 
            jobType={job.jobType} 
            description={job.description}
            onEdit={() => handleEdit(job.id)}
            onUnpublish={() => handleUnpublish(job.id)}
            onDelete={() => handleDelete(job.id)}
          />
        ))
      }
      </AdminContentLayout>
    </>
  )
}




export default career
