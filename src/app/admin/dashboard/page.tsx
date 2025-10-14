'use client'

import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { CareerCard } from '@/components/admin/CareerCard'
import { CaseStudyCard } from '@/components/admin/AdminCards'
import {Stat, CareerPosting, CaseStudy as CaseStudyCardType} from '@/types/admin'
import { fetchCaseStudies, formatDate, CaseStudy } from '@/utils/dashboard'
import {useRouter} from 'next/navigation'

export default function AdminDashboardPage() {
 
  const [date,setDate] = useState('');
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [careers, setCareers] = useState<CareerPosting[]>([]);
  const [careersLoading, setCareersLoading] = useState(true);
  
  // Add state for dynamic stats
  const [statsData, setStatsData] = useState({
    projects: 0,
    services: 0,
    caseStudies: 0,
    careers: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
    setDate(currentDate);
  }, []);
  
  useEffect(() => {
    fetchCaseStudies(setCaseStudies, setLoading, setError, { limit: 7, status: 'published' });
  }, []);

  // Fetch stats data from all APIs
  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        setStatsLoading(true);
        
        // Fetch all data in parallel
        const [projectsRes, servicesRes, caseStudiesRes, careersRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/services'),
          fetch('/api/case-studies'),
          fetch('/api/careers')
        ]);

        const [projectsData, servicesData, caseStudiesData, careersData] = await Promise.all([
          projectsRes.json(),
          servicesRes.json(),
          caseStudiesRes.json(),
          careersRes.json()
        ]);

        setStatsData({
          projects: projectsData.statusCounts?.total || 0,
          services: servicesData.statusCounts?.total || 0,
          caseStudies: caseStudiesData.statusCounts?.total || 0,
          careers: careersData.statusCounts?.total || 0
        });
      } catch (error) {
        console.error('Error fetching stats data:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStatsData();
  }, []);

  // Fetch careers for dashboard
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setCareersLoading(true);
        const response = await fetch('/api/careers?limit=5&status=published');
        
        if (!response.ok) {
          throw new Error('Failed to fetch careers');
        }
        
        const data = await response.json();
        
        if (data.success && data.careers) {
          // Transform API data to match our CareerPosting interface
          const careerPostings: CareerPosting[] = data.careers.map((career: any, index: number) => ({
            id: career._id,
            jobTitle: career.jobTitle,
            jobType: career.jobType,
            company: career.company
          }));
          setCareers(careerPostings);
        }
      } catch (error) {
        console.error('Error fetching careers:', error);
      } finally {
        setCareersLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const stats: Stat[] = [
    {
      title: statsLoading ? '...' : statsData.projects.toString().padStart(2, '0'),
      subtitle: 'Projects',
      icon: (
        <Image
          src="/images/admin/career1.svg"
          alt="Projects"
          width={21.53}
          height={21.53}
          className="w-[21.53px] h-[21.53px]"
        />
      ),
      bgColor: 'bg-[#327AED]',
      textColor: 'text-white',
     
    },
    {
      title: statsLoading ? '...' : statsData.services.toString().padStart(2, '0'),
      subtitle: 'Services',
      icon: (
        <Image
          src="/images/admin/services1.svg"
          alt="Services"
          width={21.53}
          height={21.53}
          className="w-[21.53px] h-[21.53px]"
        />
      ),
      bgColor: 'bg-[#327AED]',
      textColor: 'text-white',
     
    },
    {
      title: statsLoading ? '...' : statsData.caseStudies.toString().padStart(2, '0'),
      subtitle: 'Case Studies',
      icon: (
        <Image
          src="/images/admin/case1.svg"
          alt="Case Studies"
          width={21.53}
          height={21.53}
          className="w-[21.53px] h-[21.53px]"
        />
      ),
      bgColor: 'bg-[#327AED]',
      textColor: 'text-white',
     
    },
    {
      title: statsLoading ? '...' : statsData.careers.toString().padStart(2, '0'),
      subtitle: 'Jobs',
      icon: (
        <Image
          src="/images/admin/job.svg"
          alt="Career"
          width={21.53}
          height={21.53}
          className="w-[21.53px] h-[21.53px]"
        />
      ),
      bgColor: 'bg-[#327AED]',
      textColor: 'text-white',
     
    }
  ]

  

  return (
    <div className="p-4 md:p-6 bg-[#ECEFF3] min-h-screen">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-medium text-[#0F1C3D] mb-2">
          Welcome back, Alex
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Take a look your progress for today {date}.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:bg-white rounded-[21px]  lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white  rounded-2xl p-4 md:p-6">
            <div className="flex items-center space-x-3 md:space-x-4">

             <div className=' w-[50px] md:w-[60px] bg-[#E2EDFF] rounded-[13px] h-[50px] md:h-[60px] flex items-center justify-center'>

              <div className={`${stat.bgColor} ${stat.textColor} w-[30px] md:w-[35px] h-[30px] md:h-[35px] rounded-full flex items-center justify-center`}>
                {stat.icon}
              </div>
             </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-medium text-[#0F1C3D] mb-1">
                  {stat.title}
                </h3>
                <p className="text-xs md:text-sm text-[#0F1C3D]/70 font-medium">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Case Studies Section */}
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-5 gap-4 lg:gap-5">

        <div className="space-y-4 rounded-[21px] w-full lg:w-[65%] bg-[#FFFFFF] p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-medium text-[#0F1C3D]">
            Latest Case Studies
          </h2>
          <button onClick={()=>router.push('/admin/case-studies')} className="text-[#327AED] text-sm font-medium hover:underline">
            View All →
          </button>
        </div>
         
{loading ? (
  <div className="text-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
    <p className="text-gray-600 text-sm">Loading case studies...</p>
  </div>
) : error ? (
  <div className="text-center py-8">
    <p className="text-red-600 text-sm">Error: {error}</p>
  </div>
) : caseStudies.length === 0 ? (
  <div className="text-center py-8">
    <p className="text-gray-600 text-sm">No case studies found</p>
  </div>
) : (
  caseStudies.map((caseStudy) => (
    <CaseStudyCard  
      key={caseStudy._id}
      id={caseStudy._id}
      title={caseStudy.caseTitle}
      description={caseStudy.subtitle || caseStudy.addLine}
      author="Admin"
      timeAgo={formatDate(caseStudy.createdAt)}
      thumbnail={caseStudy.images.banner || '/images/placeholder.png'}
      status={(caseStudy.status as 'draft' | 'published') || 'published'}
      className="flex flex-row items-center bg-[#F4F0ED] rounded-[21px] p-4 space-y-0 space-x-0 [&>div:last-child]:hidden"
      onEdit={() => router.push(`/admin/case-studies/edit/${caseStudy._id}`)}
      onUnpublish={() => {}}
      onDelete={() => {}}
    />
  ))
)}


        </div>
        <div className="w-full lg:flex-1 bg-white rounded-[21px] p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-medium text-[#0F1C3D]">
              Career Postings
            </h2>
            <button onClick={()=>router.push('/admin/career')} className="text-[#327AED] text-sm font-medium hover:underline">
              View All →
            </button>
          </div>
          <div className="space-y-2">
            {careersLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 text-sm mt-2">Loading careers...</p>
              </div>
            ) : careers.length > 0 ? (
              careers.map((career) => (
                <CareerCard 
                  key={career.id}
                  career={career} 
                  onView={(id: string) => router.push(`/admin/career/edit/${id}`)} 
                />
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600 text-sm">No career postings found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}