'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ServicesProvider } from '@/context/ServicesContext'
import { CaseStudyProvider } from '@/context/CaseStudyContext'
import { ProjectProvider } from '@/context/ProjectContext'
import { CareerProvider } from '@/context/CareerContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <CareerProvider>
        <ProjectProvider>
          <CaseStudyProvider>
            <ServicesProvider>
              {children}
              <ToastContainer position="bottom-right" />
            </ServicesProvider>
          </CaseStudyProvider>
        </ProjectProvider>
      </CareerProvider>
    </QueryClientProvider>
  )
}