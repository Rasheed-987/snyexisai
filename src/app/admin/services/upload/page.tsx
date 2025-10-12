'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { UploadBox } from '@/components/upload/UploadBox'
import { handleImageUpload } from '@/utils/dashboard'

interface ImageSlot {
  id: string
  file: File | null
  previewUrl: string | null
}

export default function ServicesUploadPage() {
  const [serviceTitle, setServiceTitle] = useState<string | null>(null)
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([
    { id: 'banner', file: null, previewUrl: null }
  ])

  
  const onSubmit = () => {
    console.log(imageSlots)
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
