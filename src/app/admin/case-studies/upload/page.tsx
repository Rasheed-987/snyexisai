'use client'

import React, { useState, useEffect } from 'react'
import { UploadBox } from '@/components/upload/UploadBox'
import { handleImageUpload } from '@/utils/dashboard'
import { useRouter } from 'next/navigation'

interface ImageSlot {
  id: string
  file: any | null
  previewUrl: string | null
}

const CaseStudiesUploadPage: React.FC = () => {
  const router = useRouter()
  const [caseTitle, setCaseTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [leftTextBox, setLeftTextBox] = useState('') // "Text here" small box
  const [whatWeDid, setWhatWeDid] = useState('') // "What we did"
  const [addLine, setAddLine] = useState('') // "+ Add line"
  const [largeCard, setLargeCard] = useState({ title: '', body: '' }) // A central large title + body card
  const [smallCardsA, setSmallCardsA] = useState([
    // two small title/body cards (pair)
    { title: '', body: '' },
    { title: '', body: '' },
  ])

  const [smallCardsB, setSmallCardsB] = useState([
    // two small title/body cards lower (another pair)
    { title: '', body: '' },
    { title: '', body: '' },
  ])

  const [bodyTextTop, setBodyTextTop] = useState('') // Top body text block
  const [bodyTextBottom, setBodyTextBottom] = useState('')

  const initialImageSlots: ImageSlot[] = [
    { id: 'banner1', file: null, previewUrl: null },
    { id: 'banner2', file: null, previewUrl: null },
    { id: 'banner3', file: null, previewUrl: null },
    { id: 'banner4', file: null, previewUrl: null },
    { id: 'banner5', file: null, previewUrl: null },
    { id: 'banner6', file: null, previewUrl: null },
    { id: 'banner7', file: null, previewUrl: null },
    { id: 'banner8', file: null, previewUrl: null },
    { id: 'banner9', file: null, previewUrl: null },
    { id: 'banner10', file: null, previewUrl: null },
  ]

  const [imageSlots, setImageSlots] = useState(initialImageSlots)

  // Add loading and error states
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  // Cleanup object URLs when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      imageSlots.forEach(slot => {
        if (slot.previewUrl) {
          URL.revokeObjectURL(slot.previewUrl)
        }
      })
    }
  }, [imageSlots])

  // Save as draft (minimal validation)
  const handleSaveDraft = async () => {
    setIsUploading(true)
    setUploadError(null)
    setUploadSuccess(false)

    try {
      if (!caseTitle) {
        throw new Error('Title is required to save draft')
      }
      const formData = new FormData()
      formData.append('caseTitle', caseTitle)
      formData.append('subtitle', subtitle)
      formData.append('leftTextBox', leftTextBox)
      formData.append('whatWeDid', whatWeDid)
      formData.append('addLine', addLine)
      formData.append('bodyTextTop', bodyTextTop)
      formData.append('bodyTextBottom', bodyTextBottom)
      formData.append('largeCard', JSON.stringify(largeCard))
      formData.append('smallCardsA', JSON.stringify(smallCardsA))
      formData.append('smallCardsB', JSON.stringify(smallCardsB))
      formData.append('status', 'draft')
      if (imageSlots[0]?.file) {
        formData.append('bannerImage', imageSlots[0].file)
      }
      imageSlots.slice(1).forEach((slot) => {
        if (slot?.file) {
          formData.append('galleryImages', slot.file)
        }
      })
      const response = await fetch('/api/case-studies', {
        method: 'POST',
        body: formData
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save draft')
      }
      setUploadSuccess(true)
      setTimeout(() => {
        setCaseTitle('')
        setSubtitle('')
        setLeftTextBox('')
        setWhatWeDid('')
        setAddLine('')
        setLargeCard({ title: '', body: '' })
        setSmallCardsA([{ title: '', body: '' }, { title: '', body: '' }])
        setSmallCardsB([{ title: '', body: '' }, { title: '', body: '' }])
        setBodyTextTop('')
        setBodyTextBottom('')
        imageSlots.forEach(slot => {
          if (slot.previewUrl) {
            URL.revokeObjectURL(slot.previewUrl)
          }
        })
        setImageSlots(initialImageSlots)
        setUploadSuccess(false)
      }, 3000)
      router.push('/admin/case-studies')
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Save draft failed')
    } finally {
      setIsUploading(false)
    }
  }

  // Publish (strict validation)
  const handlePublish = async () => {
    setIsUploading(true)
    setUploadError(null)
    setUploadSuccess(false)
    try {
      if (!caseTitle || !subtitle || !leftTextBox || !whatWeDid || !largeCard.title || !largeCard.body || smallCardsA.some(c => !c.title || !c.body) || imageSlots.some(slot => !slot.file)) {
        throw new Error('Please fill in all fields and upload all images for Publish')
      }
      if (!imageSlots[0].file) {
        throw new Error('Please upload at least a banner image');
      }
      const formData = new FormData()
      formData.append('caseTitle', caseTitle)
      formData.append('subtitle', subtitle)
      formData.append('leftTextBox', leftTextBox)
      formData.append('whatWeDid', whatWeDid)
      formData.append('addLine', addLine)
      formData.append('bodyTextTop', bodyTextTop)
      formData.append('bodyTextBottom', bodyTextBottom)
      formData.append('largeCard', JSON.stringify(largeCard))
      formData.append('smallCardsA', JSON.stringify(smallCardsA))
      formData.append('smallCardsB', JSON.stringify(smallCardsB))
      formData.append('status', 'published')
      if (imageSlots[0]?.file) {
        formData.append('bannerImage', imageSlots[0].file)
      }
      imageSlots.slice(1).forEach((slot) => {
        if (slot?.file) {
          formData.append('galleryImages', slot.file)
        }
      })
      const response = await fetch('/api/case-studies', {
        method: 'POST',
        body: formData
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'Failed to publish case study')
      }
      setUploadSuccess(true)
      setTimeout(() => {
        setCaseTitle('')
        setSubtitle('')
        setLeftTextBox('')
        setWhatWeDid('')
        setAddLine('')
        setLargeCard({ title: '', body: '' })
        setSmallCardsA([{ title: '', body: '' }, { title: '', body: '' }])
        setSmallCardsB([{ title: '', body: '' }, { title: '', body: '' }])
        setBodyTextTop('')
        setBodyTextBottom('')
        imageSlots.forEach(slot => {
          if (slot.previewUrl) {
            URL.revokeObjectURL(slot.previewUrl)
          }
        })
        setImageSlots(initialImageSlots)
        setUploadSuccess(false)
      }, 3000)
      router.push('/admin/case-studies')
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleCancel = () => {
    router.push('/admin/case-studies')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
      {uploadError && (
        <div className="w-full max-w-4xl mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">❌ {uploadError}</p>
        </div>
      )}
      {uploadSuccess && (
        <div className="w-full max-w-4xl mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">✅ Case study uploaded successfully!</p>
        </div>
      )}

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
          disabled={isUploading}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button 
          className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
          disabled={isUploading}
          onClick={handleSaveDraft}
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

export default CaseStudiesUploadPage
