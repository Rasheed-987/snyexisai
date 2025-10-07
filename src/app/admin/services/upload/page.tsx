'use client';
import React from 'react'
import { useState } from 'react'

export default function ServicesUploadPage() {

    const [serviceTitle, setServiceTitle] = useState<String | null>(null);
    const [image, setImage] = useState<string | null>(null);

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
        setImage(url);
    }
  };

  return (

    <div className='min-h-screen bg-gray-50 p-8 flex flex-col '>
    
     
      <div className="flex flex-col px-auto  gap-4">
        <input type="file" onChange={handleImageUpload} className="border-2 w-[60vw] text-center min-h-[50vh] border-dashed p-2 rounded" />
      </div>
      <div>

        <input type="text" placeholder="Service Title" value={serviceTitle || ''} onChange={(e) => setServiceTitle(e.target.value)} className="border-2 border-dashed p-2 rounded" />
      </div>

         <div className="flex gap-4">
        <button className="px-6 py-2 rounded-full bg-gray-200">Cancel</button>
        <button className="px-6 py-2 rounded-full bg-gray-300">Save</button>
        <button className="px-6 py-2 rounded-full bg-blue-600 text-white">Publish</button>
      </div>
    </div>
  )
}
