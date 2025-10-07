'use client'

import React from 'react'
import AdminContentLayout from '@/components/admin/AdminContentLayout'
import { JobCard } from '@/components/admin/AdminCards'
import { useTitle } from '@/hooks/titleContext'

const career = () => {

  
  const { setTitle } = useTitle();

  // Set title when page loads
  React.useEffect(() => {
    setTitle('Career');
  }, [setTitle]);

   const onUpload = () => {
     // Handle upload logic here
   }

    // Props for AdminContentLayout
    const className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"

    const dummyJobs = [
      {
        id: "1",
        jobTitle: "Software Engineer",
        company: "Human Capital",
        location: "4140 Parker Rd. Allentown, New Mexico 31134",
        jobType: "Full Time",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        postedDate: "2 days ago",
        salary: "$80k - $120k",
        experience: "2-5 years",
        department: "Engineering",
        applicationDeadline: "October 15, 2025",
        isRemote: true,
        requirements: ["React expertise", "TypeScript", "Node.js"],
        benefits: ["Health insurance", "401(k) matching", "Remote work"]
      },
      {
        id: "2",
        jobTitle: "Product Manager",
        company: "Tech Solutions",
        location: "123 Main St. San Francisco, CA",
        jobType: "Full Time",
        description: "The Product Manager will oversee the development and delivery of innovative solutions to meet customer needs.",
        postedDate: "1 week ago",
        salary: "$100k - $150k",
        experience: "5+ years",
        department: "Product",
        applicationDeadline: "October 20, 2025",
        isRemote: false,
        requirements: ["Agile methodology", "Leadership skills", "Market research"],
        benefits: ["Stock options", "Flexible hours", "Health insurance"]
      },
      {
        id: "3",
        jobTitle: "UI/UX Designer",
        company: "Creative Agency",
        location: "456 Elm St. New York, NY",
        jobType: "Contract",
        description: "Design and optimize user interfaces for web and mobile applications.",
        postedDate: "3 days ago",
        salary: "$60k - $90k",
        experience: "3-5 years",
        department: "Design",
        applicationDeadline: "October 25, 2025",
        isRemote: true,
        requirements: ["Figma", "Adobe XD", "User research"],
        benefits: ["Remote work", "Project-based bonuses"]
      }
    ];
  return (
    <>
      <AdminContentLayout title="Career" uploadLabel="Add Career" onUpload={onUpload} className={className}>
      {
        dummyJobs.map(job => (<JobCard id={job.id} key={job.id} jobTitle={job.jobTitle} company={job.company} location={job.location} jobType={job.jobType} description={job.description} postedDate={job.postedDate} salary={job.salary} experience={job.experience} department={job.department} applicationDeadline={job.applicationDeadline} isRemote={job.isRemote} requirements={job.requirements} benefits={job.benefits} />))
      }
      </AdminContentLayout>
    </>
  )
}




export default career
