'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { UploadBox } from '@/components/upload/UploadBox'
import { useRouter, useParams } from 'next/navigation'
import { handleImageUpload } from '@/utils/dashboard'

interface ImageSlot {
  id: string
  file: File | null
  previewUrl: string | null
  existingUrl?: string | null // For existing images from S3
}

const CaseStudyEditPage = () => {
  const router = useRouter()
  const params = useParams()
  const caseStudyId = params.id as string
  
  const [caseTitle, setCaseTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [leftTextBox, setLeftTextBox] = useState('')
  const [whatWeDid, setWhatWeDid] = useState('')
  const [addLine, setAddLine] = useState('')
  const [largeCard, setLargeCard] = useState({ title: '', body: '' })
  const [smallCardsA, setSmallCardsA] = useState([
    { title: '', body: '' },
    { title: '', body: '' },
  ])
  const [smallCardsB, setSmallCardsB] = useState([
    { title: '', body: '' },
    { title: '', body: '' },
  ])
  const [bodyTextTop, setBodyTextTop] = useState('')
  const [bodyTextBottom, setBodyTextBottom] = useState('')

  // Add loading and error states
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const initialImageSlots: ImageSlot[] = [
    { id: 'banner1', file: null, previewUrl: null, existingUrl: null },
    { id: 'banner2', file: null, previewUrl: null, existingUrl: null },
    { id: 'banner3', file: null, previewUrl: null, existingUrl: null },
    { id: 'banner4', file: null, previewUrl: null, existingUrl: null },
    { id: 'banner5', file: null, previewUrl: null, existingUrl: null },
    { id: 'banner6', file: null, previewUrl: null, existingUrl: null },
    { id: 'banner7', file: null, previewUrl: null, existingUrl: null },
    { id: 'banner8', file: null, previewUrl: null, existingUrl: null },
    { id: 'banner9', file: null, previewUrl: null, existingUrl: null },
    { id: 'banner10', file: null, previewUrl: null, existingUrl: null },
  ]

  const [imageSlots, setImageSlots] = useState(initialImageSlots)

  // Load existing case study data
  useEffect(() => {
    const loadCaseStudy = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/case-studies/${caseStudyId}`)
        
        if (!response.ok) {
          throw new Error('Failed to load case study')
        }

        const result = await response.json()
        const caseStudy = result.caseStudy
        
        // Populate form fields
        setCaseTitle(caseStudy.caseTitle || '')
        setSubtitle(caseStudy.subtitle || '')
        setLeftTextBox(caseStudy.leftTextBox || '')
        setWhatWeDid(caseStudy.whatWeDid || '')
        setAddLine(caseStudy.addLine || '')
        setLargeCard(caseStudy.largeCard || { title: '', body: '' })
        setSmallCardsA(caseStudy.smallCardsA || [{ title: '', body: '' }, { title: '', body: '' }])
        setSmallCardsB(caseStudy.smallCardsB || [{ title: '', body: '' }, { title: '', body: '' }])
        setBodyTextTop(caseStudy.bodyTextTop || '')
        setBodyTextBottom(caseStudy.bodyTextBottom || '')

        // Set existing images
        const newImageSlots = [...initialImageSlots]
        if (caseStudy.images?.banner) {
          newImageSlots[0] = {
            ...newImageSlots[0],
            existingUrl: caseStudy.images.banner,
            previewUrl: caseStudy.images.banner
          }
        }
        if (caseStudy.images?.gallery) {
          caseStudy.images.gallery.forEach((imageUrl: string, index: number) => {
            if (index < 9 && newImageSlots[index + 1]) {
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
        console.error('Failed to load case study:', error)
        setUpdateError('Failed to load case study data')
      } finally {
        setIsLoading(false)
      }
    }

    if (caseStudyId) {
      loadCaseStudy()
    }
  }, [caseStudyId])

  // Cleanup object URLs when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      imageSlots.forEach(slot => {
        if (slot.previewUrl && !slot.existingUrl) {
          URL.revokeObjectURL(slot.previewUrl)
        }
      })
    }
  }, [imageSlots])

  const handleUpdate = async () => {
    setIsUpdating(true)
    setUpdateError(null)
    setUpdateSuccess(false)

    try {
      // Validation
      if (!caseTitle || !subtitle || !leftTextBox || !whatWeDid || !largeCard.title || !largeCard.body) {
        throw new Error('Please fill in all required fields: Title, Subtitle, Text Box, What We Did, and Large Card')
      }

      // Prepare form data
      const formData = new FormData()

      // Add case study metadata
      formData.append('caseTitle', caseTitle)
      formData.append('subtitle', subtitle)
      formData.append('leftTextBox', leftTextBox)
      formData.append('whatWeDid', whatWeDid)
      formData.append('addLine', addLine)
      formData.append('bodyTextTop', bodyTextTop)
      formData.append('bodyTextBottom', bodyTextBottom)
      
      // Add card data as JSON strings
      formData.append('largeCard', JSON.stringify(largeCard))
      formData.append('smallCardsA', JSON.stringify(smallCardsA))
      formData.append('smallCardsB', JSON.stringify(smallCardsB))
      
      // Add banner image (first image slot) - only if new file is selected
      if (imageSlots[0]?.file) {
        formData.append('bannerImage', imageSlots[0].file)
      }
      
      // Add gallery images with slot information (remaining image slots) - only new files
      imageSlots.slice(1).forEach((slot, index) => {
        if (slot?.file) {
          formData.append('galleryImages', slot.file)
          formData.append('gallerySlots', index.toString()) // Send slot index
        }
      })

      console.log('Updating case study...')
      
      // Send to API
      const response = await fetch(`/api/case-studies/${caseStudyId}`, {
        method: 'PUT',
        body: formData
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update case study')
      }
      
      console.log('✅ Case study updated successfully:', result)
      setUpdateSuccess(true)
      
      // Redirect back to case studies list after success
      setTimeout(() => {
        router.push('/admin/case-studies')
      }, 2000)
      
    } catch (error) {
      console.error('❌ Update failed:', error)
      setUpdateError(error instanceof Error ? error.message : 'Update failed')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCancel = () => {
    router.push('/admin/case-studies')
  }
  
  const handleSave = () => {
    // Add save functionality if needed
    console.log('Save case study (draft)');
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading case study...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
      {updateError && (
        <div className="w-full max-w-4xl mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">❌ {updateError}</p>
        </div>
      )}
      
      {updateSuccess && (
        <div className="w-full max-w-4xl mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">✅ Case study updated successfully! Redirecting...</p>
        </div>
      )}

      <div className="w-full max-w-4xl mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Edit Case Study</h1>
        <p className="text-gray-600">Update the case study information below</p>
      </div>

      {/* Project Title */}
      <input
        type="text"
        placeholder="Project Title Here"
        className="border-2 border-dashed rounded-full px-6 py-2 text-center text-lg font-semibold mb-4 w-full max-w-lg"
        value={caseTitle}
        onChange={(e) => setCaseTitle(e.target.value)}
      />

      {/* Subtitle */}
      <input
        type="text"
        placeholder="Sub Title Here"
        className="border-2 border-dashed rounded-full px-4 py-2 text-center mb-6 w-full max-w-md"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      {/* Project Banner (full width) */}
      <div className="w-full max-w-4xl mb-6 h-56">
        <UploadBox
          label="Project Banner"
          image={imageSlots[0]?.previewUrl}
          onUpload={(e) => handleImageUpload(e, 0, imageSlots, setImageSlots)}
          className="w-full h-full"
        />
      </div>

      {/* Row under banner: left small text box and right "What we did" + "+ Add line" */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 mb-6">
        {/* left small text box */}
        <div className="w-full md:w-1/2 border-2 border-dashed rounded-lg p-4">
          <input
            type="text"
            placeholder="Text here"
            className="w-full text-sm"
            value={leftTextBox}
            onChange={(e) => setLeftTextBox(e.target.value)}
          />
        </div>

        {/* right column with "What we did" and "+ Add line" */}
        <div className="w-full md:w-1/2 flex flex-col gap-3 items-end">
          <input
            type="text"
            placeholder="What we did"
            className="border-2 border-dashed rounded-full px-4 py-2 w-40 text-sm text-center"
            value={whatWeDid}
            onChange={(e) => setWhatWeDid(e.target.value)}
          />
          <input
            type="text"
            placeholder="+ Add line"
            className="border-2 border-dashed rounded-full px-4 py-2 w-40 text-sm text-center"
            value={addLine}
            onChange={(e) => setAddLine(e.target.value)}
          />
        </div>
      </div>

      {/* Large Image Here (full width) */}
      <div className="w-full max-w-4xl h-56 mb-6">
        <UploadBox
          label="Image Here"
          image={imageSlots[1]?.previewUrl}
          onUpload={(e) => handleImageUpload(e, 1, imageSlots, setImageSlots)}
          className="w-full h-full"
        />
      </div>

      {/* Two square Image Here side-by-side */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={imageSlots[2]?.previewUrl}
            onUpload={(e) => handleImageUpload(e, 2, imageSlots, setImageSlots)}
            className="w-full h-full"
          />
        </div>
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={imageSlots[3]?.previewUrl}
            onUpload={(e) => handleImageUpload(e, 3, imageSlots, setImageSlots)}
            className="w-full h-full"
          />
        </div>
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

      {/* Two small Title/Body boxes side-by-side */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {smallCardsA.map((c, i) => (
          <div key={i} className="border-2 border-dashed rounded-lg p-4">
            <input
              type="text"
              placeholder="Title here"
              className="w-full mb-2 font-semibold"
              value={c.title}
              onChange={(e) => {
                const copy = [...smallCardsA]
                copy[i] = { ...copy[i], title: e.target.value }
                setSmallCardsA(copy)
              }}
            />
            <textarea
              placeholder="Body text"
              className="w-full text-sm"
              value={c.body}
              onChange={(e) => {
                const copy = [...smallCardsA]
                copy[i] = { ...copy[i], body: e.target.value }
                setSmallCardsA(copy)
              }}
            />
          </div>
        ))}
      </div>

      {/* Two image squares */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={imageSlots[4]?.previewUrl}
            onUpload={(e) => handleImageUpload(e, 4, imageSlots, setImageSlots)}
            className="w-full h-full"
          />
        </div>
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={imageSlots[5]?.previewUrl}
            onUpload={(e) => handleImageUpload(e, 5, imageSlots, setImageSlots)}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Two more small Title/Body boxes */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {smallCardsB.map((c, i) => (
          <div key={i} className="border-2 border-dashed rounded-lg p-4">
            <input
              type="text"
              placeholder="Title here"
              className="w-full mb-2 font-semibold"
              value={c.title}
              onChange={(e) => {
                const copy = [...smallCardsB]
                copy[i] = { ...copy[i], title: e.target.value }
                setSmallCardsB(copy)
              }}
            />
            <textarea
              placeholder="Body text"
              className="w-full text-sm"
              value={c.body}
              onChange={(e) => {
                const copy = [...smallCardsB]
                copy[i] = { ...copy[i], body: e.target.value }
                setSmallCardsB(copy)
              }}
            />
          </div>
        ))}
      </div>

      {/* Full-width image (middle) */}
      <div className="w-full max-w-4xl h-56 mb-6">
        <UploadBox
          label="Image Here"
          image={imageSlots[6]?.previewUrl}
          onUpload={(e) => handleImageUpload(e, 6, imageSlots, setImageSlots)}
          className="w-full h-full"
        />
      </div>

      {/* Two square images (lower) */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={imageSlots[7]?.previewUrl}
            onUpload={(e) => handleImageUpload(e, 7, imageSlots, setImageSlots)}
            className="w-full h-full"
          />
        </div>
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={imageSlots[8]?.previewUrl}
            onUpload={(e) => handleImageUpload(e, 8, imageSlots, setImageSlots)}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Mid Body text */}
      <div className="w-full max-w-4xl mb-6">
        <textarea
          placeholder="Body text"
          className="border-2 border-dashed rounded-lg p-6 w-full h-28 text-sm"
          value={bodyTextTop}
          onChange={(e) => setBodyTextTop(e.target.value)}
        />
      </div>

      {/* A larger full-width image */}
      <div className="w-full max-w-4xl h-56 mb-6">
        <UploadBox
          label="Image Here"
          image={imageSlots[9]?.previewUrl}
          onUpload={(e) => handleImageUpload(e, 9, imageSlots, setImageSlots)}
          className="w-full h-full"
        />
      </div>

      {/* Bottom Body text */}
      <div className="w-full max-w-4xl mb-8">
        <textarea
          placeholder="Body text"
          className="border-2 border-dashed rounded-lg p-6 w-full h-24 text-sm"
          value={bodyTextBottom}
          onChange={(e) => setBodyTextBottom(e.target.value)}
        />
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-4">
        <button 
          className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button 
          className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
          disabled={isUpdating}
          onClick={handleSave}
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
            'Update Case Study'
          )}
        </button>
      </div>
    </div>
  )
}

export default CaseStudyEditPage