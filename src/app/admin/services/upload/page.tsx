'use client'

import React from 'react'
import Alert from '@/components/ui/Alert'
import { useState, useEffect } from 'react'
import { UploadBox } from '@/components/upload/UploadBox'
import { handleImageUpload } from '@/utils/dashboard'
import { useRouter } from 'next/navigation';
import RequirementsInput from '@/components/admin/RequirementsInput'
import { json } from 'stream/consumers'


interface ImageSlot {
  id: string
  file: File | null
  previewUrl: string | null
}

export default function ServicesUploadPage() {
  const router = useRouter();

  const [serviceTitle, setServiceTitle] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([
    { id: 'banner', file: null, previewUrl: null }
  ])
  const [isRouterMounted, setIsRouterMounted] = useState(false);

  // Requirements state
  const [requirements, setRequirements] = useState<string[]>([]);
  const [requirementsTitle, setRequirementsTitle] = useState<string>('');
  const [editingReqIndex, setEditingReqIndex] = useState<number | null>(null);
  const [editingReqText, setEditingReqText] = useState<string>('');

  // Description state
  const [descriptionText, setDescriptionText] = useState<string>('');

  // Large card state
  const [largeCard, setLargeCard] = useState<{ title: string; body: string }>({
    title: '',
    body: ''
  });


  useEffect(() => {
    setIsRouterMounted(true);
  }, []);

  // Add requirement
  const addRequirement = (text: string, setter: typeof setRequirements) => {
    if (text.trim().length) setter(prev => [...prev, text.trim()]);
  };
  // Remove requirement
  const removeRequirement = (idx: number, setter: typeof setRequirements) => {
    setter(prev => prev.filter((_, i) => i !== idx));
  };

  // Save as draft (only requires title)
  const onSaveDraft = async () => {
    if (!isRouterMounted) {
      console.error('NextRouter is not mounted.');
      return;
    }
    try {
      if (!serviceTitle) {
        setUploadError('Please provide a service title.');
        return;
      }
      const form = new FormData();
      form.append('title', serviceTitle);
      form.append('status', 'draft');
      form.append('requirements', JSON.stringify(requirements));
      form.append('requirementsTitle', requirementsTitle);
      form.append('description', descriptionText);
      form.append('largeCard', JSON.stringify(largeCard));
      
      console.log('📤 Sending data:', {
        title: serviceTitle,
        description: descriptionText,
        largeCard: largeCard,
        requirements: requirements,
        requirementsTitle: requirementsTitle
      });
      
      if (imageSlots[0].file) {
        form.append('image', imageSlots[0].file);
      }
      const response = await fetch('/api/services', {
        method: 'POST',
        body: form,
      });
      if (response.ok) {
        setUploadSuccess('Service draft saved successfully!');
        setTimeout(() => {
          setUploadSuccess(null);
          router.push('/admin/services');
        }, 2000);
      } else {
        setUploadError('Failed to save service draft.');
      }
    } catch (error) {
      console.error('Error saving service draft:', error);
      setUploadError('An error occurred while saving the service draft.');
    }
  }

  // Publish (requires title and image)
  const onPublish = async () => {
    if (!isRouterMounted) {
      console.error('NextRouter is not mounted.');
      return;
    }
    try {
      if (!serviceTitle || !imageSlots[0].file) {
        setUploadError('Please provide a service title and upload an image.');
        return;
      }
  const form = new FormData();
  form.append('title', serviceTitle);
  form.append('image', imageSlots[0].file);
  form.append('status', 'published');
  form.append('requirements', JSON.stringify(requirements));
  form.append('requirementsTitle', requirementsTitle);
  form.append('description', descriptionText);
  form.append('largeCard', JSON.stringify(largeCard));
  
  console.log('📤 Publishing data:', {
    title: serviceTitle,
    description: descriptionText,
    largeCard: largeCard,
    requirements: requirements,
    requirementsTitle: requirementsTitle
  });
  
      const response = await fetch('/api/services', {
        method: 'POST',
        body: form,
      });
      if (response.ok) {
        setUploadSuccess('Service published successfully!');
        
        setTimeout(() => {
          setUploadSuccess(null);
          router.push('/admin/services');
        }, 2000);
      } else {
        setUploadError('Failed to publish service.');
      }
    } catch (error) {
      console.error('Error publishing service:', error);
      setUploadError('An error occurred while publishing the service.');
    }
  }

  
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col ">
     
      <UploadBox
        label="Upload Service Image"
        image={imageSlots[0].previewUrl}
        onUpload={(e) => handleImageUpload(e, 0, imageSlots, setImageSlots)}
        className="mb-4 min-h-[50vh]"
      />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Service Title"
          value={serviceTitle || ''}
          onChange={(e) => setServiceTitle(e.target.value)}
          className="w-full max-w-lg rounded-full px-4 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

    <textarea
        placeholder="description Textarea"
        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-200"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />


      {/* Requirements */}
      <div className="space-y-2 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Bullet Points Section</label>
        <input
          type="text"
          placeholder="Section Title (e.g., Key Features, Benefits, etc.)"
          className="w-full mb-3 font-medium text-base px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={requirementsTitle}
          onChange={(e) => setRequirementsTitle(e.target.value)}
        />
        <div className="space-y-2">
          <RequirementsInput onAdd={(text: string) => addRequirement(text, setRequirements)} />
          <ul className="list-disc pl-5 space-y-1">
            {requirements.map((r, idx) => (
              <li key={idx} className="flex items-center justify-between">
                {editingReqIndex === idx ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      value={editingReqText}
                      onChange={(e) => setEditingReqText(e.target.value)}
                      placeholder="Edit requirement"
                      className="flex-1 border p-2 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newText = editingReqText.trim();
                        if (newText.length) {
                          setRequirements(prev => prev.map((it, i) => i === idx ? newText : it));
                        }
                        setEditingReqIndex(null);
                        setEditingReqText('');
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingReqIndex(null);
                        setEditingReqText('');
                      }}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{r}</span>
                    <div className="flex gap-3 items-center">
                      <button type="button" onClick={() => removeRequirement(idx, setRequirements)} className="text-sm text-red-600 hover:underline">Remove</button>
                      <button type="button" onClick={() => { setEditingReqIndex(idx); setEditingReqText(r); }} className="text-sm text-blue-600 hover:underline">Edit</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
     {/* Large Title + Body card */}
      <div className="w-full max-w-4xl border-2 border-dashed rounded-lg p-6 mb-6">
        <input
          type="text"
          placeholder="Title here"
          className="w-full mb-3 font-semibold text-lg px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={largeCard.title}
          onChange={(e) => setLargeCard({ ...largeCard, title: e.target.value })}
        />
        <textarea
          placeholder="Body text"
          className="w-full text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded min-h-[140px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={largeCard.body}
          onChange={(e) => setLargeCard({ ...largeCard, body: e.target.value })}
        />
      </div>
  

 {/* Error and Success Messages */}
      {uploadError && (
        <div className="w-full max-w-lg mb-4">
          <Alert type="error" message={uploadError} onClose={() => setUploadError(null)} />
        </div>
      )}
      {uploadSuccess && (
        <div className="w-full max-w-lg mb-4">
          <Alert type="success" message={uploadSuccess} onClose={() => setUploadSuccess(null)} />
        </div>
      )}


      <div className="flex gap-4">
        <button className="px-6 py-2 rounded-full bg-gray-200" onClick={() => router.push('/admin/services')}>Cancel</button>
        <button className="px-6 py-2 rounded-full bg-gray-300" onClick={onSaveDraft}>Save Draft</button>
        <button className="px-6 py-2 rounded-full bg-blue-600 text-white" onClick={onPublish}>
          Publish
        </button>
      </div>
    </div>
  )
}
