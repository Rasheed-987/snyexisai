'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { UploadBox } from '@/components/upload/UploadBox'
import { useRouter, useParams } from 'next/navigation'

interface ImageSlot {
  id: string
  file: File | null
  previewUrl: string | null
  existingUrl?: string | null // For existing images from S3
}

const ProjectEditPage = () => {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
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
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const initialImageSlots: ImageSlot[] = [
    { id: 'banner1', file: null, previewUrl: null, existingUrl: null } as ImageSlot,
    { id: 'banner2', file: null, previewUrl: null, existingUrl: null } as ImageSlot,
    { id: 'banner3', file: null, previewUrl: null, existingUrl: null } as ImageSlot,
  ]

  const [imageSlots, setImageSlots] = useState(initialImageSlots)

  // Load existing project data
  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/projects/${projectId}`)
        
        if (!response.ok) {
          throw new Error('Failed to load project')
        }

        const response_data = await response.json()
        const project = response_data.project
        console.log('Fetched Project Data', project)
        
        // Populate form fields
        setProjectTitle(project.title || '')
        setTagline(project.tagline || '')
        setAddtitle(project.addTitle || '')
        setCards(project.cards || Array(6).fill({ title: '', body: '' }))
        setLargeCard(project.largeCard || { title: '', body: '' })
        setSmallCardsA(project.smallCards || [{ title: '', body: '' }, { title: '', body: '' }])

        // Set existing images
        const newImageSlots = [...initialImageSlots]
        if (project.images?.banner) {
          newImageSlots[0] = {
            ...newImageSlots[0],
            existingUrl: project.images.banner,
            previewUrl: project.images.banner
          }
        }
        if (project.images?.gallery && project.images.gallery.length > 0) {
          project.images.gallery.forEach((imageUrl: string, index: number) => {
            if (index < 2 && newImageSlots[index + 1]) {
              newImageSlots[index + 1] = {
                ...newImageSlots[index + 1],
                existingUrl: imageUrl,
                previewUrl: imageUrl
              }
            }
          })
        }
        setImageSlots(newImageSlots)

      } catch (error) {
        console.error('Failed to load project:', error)
        setUpdateError('Failed to load project data')
      } finally {
        setIsLoading(false)
      }
    }

    if (projectId) {
      loadProject()
    }
  }, [projectId])

  // Cleanup object URLs when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      imageSlots.forEach(slot => {
        if (slot.previewUrl && !slot.existingUrl) {
          URL.revokeObjectURL(slot.previewUrl)
        }
      })
    }
  }, [])

  const handleUpdate = async () => {
    setIsUpdating(true)
    setUpdateError(null)
    setUpdateSuccess(false)

    try {
      // Validation
      if (!projectTitle || !tagline || !addtitle) {
        throw new Error('Please fill in all required fields: Title, Tagline, and Additional Title')
      }

      // Check if we have at least the banner image (either existing or new)
      if (!imageSlots[0]?.file && !imageSlots[0]?.existingUrl) {
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

      // Add banner image (only if a new file is selected)
      if (imageSlots[0]?.file) {
        formData.append('bannerImage', imageSlots[0].file)
      }

      // Add gallery images with slot information (only new files)
      imageSlots.slice(1).forEach((slot, index) => {
        if (slot?.file) {
          formData.append('galleryImages', slot.file)
          formData.append('gallerySlots', index.toString()) // Send slot index
        }
      })


      // Send to API
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Update failed')
      }

      console.log('✅ Project updated successfully:', result)
      setUpdateSuccess(true)
      
      // Navigate back to projects list after successful update
      setTimeout(() => {
        router.push('/admin/projects')
      }, 2000)
      
    } catch (error) {
      console.error('❌ Update failed:', error)
      setUpdateError(error instanceof Error ? error.message : 'Update failed')
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle image upload preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (file) {
      // Clean up previous URL if it exists and it's not an existing S3 URL
      if (imageSlots[index]?.previewUrl && !imageSlots[index]?.existingUrl) {
        URL.revokeObjectURL(imageSlots[index].previewUrl)
      }
      
      const url = URL.createObjectURL(file)
      const newSlots: ImageSlot[] = imageSlots.map((slot, i) => 
        i === index ? { ...slot, file, previewUrl: url, existingUrl: null } : slot
      )
      setImageSlots(newSlots)
    } else {
      console.log('No file selected or index is invalid')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg">Loading project...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      {/* Page Header */}
      <div className="w-full max-w-4xl mb-6">
        <h1 className="text-2xl font-bold text-center mb-2">Edit Project</h1>
        <p className="text-gray-600 text-center">Update your project details and images</p>
      </div>

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
          label={imageSlots[0].previewUrl ? "Change Image" : "Image Here"}
          image={imageSlots[0].previewUrl}
          onUpload={(e) => handleImageUpload(e, 0)}
          className="w-full h-full"
        />
      </div>

      {/* Tagline and Addtitle */}
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

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6 w-full">
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
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="h-40">
          <UploadBox
            label={imageSlots[1].previewUrl ? "Change Image" : "Image Here"}
            image={imageSlots[1].previewUrl}
            onUpload={(e) => handleImageUpload(e, 1)}
            className="w-full rounded-lg h-full"
          />
        </div>
        <div className="h-40">
          <UploadBox
            label={imageSlots[2].previewUrl ? "Change Image" : "Image Here"}
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
      {updateError && (
        <div className="w-full max-w-4xl mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">❌ {updateError}</p>
        </div>
      )}
      
      {updateSuccess && (
        <div className="w-full max-w-4xl mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">✅ Project updated successfully! Redirecting...</p>
        </div>
      )}

      {/* Footer Buttons */}
      <div className="flex gap-4">
        <button 
          className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          disabled={isUpdating}
          onClick={() => router.push('/admin/projects')}
        >
          Cancel
        </button>
        <button 
          className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
          disabled={isUpdating}
        >
          Save Draft
        </button>
        <button 
          onClick={handleUpdate} 
          disabled={isUpdating}
          className={`px-6 py-2 rounded-full text-white transition-colors ${
            isUpdating 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isUpdating ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Updating...
            </span>
          ) : (
            'Update Project'
          )}
        </button>
      </div>
    </div>
  )
}

export default ProjectEditPage