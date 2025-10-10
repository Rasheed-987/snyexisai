'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { UploadBox } from '@/components/upload/UploadBox'


interface ImageSlot {
  id: string
  file: File | null
  previewUrl: string | null
}

const ProjectUploadPage = () => {
  const [projectTitle, setProjectTitle] = useState('')
  const [tagline, setTagline] = useState('')
  const [addtitle, setAddtitle] = useState('')
  const [cards, setCards] = useState(
    Array(6).fill({ title: '', body: '' }) // 6 cards in the grid
  )

  const [largeCard, setLargeCard] = useState({ title: '', body: '' })   // A central large title + body card
  const [smallCardsA, setSmallCardsA] = useState([     // two small title/body cards (pair)
    { title: '', body: '' },
    { title: '', body: '' },
  ])

  // Add loading and error states
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const initialImageSlots: ImageSlot[] = [
    { id: 'banner1', file: null, previewUrl: null } as ImageSlot,
    { id: 'banner2', file: null, previewUrl: null } as ImageSlot,
    { id: 'banner3', file: null, previewUrl: null } as ImageSlot,
  ]

  const [imageSlots, setImageSlots] = useState(initialImageSlots)

  // Cleanup object URLs when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      imageSlots.forEach(slot => {
        if (slot.previewUrl) {
          URL.revokeObjectURL(slot.previewUrl)
        }
      })
    }
  }, [])

  const handlePublish = async () => {

    console.log()



    setIsUploading(true)
    setUploadError(null)
    setUploadSuccess(false)

    try {
      // Validation
      if (!projectTitle || !tagline || !addtitle) {
        throw new Error('Please fill in all required fields: Title, Tagline, and Additional Title')
      }

      if (!imageSlots[0]?.file) {
        throw new Error('Please upload at least a banner image')
      }

      // Prepare form data
      const formData = new FormData()
      
      // Add project metadata
      formData.append('title', projectTitle)
      formData.append('tagline', tagline)
      formData.append('addTitle', addtitle)
      formData.append('cards', JSON.stringify(cards))
      formData.append('largeCard', JSON.stringify(largeCard))
      formData.append('smallCards', JSON.stringify(smallCardsA))

      // Add banner image (first image slot)
      if (imageSlots[0]?.file) {
        formData.append('bannerImage', imageSlots[0].file)
      }

      // Add gallery images (remaining image slots)
      imageSlots.slice(1).forEach((slot) => {
        if (slot?.file) {
          formData.append('galleryImages', slot.file)
        }
      })

      console.log('Uploading project...')
      
      // Send to API
      const response = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      console.log('✅ Project uploaded successfully:', result)
      setUploadSuccess(true)
      
      // Clear form after successful upload
      setTimeout(() => {
        setProjectTitle('')
        setTagline('')
        setAddtitle('')
        setCards(Array(6).fill({ title: '', body: '' }))
        setLargeCard({ title: '', body: '' })
        setSmallCardsA([{ title: '', body: '' }, { title: '', body: '' }])
        
        // Clean up image previews
        imageSlots.forEach(slot => {
          if (slot.previewUrl) {
            URL.revokeObjectURL(slot.previewUrl)
          }
        })
        setImageSlots(initialImageSlots)
        
        setUploadSuccess(false)
      }, 3000) // Clear after 3 seconds
      
    } catch (error) {
      console.error('❌ Upload failed:', error)
      setUploadError(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }
  // Handle image upload preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (file) {
      // Clean up previous URL if it exists to prevent memory leaks
      if (imageSlots[index]?.previewUrl) {
        URL.revokeObjectURL(imageSlots[index].previewUrl)
      }
      
      const url = URL.createObjectURL(file)
      const newSlots: ImageSlot[] = imageSlots.map((slot, i) => 
        i === index ? { ...slot, file, previewUrl: url } : slot
      )
      setImageSlots(newSlots)
    } else {
      console.log('No file selected or index is invalid')
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      {/* Project Title */}

      <input
        type="text"
        placeholder="Project Title"
        className="border-2 border-dashed rounded-full px-4 py-2 text-center mb-4 w-1/3"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
      />
      {/* Large Banner Image */}

      <div className="w-full max-w-4xl h-56 mb-6">
        <UploadBox
          label="Image Here"
          image={imageSlots[0].previewUrl}
          onUpload={(e) => handleImageUpload(e, 0)}
          className="w-full h-full"
        />
      </div>
      {/* Tagline  and Addtitle */}
      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          placeholder="Tagline"
          className="border-2 border-dashed rounded-full px-4 py-2 w-[23vw] text-center mb-4"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
        />
        <input
          type="text"
          placeholder="Addtitle"
          className="border-2 border-dashed rounded-full px-4 py-2 text-center mb-4 w-[35vw]"
          value={addtitle}
          onChange={(e) => setAddtitle(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 w-full ">
        {cards.map((c, index) => (
          <div key={index} className="border-2 border-dashed rounded-lg p-4 flex flex-col">
            <input
              type="text"
              placeholder="Card Title"
              className=""
              value={cards[index].title}
              onChange={(e) => {
                const newCards = [...cards]
                newCards[index] = { ...newCards[index], title: e.target.value }
                setCards(newCards)
              }}
            />
            <textarea
              placeholder="Card Body"
              className=" mb-2 focus:outline-none"
              value={cards[index].body}
              onChange={(e) => {
                const newCards = [...cards]
                newCards[index] = { ...newCards[index], body: e.target.value }
                setCards(newCards)
              }}
            />
          </div>
        ))}
      </div>

      {/* Two image squares */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2  gap-4 mb-6">
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={imageSlots[1].previewUrl}
            onUpload={(e) => handleImageUpload(e, 1)}
            className="w-full rounded-lg h-full"
          />
        </div>
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={imageSlots[2].previewUrl}
            onUpload={(e) => handleImageUpload(e, 2)}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Two small Title/Body boxes side-by-side */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {smallCardsA.map((c, index) => (
          <div key={index} className="border-2 border-dashed rounded-lg p-4">
            <input
              type="text"
              placeholder="Title here"
              className="w-full mb-2 font-semibold"
              value={smallCardsA[index].title}
              onChange={(e) => {
                const copy = [...smallCardsA]
                copy[index] = { ...copy[index], title: e.target.value }
                setSmallCardsA(copy)
              }}
            />
            <textarea
              placeholder="Body text"
              className="w-full text-sm"
              value={c.body}
              onChange={(e) => {
                const copy = [...smallCardsA]
                copy[index] = { ...copy[index], body: e.target.value }
                setSmallCardsA(copy)
              }}
            />
          </div>
        ))}
      </div>

      {/* Large Title + Body card */}
      <div className="w-full max-w-4xl border-2 border-dashed rounded-lg p-6 mb-6">
        <input
          type="text"
          placeholder="Title here"
          className="w-full mb-3 font-semibold text-lg"
          value={largeCard.title}
          onChange={(e) => setLargeCard({ ...largeCard, title: e.target.value })}
        />
        <textarea
          placeholder="Body text"
          className="w-full text-sm"
          value={largeCard.body}
          onChange={(e) => setLargeCard({ ...largeCard, body: e.target.value })}
        />
      </div>

      {/* Error and Success Messages */}
      {uploadError && (
        <div className="w-full max-w-4xl mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">❌ {uploadError}</p>
        </div>
      )}
      
      {uploadSuccess && (
        <div className="w-full max-w-4xl mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">✅ Project uploaded successfully!</p>
        </div>
      )}

      {/* Footer Buttons */}
      <div className="flex gap-4">
        <button 
          className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          disabled={isUploading}
        >
          Cancel
        </button>
        <button 
          className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
          disabled={isUploading}
        >
          Save
        </button>
        <button 
          onClick={handlePublish} 
          disabled={isUploading}
          className={`px-6 py-2 rounded-full text-white transition-colors ${
            isUploading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isUploading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Uploading...
            </span>
          ) : (
            'Publish'
          )}
        </button>
      </div>
    </div>
  )
}

export default ProjectUploadPage
