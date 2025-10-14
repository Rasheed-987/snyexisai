'use client'

import React, { useEffect, useState } from 'react'
import AdminContentLayout from '@/components/admin/AdminContentLayout'
import { ServiceCard } from '@/components/admin/AdminCards'
import { useTitle } from '@/hooks/titleContext'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/utils/dashboard'

interface Service {
  _id: string;
  serviceId: string;
  serviceTitle: string;
  images: {
    banner?: string;
    gallery: string[];
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function ServicesPage() {
  const { setTitle } = useTitle();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/services')
        
        if (!response.ok) {
          throw new Error('Failed to fetch services')
        }
        
        const servicesData = await response.json()
        console.log('Fetched services:', servicesData)
        
        if (servicesData.success) {
          setServices(servicesData.services)
        } else {
          throw new Error('API returned unsuccessful response')
        }
      } catch (error) {
        console.error('Error fetching services:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch services')
      } finally {
        setLoading(false)
      }
    }

    if (mounted) {
      fetchServices()
    }
  }, [mounted])

  useEffect(() => {
    setTitle('Services');
  }, [setTitle]);

  const handleUpload = () => {
    console.log('Upload Service clicked')
    router.push('/admin/services/upload');
  };

  const handleEdit = (id: string) => {
    console.log('Edit service:', id)
    router.push(`/admin/services/edit/${id}`);
  };

  const handleUnpublish = (id: string) => {
    console.log('Unpublish service:', id)
    // Add unpublish logic here
  };

  const handleDelete = async (id: string) => {
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this service? This action cannot be undone.')
    
    if (!confirmed) return
    
    try {
      setLoading(true)
      console.log('Deleting service:', id)
      
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE'
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete service')
      }
      
      console.log('✅ Service deleted successfully')
      
      // Remove service from local state
      setServices(services.filter(service => service._id !== id))
      
      // Show success message (optional - you can add a toast notification)
      alert('Service deleted successfully!')
      
    } catch (error) {
      console.error('❌ Error deleting service:', error)
      alert(error instanceof Error ? error.message : 'Failed to delete service')
    } finally {
      setLoading(false)
    }
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <AdminContentLayout
        title="Services"
        uploadLabel="Upload Service"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <div className="animate-pulse bg-gray-200 h-8 w-32 rounded mx-auto"></div>
        </div>
      </AdminContentLayout>
    )
  }

  // Loading state
  if (loading) {
    return (
      <AdminContentLayout
        title="Services"
        uploadLabel="Upload Service"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </AdminContentLayout>
    )
  }

  // Error state
  if (error) {
    return (
      <AdminContentLayout
        title="Services"
        uploadLabel="Upload Service"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </AdminContentLayout>
    )
  }

  // Empty state
  if (services.length === 0) {
    return (
      <AdminContentLayout
        title="Services"
        uploadLabel="Upload Service"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-4">No services found</p>
          <button 
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload Your First Service
          </button>
        </div>
      </AdminContentLayout>
    )
  }

  return (
    <AdminContentLayout
      title="Services"
      uploadLabel="Upload Service"
      onUpload={handleUpload}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {services.map((service: Service) => (
        <ServiceCard
          key={service._id}
          id={service._id}
          title={service.serviceTitle}
          description={service.serviceTitle} // You can modify this based on your service data structure
          author="Admin" // You can modify this based on your user system
          timeAgo={formatDate(service.createdAt)}
          thumbnail={service.images.banner || '/images/placeholder.png'}
          onEdit={() => handleEdit(service._id)}
          status={service.status as 'draft' | 'published'}
          onUnpublish={() => handleUnpublish(service._id)}
          onDelete={() => handleDelete(service._id)}
        />
      ))}
    </AdminContentLayout>
  )
}