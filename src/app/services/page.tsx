'use client';
import React from 'react';
import { useServices } from '@/context/ServicesContext';
import Image from 'next/image';
import ServicesCard from '@/components/services/servicesCard';

const Service = () => {
  const { servicesData, loading, error } = useServices();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading services...</p>
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
    <section className=" bg-background   rounded-b-[80px] pb-[150px]  pt-10  relative z-50">
      <div className='pt-20'>
        <h2 className="text-foreground text-3xl text-center sm:text-4xl lg:text-4xl 2xl:text-5xl font-medium leading-tight mb-20">
          Our Services
        </h2>
      </div>

      <div className=" mx-auto px-3 lg:px-12  2xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service: any) => (
            <ServicesCard
              key={service._id}
              title={service.serviceTitle}
              image={service.images?.banner}
              requirements={service.requirements}
              requirementsTitle={service.requirementsTitle}
              description={service.description}
              largeCard={service.largeCard}
            
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
