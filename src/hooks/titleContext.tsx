'use client'
import { createContext, useContext, useState, ReactNode } from "react";

interface TitleContextType {
  title: string;
  setTitle: (title: string) => void;
}

export const TitleContext = createContext<TitleContextType | undefined>(undefined);

// Provider component
export function TitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState<string>('Dashboard');

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
}

// Custom hook for easier usage
export function useTitle() {
  const context = useContext(TitleContext);
  if (context === undefined) {
    throw new Error('useTitle must be used within a TitleProvider');
  }
  return context;
}