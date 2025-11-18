import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

interface ServicesContextType {
  servicesData: any[];
  loading: boolean;
  error: string | null;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

const fetchServices = async () => {
  const response = await fetch('/api/services?status=published');
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  const data = await response.json();
  return data.services || [];
};

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: servicesData = [], isLoading: loading, error } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  return (
    <ServicesContext.Provider value={{ 
      servicesData, 
      loading, 
      error: error ? (error as Error).message : null 
    }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};