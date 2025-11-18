import React, { createContext, useContext } from 'react';
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
  });

  return (
    <CareerContext.Provider value={{ 
      careersData, 
      loading, 
      error: error ? (error as Error).message : null 
    }}>
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