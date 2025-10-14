'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminHomePage() {
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    
    if (!isAuthenticated) {
      // Not authenticated, redirect to login
      window.location.href = '/admin/login'
    } else {
      // Authenticated, redirect to dashboard
      window.location.href = '/admin/dashboard'
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Checking authentication...</p>
      </div>
    </div>
  )
}