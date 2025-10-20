'use client'

import React, { useState } from 'react'

interface Props {
  onAdd: (text: string) => void
  placeholder?: string
}

export default function RequirementsInput({ onAdd, placeholder = 'Add a requirement' }: Props) {
  const [text, setText] = useState('')

  const handleAdd = () => {
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border-2 border-dashed border-gray-300 p-2 rounded-lg focus:border-blue-500 focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleAdd()
          }
        }}
      />
      <button type="button" onClick={handleAdd} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Add</button>
    </div>
  )
}
