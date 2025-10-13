'use client'

import React from 'react'
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
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([
    { id: 'banner', file: null, previewUrl: null }
  ])
  const [isRouterMounted, setIsRouterMounted] = useState(false);

  useEffect(() => {
    setIsRouterMounted(true);
  }, []);

  const onSubmit = async () => {
    if (!isRouterMounted) {
      console.error('NextRouter is not mounted.');
      return;
    }

    try {
      if (!serviceTitle || !imageSlots[0].file) {
        alert('Please provide a service title and upload an image.');
        return;
      }

      const form = new FormData();
      form.append('title', serviceTitle);
      form.append('image', imageSlots[0].file);

      const response = await fetch('/api/services', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        alert('Service uploaded successfully!');
        router.push('/admin/services');
      } else {
        alert('Failed to upload service.');
      }
    } catch (error) {
      console.error('Error uploading service:', error);
      alert('An error occurred while uploading the service.');
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
          className="border-2 border-dashed p-2 rounded"
        />
      </div>

      <div className="flex gap-4">
        <button className="px-6 py-2 rounded-full bg-gray-200">Cancel</button>
        <button className="px-6 py-2 rounded-full bg-gray-300">Save</button>
        <button onClick={onSubmit} className="px-6 py-2 rounded-full bg-blue-600 text-white">
          Publish
        </button>
      </div>
    </div>
  )
}
