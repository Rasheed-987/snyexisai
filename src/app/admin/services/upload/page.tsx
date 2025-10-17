'use client'

import React from 'react'
import Alert from '@/components/ui/Alert'
import { useState, useEffect } from 'react'
import { UploadBox } from '@/components/upload/UploadBox'
import { handleImageUpload } from '@/utils/dashboard'
import { useRouter } from 'next/navigation';

interface ImageSlot {
  id: string
  file: File | null
  previewUrl: string | null
}

export default function ServicesUploadPage() {
  const router = useRouter();

  const [serviceTitle, setServiceTitle] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([
    { id: 'banner', file: null, previewUrl: null }
  ])
  const [isRouterMounted, setIsRouterMounted] = useState(false);

  useEffect(() => {
    setIsRouterMounted(true);
  }, []);

  // Save as draft (only requires title)
  const onSaveDraft = async () => {
    if (!isRouterMounted) {
      console.error('NextRouter is not mounted.');
      return;
    }
    try {
      if (!serviceTitle) {
        setUploadError('Please provide a service title.');
        return;
      }
      const form = new FormData();
      form.append('title', serviceTitle);
      form.append('status', 'draft');
      if (imageSlots[0].file) {
        form.append('image', imageSlots[0].file);
      }
      const response = await fetch('/api/services', {
        method: 'POST',
        body: form,
      });
      if (response.ok) {
        setUploadSuccess('Service draft saved successfully!');
        setTimeout(() => {
          setUploadSuccess(null);
          router.push('/admin/services');
        }, 2000);
      } else {
        setUploadError('Failed to save service draft.');
      }
    } catch (error) {
      console.error('Error saving service draft:', error);
      setUploadError('An error occurred while saving the service draft.');
    }
  }

  // Publish (requires title and image)
  const onPublish = async () => {
    if (!isRouterMounted) {
      console.error('NextRouter is not mounted.');
      return;
    }
    try {
      if (!serviceTitle || !imageSlots[0].file) {
        setUploadError('Please provide a service title and upload an image.');
        return;
      }
      const form = new FormData();
      form.append('title', serviceTitle);
      form.append('image', imageSlots[0].file);
      form.append('status', 'published');
      const response = await fetch('/api/services', {
        method: 'POST',
        body: form,
      });
      if (response.ok) {
        setUploadSuccess('Service published successfully!');
        setTimeout(() => {
          setUploadSuccess(null);
          router.push('/admin/services');
        }, 2000);
      } else {
        setUploadError('Failed to publish service.');
      }
    } catch (error) {
      console.error('Error publishing service:', error);
      setUploadError('An error occurred while publishing the service.');
    }
  }

  
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col ">
     
      <UploadBox
        label="Upload Service Image"
        image={imageSlots[0].previewUrl}
        onUpload={(e) => handleImageUpload(e, 0, imageSlots, setImageSlots)}
        className="mb-4 min-h-[50vh]"
      />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Service Title"
          value={serviceTitle || ''}
          onChange={(e) => setServiceTitle(e.target.value)}
          className="w-full max-w-lg rounded-full px-4 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

 {/* Error and Success Messages */}
      {uploadError && (
        <div className="w-full max-w-lg mb-4">
          <Alert type="error" message={uploadError} onClose={() => setUploadError(null)} />
        </div>
      )}
      {uploadSuccess && (
        <div className="w-full max-w-lg mb-4">
          <Alert type="success" message={uploadSuccess} onClose={() => setUploadSuccess(null)} />
        </div>
      )}


      <div className="flex gap-4">
        <button className="px-6 py-2 rounded-full bg-gray-200" onClick={() => router.push('/admin/services')}>Cancel</button>
        <button className="px-6 py-2 rounded-full bg-gray-300" onClick={onSaveDraft}>Save Draft</button>
        <button className="px-6 py-2 rounded-full bg-blue-600 text-white" onClick={onPublish}>
          Publish
        </button>
      </div>
    </div>
  )
}
