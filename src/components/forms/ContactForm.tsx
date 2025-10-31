'use client'

import React, { useState, useRef } from 'react'
import Button from '@/components/ui/Button'
import ReCAPTCHA from 'react-google-recaptcha'
import Alert from '@/components/ui/Alert'

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
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
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
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false)

  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  // ----------------------------
  // Handle Input Changes
  // ----------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  // ----------------------------
  // Validation
  // ----------------------------
  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = 'Please enter your name'
    if (!formData.email.trim()) newErrors.email = 'Please enter your email'
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email))
      newErrors.email = 'Enter a valid email address'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ----------------------------
  // Handle Submit
  // ----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA verification.')
      return
    }

    setSubmitting(true)
    setStatus('submitting')

    try {
      // Verify reCAPTCHA
      const captchaRes = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: recaptchaToken }),
      })
      const captchaData = await captchaRes.json()

      if (!captchaData.success) {
        setUploadError('reCAPTCHA verification failed. Please try again.')
        recaptchaRef.current?.reset()
        setRecaptchaToken(null)
        setSubmitting(false)
        return
      }

      // Send email
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setUploadSuccess(true)
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
        setStatus('error')
        setUploadError('Form submission failed. Please try again.')
      }
    } catch (err) {
      console.error('Form submission failed:', err)
      setStatus('error')
      setUploadError('An unexpected error occurred. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  // ----------------------------
  // UI Classes
  // ----------------------------
  const inputClass =
    'w-full h-[60px] px-4 py-3 bg-background border border-gray-200 rounded-lg text-foreground  text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'
  const labelClass = 'block text-sm font-normal text-foreground  mb-2'

  return (
    <form onSubmit={handleSubmit} className="w-full h-full space-y-6 overflow-visible">
      {/* Status Messages */}
      {uploadError && (
        <div className="mb-4">
          <Alert type="error" message={uploadError} onClose={() => setUploadError(null)} />
        </div>
      )}
      {uploadSuccess && (
        <div className="mb-4">
          <Alert type="success" message="Form submitted successfully!" onClose={() => setUploadSuccess(false)} />
        </div>
      )}

      {/* Basic Details */}
      <div className="space-y-4">
        <h2 className="text-2xl font-normal text-foreground ">
          Basic Details
        </h2>

        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClass}>Name*</label>
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
            <label htmlFor="email" className={labelClass}>Email*</label>
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
            <label htmlFor="companyName" className={labelClass}>Company Name*</label>
            <input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter company name"
            />
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phoneNumber" className={labelClass}>Phone Number*</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
        </div>

        {/* Website */}
        <div>
          <label htmlFor="websiteUrl" className={labelClass}>Website URL</label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter your website URL (optional)"
          />
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-4">
        <h2 className="text-2xl font-normal text-foreground ">
          Tell us more about the project
        </h2>
        <textarea
          id="projectDetails"
          name="projectDetails"
          value={formData.projectDetails}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-border rounded-lg text-foreground bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
          placeholder="Describe your project, timeline, and services needed..."
        />
      </div>

      {/* Updates Checkbox */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="receiveUpdates"
            name="receiveUpdates"
            checked={formData.receiveUpdates}
            onChange={handleChange}
            className="w-4 h-4 border-2 border-foreground rounded text-foreground focus:ring-primary/30 transition-all mt-1"
          />
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
            <label
              htmlFor="receiveUpdates"
              className="text-sm text-foreground leading-relaxed"
            >
              Yes, I want to receive updates from Synexis from time to time.
            </label>
            <p className="text-xs text-foreground/70  leading-relaxed max-w-xs">
              We promise to only send emails related to our work. You can unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* reCAPTCHA */}
        <div className="flex justify-start mt-6">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
              '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
            }
            onChange={setRecaptchaToken}
            onExpired={() => setRecaptchaToken(null)}
            theme="light"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={submitting}
          className={`w-full h-[62px] rounded-full  text-sm text-white transition-all ${
            submitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/80'
          }`}
        >
          {submitting ? 'Sending...' : 'Send Request'}
        </Button>
      </div>
    </form>
  )
}
