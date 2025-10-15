'use client'

import React, { useState, useRef } from 'react'
import Button from '@/components/ui/Button'
import ReCAPTCHA from 'react-google-recaptcha'

interface FormData {
  name: string
  email: string
  companyName: string
  phoneNumber: string
  websiteUrl: string
  projectDetails: string
  receiveUpdates: boolean
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    websiteUrl: '',
    projectDetails: '',
    receiveUpdates: false,
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitting, setSubmitting] = useState(false)

  // reCAPTCHA
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))

    // clear errors while typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA verification')
      return
    }

    setSubmitting(true)
    try {
      // Verify reCAPTCHA with backend
      const res = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: recaptchaToken }),
      })

      const data = await res.json()

      if (data.success) {
        console.log('✅ Form submitted:', formData)
        alert('Form submitted successfully!')
        // Reset form
        setFormData({
          name: '',
          email: '',
          companyName: '',
          phoneNumber: '',
          websiteUrl: '',
          projectDetails: '',
          receiveUpdates: false,
        })
        recaptchaRef.current?.reset()
        setRecaptchaToken(null)
      } else {
        alert('❌ reCAPTCHA verification failed. Please try again.')
        recaptchaRef.current?.reset()
        setRecaptchaToken(null)
      }
    } catch (err) {
      console.error('Error verifying reCAPTCHA:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full h-[60px] px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-lg text-[#0F1C3D] font-chillax text-sm focus:outline-none focus:ring-2 focus:ring-[#F9F9F9] focus:border-transparent transition-all'
  const labelClass =
    'block text-sm font-normal text-[#0F1C3D] font-chillax mb-2'

  return (
    <form onSubmit={handleSubmit} className="w-full h-full space-y-6 overflow-visible">
      {/* Basic Details */}
      <div className="space-y-4">
        <h2 className="text-2xl font-normal text-[#0F1C3D] font-chillax">
          Basic Details
        </h2>

        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Name*
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email & Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="companyName" className={labelClass}>
              Company Name*
            </label>
            <input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter company name"
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phoneNumber" className={labelClass}>
            Phone Number*
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Website */}
        <div>
          <label htmlFor="websiteUrl" className={labelClass}>
            Website URL
          </label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter your website URL"
          />
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-4">
        <h2 className="text-2xl font-normal text-[#0F1C3D] font-chillax">
          Tell us more about the project
        </h2>

        <textarea
          id="projectDetails"
          name="projectDetails"
          value={formData.projectDetails}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[#0F1C3D] bg-[#F9F9F9] font-chillax text-sm focus:outline-none focus:ring-2 focus:ring-[#F9F9F9] focus:border-transparent transition-all resize-none"
          placeholder="Describe your project, timeline, and services needed."
        />
      </div>

      {/* Updates Checkbox */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <input 
            type="checkbox" 
            id="receiveUpdates" 
            name="receiveUpdates" 
            checked={formData.receiveUpdates} 
            onChange={handleChange} 
            className="w-4 h-4 border-2 border-[#0F1C3D] rounded text-[#0F1C3D] focus:ring-[#F9F9F9] transition-all mt-1" 
          />
          <div className="flex">
            <div>
              <label
                htmlFor="receiveUpdates"
                className="text-sm text-[#0F1C3D] font-chillax leading-relaxed block mb-2"
              >
                Yes, I want to receive updates from Synexis from time to time.
              </label>
            </div>
            <div className="border-l border-[#E3E3E3] pl-4 ml-0">
              <p className="text-xs text-[#0F1C3D] font-chillax leading-relaxed">
                We promise to only send you emails related to our work. You can always unsubscribe whenever you feel like.
              </p>
            </div>
          </div>
        </div>

        {/* reCAPTCHA */}
        <div className="flex justify-start mt-6">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
              '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // Google test key
            }
            onChange={setRecaptchaToken}
            onExpired={() => setRecaptchaToken(null)}
            theme="light"
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={submitting}
        className="w-full h-[62px] bg-[#327AED] text-white rounded-full font-chillax text-sm hover:opacity-90 transition-all"
      >
        {submitting ? 'Submitting...' : 'Send Request'}
      </Button>
    </form>
  )
}
