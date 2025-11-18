import React, { createContext, useContext } from 'react';
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
  });

  return (
    <CaseStudyContext.Provider value={{ 
      caseStudiesData, 
      loading, 
      error: error ? (error as Error).message : null 
    }}>
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