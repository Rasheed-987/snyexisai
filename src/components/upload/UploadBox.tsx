import React from 'react'
import { Upload } from 'lucide-react'

interface UploadBoxProps {
  label?: string
  image?: string | null
  onUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export function UploadBox({ 
  label = "Upload Image", 
  image, 
  onUpload, 
  className = '' 
}: UploadBoxProps) {
  return (
    <div className={`${className} border-2 border-dashed rounded-lg flex flex-col justify-center items-center overflow-hidden relative border-gray-300 hover:border-gray-400`}>
      {image ? (
        <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
      ) : (
        <div className="py-8 px-4 flex flex-col items-center justify-center">
          <p className="font-semibold text-base text-gray-800 mb-3">{label}</p>
          <Upload className="h-6 w-6 text-gray-500 mb-2" />
          <label className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onUpload}
            />
          </label>
        </div>
      )}
    </div>
  )
}