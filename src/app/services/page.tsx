  'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ServicesCard from '@/components/services/servicesCard';

const Service = () => {
  const [loading, setLoading] = useState(true);
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await fetch('/api/services?status=published');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setServicesData(data.services || []);
      } catch (error: any) {
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className=" bg-white    rounded-b-[80px] pb-[150px]    relative z-50">
      <div className='pt-20'>
        <h2 className="text-[#1A2341] text-3xl text-center sm:text-4xl lg:text-5xl font-medium leading-tight mb-20">
          Our Services
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service: any) => (
            <ServicesCard
              title={service.serviceTitle}
              image={service.images?.banner} // Adjusted based on schema
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
