import React, { createContext, useContext, useState, useEffect } from 'react';

interface CareerContextType {
  careersData: any[];
  loading: boolean;
  error: string | null;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [careersData, setCareersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareersData = async () => {
      try {
        const response = await fetch('/api/careers?status=published');
        if (!response.ok) {
          throw new Error('Failed to fetch careers');
        }
        const data = await response.json();
        setCareersData(data.careers || []);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchCareersData();
  }, []);

  return (
    <CareerContext.Provider value={{ careersData, loading, error }}>
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