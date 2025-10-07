'use client'

import React from 'react'
import { useState } from 'react'
import { UploadBox } from '@/components/upload/UploadBox'

const ProjectUploadPage = () => {
  const [projectTitle, setProjectTitle] = useState('')
  const [tagline, setTagline] = useState('')
  const [addtitle, setAddtitle] = useState('')
  const [images, setImages] = useState<(string | null)[]>(
    Array(5).fill(null) // Assuming 5 image slots as per wireframe
  )
  const [cards, setCards] = useState(
    Array(9).fill({ title: '', body: '' }) // 9 cards in the grid
  )

  // Handle image upload preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      if (typeof index === 'number') {
        const newImgs = [...images]
        newImgs[index] = url
        setImages(newImgs)
      }
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
      <div className="w-full max-w-4xl h-56 mb-6">
        <UploadBox
          label="Image Here"
          image={images[0]}
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

    <div  className="grid grid-cols-3 gap-4 mb-6 w-full ">
{cards.map((card, index) => (
  <div key={index} className="border-2 border-dashed rounded-lg p-4 flex flex-col">
    <input
      type="text"
      placeholder="Card Title"
      className=""
      value={card.title}
      onChange={(e) => {
        const newCards = [...cards]
        newCards[index].title = e.target.value
        setCards(newCards)
      }}
    />
    <textarea
      placeholder="Card Body"
      className="border-b-2 border-dashed mb-2 focus:outline-none"
      value={card.body}
      onChange={(e) => {
        const newCards = [...cards]
        newCards[index].body = e.target.value
        setCards(newCards)
      }}
    />
  </div>
))}
</div>





      {/* Footer Buttons */}
      <div className="flex gap-4">
        <button className="px-6 py-2 rounded-full bg-gray-200">Cancel</button>
        <button className="px-6 py-2 rounded-full bg-gray-300">Save</button>
        <button className="px-6 py-2 rounded-full bg-blue-600 text-white">Publish</button>
      </div>
    </div>
  )
}

export default ProjectUploadPage
