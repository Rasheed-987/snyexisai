'use client'
import React from 'react'
import { useState } from 'react'

const CareerUploadPage: React.FC = () => {

    const [content, setContent] = useState<string>('');

  return (
    <div className='min-h-screen bg-gray-50 p-8 flex flex-col '>
      <input
        type="text"
        placeholder="Content Here"
        className="border-2  border-dashed  font-semibold mb-4 text-center w-[60vw] h-[50vh] "
        value={content}
        onChange={(e) =>  setContent(e.target.value)}
      />
            <div className="flex justify-center gap-4">
        <button className="px-6 py-2 rounded-full bg-gray-200">Cancel</button>
        <button className="px-6 py-2 rounded-full bg-gray-300">Save</button>
        <button className="px-6 py-2 rounded-full bg-blue-600 text-white">Publish</button>
      </div>
    </div>
  )
}

export default CareerUploadPage
