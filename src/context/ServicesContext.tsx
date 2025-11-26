import React, { createContext, useContext, useMemo } from 'react';
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
    staleTime: 5 * 60 * 1000, // 5 minutes - data considered fresh
    cacheTime: 10 * 60 * 1000, // 10 minutes - cache retention
    refetchOnMount: false, // Don't refetch if data is fresh
    refetchOnReconnect: true, // Refetch when internet reconnects
  });

  // Memoize context value to prevent re-renders of all consuming components
  const contextValue = useMemo(() => ({ 
    servicesData, 
    loading, 
    error: error ? (error as Error).message : null 
  }), [servicesData, loading, error]);

  return (
    <ServicesContext.Provider value={contextValue}>
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