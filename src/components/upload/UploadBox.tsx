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
    <div
      className={`${className} border-2 border-dashed rounded-lg flex flex-col justify-center items-center overflow-hidden relative border-gray-300 hover:border-gray-400 group`}
    >
      {/* If image exists */}
      {image ? (
        <label className="w-full h-full cursor-pointer relative group">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-60"
          />
          {/* Overlay with icon/text on hover */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 text-white">
            <Upload className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Change Image</span>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onUpload}
          />
        </label>
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
