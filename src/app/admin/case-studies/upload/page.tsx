'use client'

import React, { useState, useEffect } from 'react'

import { UploadBox } from '@/components/upload/UploadBox'

interface ImageSlot {
  id: string
  file: File | null
  previewUrl: string | null
}

const CaseStudiesUploadPage: React.FC = () => {
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

  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([
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
  ])

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

  const handlePublish = () => {
    console.log('Title:', caseTitle)
    console.log('Subtitle:', subtitle)
    console.log('Large Card:', largeCard)
    console.log('Small Cards A:', smallCardsA)
    console.log('Small Cards B:', smallCardsB)
    console.log('Image Slots:', imageSlots)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (file) {
      // Clean up previous URL if it exists to prevent memory leaks
      if (imageSlots[index]?.previewUrl) {
        URL.revokeObjectURL(imageSlots[index].previewUrl)
      }
      
      const url = URL.createObjectURL(file)
      setImageSlots((prevSlots: ImageSlot[]) =>
        prevSlots.map((slot, i) => (i === index ? { ...slot, file: file, previewUrl: url } : slot))
      )
    } else {
      console.log('No file selected or index is invalid')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
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
          onUpload={(e) => handleImageUpload(e, 0)}
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
          onUpload={(e) => handleImageUpload(e, 1)}
          className="w-full h-full"
        />
      </div>

      {/* Two square Image Here side-by-side */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={imageSlots[2]?.previewUrl}
            onUpload={(e) => handleImageUpload(e, 2)}
            className="w-full h-full"
          />
        </div>
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={imageSlots[3]?.previewUrl}
            onUpload={(e) => handleImageUpload(e, 3)}
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
            onUpload={(e) => handleImageUpload(e, 4)}
            className="w-full h-full"
          />
        </div>
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={imageSlots[5]?.previewUrl}
            onUpload={(e) => handleImageUpload(e, 5)}
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
          onUpload={(e) => handleImageUpload(e, 6)}
          className="w-full h-full"
        />
      </div>

      {/* Two square images (lower) */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={imageSlots[7]?.previewUrl}
            onUpload={(e) => handleImageUpload(e, 7)}
            className="w-full h-full"
          />
        </div>
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={imageSlots[8]?.previewUrl}
            onUpload={(e) => handleImageUpload(e, 8)}
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
          onUpload={(e) => handleImageUpload(e, 9)}
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

      {/* Footer actions */}
      <div className="flex gap-4">
        <button className="px-6 py-2 rounded-full bg-gray-200">Cancel</button>
        <button className="px-6 py-2 rounded-full bg-gray-300">Save</button>
        <button onClick={handlePublish} className="px-6 py-2 rounded-full bg-blue-600 text-white">
          Publish
        </button>
      </div>
    </div>
  )
}

export default CaseStudiesUploadPage
