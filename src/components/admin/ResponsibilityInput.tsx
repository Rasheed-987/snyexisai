"use client"

import React, { useState } from 'react'

interface Props {
  onAdd: (item: { title: string; body: string }) => void
  titlePlaceholder?: string
  bodyPlaceholder?: string
}

export default function ResponsibilityInput({ onAdd, titlePlaceholder = 'Responsibility title', bodyPlaceholder = 'Responsibility description' }: Props) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleAdd = () => {
    if (!title.trim() || !body.trim()) return
    onAdd({ title: title.trim(), body: body.trim() })
    setTitle('')
    setBody('')
  }

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={titlePlaceholder}
        className="w-full border-2 border-dashed border-gray-300 p-2 rounded-lg focus:border-blue-500 focus:outline-none"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={bodyPlaceholder}
        rows={3}
        className="w-full border-2 border-dashed border-gray-300 p-2 rounded-lg focus:border-blue-500 focus:outline-none resize-vertical"
      />
      <div className="flex justify-end">
        <button type="button" onClick={handleAdd} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Add Responsibility</button>
      </div>
    </div>
  )
}
