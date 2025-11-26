import React, { createContext, useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

interface CaseStudyContextType {
  caseStudiesData: any[];
  loading: boolean;
  error: string | null;
}

const CaseStudyContext = createContext<CaseStudyContextType | undefined>(undefined);

const fetchCaseStudies = async () => {
  const response = await fetch('/api/case-studies?status=published');
  if (!response.ok) {
    throw new Error('Failed to fetch case studies');
  }
  const data = await response.json();
  return data.caseStudies || [];
};

export const CaseStudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: caseStudiesData = [], isLoading: loading, error } = useQuery({
    queryKey: ['caseStudies'],
    queryFn: fetchCaseStudies,
    staleTime: 5 * 60 * 1000, // 5 minutes - data considered fresh
    gcTime: 10 * 60 * 1000, // 10 minutes - cache retention (renamed from cacheTime in v5)
    refetchOnMount: false, // Don't refetch if data is fresh
    refetchOnReconnect: true, // Refetch when internet reconnects
  });

  // Memoize context value to prevent re-renders of all consuming components
  const contextValue = useMemo(() => ({ 
    caseStudiesData, 
    loading, 
    error: error ? (error as Error).message : null 
  }), [caseStudiesData, loading, error]);

  return (
    <CaseStudyContext.Provider value={contextValue}>
      {children}
    </CaseStudyContext.Provider>
  );
};

export const useCaseStudies = () => {
  const context = useContext(CaseStudyContext);
  if (!context) {
    throw new Error('useCaseStudies must be used within a CaseStudyProvider');
  }
  return context;
};