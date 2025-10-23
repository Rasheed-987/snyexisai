import React, { createContext, useContext, useState, useEffect } from 'react';

interface CaseStudyContextType {
  caseStudiesData: any[];
  loading: boolean;
  error: string | null;
}

const CaseStudyContext = createContext<CaseStudyContextType | undefined>(undefined);

export const CaseStudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [caseStudiesData, setCaseStudiesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudiesData = async () => {
      try {
        const response = await fetch('/api/case-studies?status=published');
        if (!response.ok) {
          throw new Error('Failed to fetch case studies');
        }
        const data = await response.json();
        setCaseStudiesData(data.caseStudies || []);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudiesData();
  }, []);

  return (
    <CaseStudyContext.Provider value={{ caseStudiesData, loading, error }}>
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