import React, { createContext, useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

interface CareerContextType {
  careersData: any[];
  loading: boolean;
  error: string | null;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

const fetchCareers = async () => {
  const response = await fetch('/api/careers?status=published');
  if (!response.ok) {
    throw new Error('Failed to fetch careers');
  }
  const data = await response.json();
  return data.careers || [];
};

export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: careersData = [], isLoading: loading, error } = useQuery({
    queryKey: ['careers'],
    queryFn: fetchCareers,
    staleTime: 5 * 60 * 1000, // 5 minutes - data considered fresh
    gcTime: 10 * 60 * 1000, // 10 minutes - cache retention (renamed from cacheTime in v5)
    refetchOnMount: false, // Don't refetch if data is fresh
    refetchOnReconnect: true, // Refetch when internet reconnects
  });

  // Memoize context value to prevent re-renders of all consuming components
  const contextValue = useMemo(() => ({ 
    careersData, 
    loading, 
    error: error ? (error as Error).message : null 
  }), [careersData, loading, error]);

  return (
    <CareerContext.Provider value={contextValue}>
      {children}
    </CareerContext.Provider>
  );
};

export const useCareerContext = () => {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error('useCareerContext must be used within a CareerProvider');
  }
  return context;
};