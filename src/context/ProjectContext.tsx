import React, { createContext, useContext } from 'react';
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
  });

  return (
    <ProjectContext.Provider value={{ 
      projectsData, 
      loading, 
      error: error ? (error as Error).message : null 
    }}>
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