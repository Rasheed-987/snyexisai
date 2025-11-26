import React, { createContext, useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

interface ProjectContextType {
  projectsData: any[];
  loading: boolean;
  error: string | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const fetchProjects = async () => {
  const response = await fetch('/api/projects?status=published');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  const data = await response.json();
  return data.projects || [];
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: projectsData = [], isLoading: loading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes - data considered fresh
    gcTime: 10 * 60 * 1000, // 10 minutes - cache retention (renamed from cacheTime in v5)
    refetchOnMount: false, // Don't refetch if data is fresh
    refetchOnReconnect: true, // Refetch when internet reconnects
  });

  // Memoize context value to prevent re-renders of all consuming components
  const contextValue = useMemo(() => ({ 
    projectsData, 
    loading, 
    error: error ? (error as Error).message : null 
  }), [projectsData, loading, error]);

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};