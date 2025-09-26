'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  websiteUrl: string;
  projectDetails: string;
  receiveUpdates: boolean;
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
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  
  // reCAPTCHA state
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission here
    }
  };

  // reCAPTCHA handlers
  const handleCheckboxClick = () => {
    if (!isChecked) {
      setIsLoading(true);
      // Simulate verification process
      setTimeout(() => {
        setIsLoading(false);
        setIsChecked(true);
      }, 1500);
    }
  };

  const handleRefresh = () => {
    setIsChecked(false);
    setIsLoading(false);
  };

  const inputClass = "w-full h-[60px] px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-lg text-[#0F1C3D] font-chillax text-sm focus:outline-none focus:ring-2 focus:ring-[#F9F9F9] focus:border-transparent transition-all";
  const labelClass = "block text-sm font-normal text-[#0F1C3D] font-chillax mb-2";

  return (
    <form onSubmit={handleSubmit} className="w-full h-full  space-y-6 overflow-visible">
      {/* Basic Details Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-normal text-[#0F1C3D] font-chillax">
          Basic Details
        </h2>
        
        {/* Name Field */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email and Company Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
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
              type="text"
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

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className={labelClass}>
            Phone Number*
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
        </div>

        {/* Website URL */}
        <div>
          <label htmlFor="websiteUrl" className={labelClass}>
            Website URL
          </label>
          <input
            type="url"
            id="websiteUrl"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter your website URL"
          />
        </div>
      </div>

      {/* Project Details Section */}
      <div className="space-y-4 b ">
        <h2 className="text-2xl font-normal  text-[#0F1C3D] font-chillax">
          Tell us more about the project
        </h2>
        
        <div>
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[#0F1C3D] bg-[#F9F9F9] font-chillax text-sm focus:outline-none focus:ring-2 focus:ring-[#F9F9F9] focus:border-transparent transition-all resize-none"
            placeholder="Tell us about your budget, timeline and what the project is all about. Don't forget to mention that service you are looking for - product, web, branding or all."
          />
        </div>
      </div>

      {/* Newsletter Signup and Privacy */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="receiveUpdates"
              name="receiveUpdates"
              checked={formData.receiveUpdates}
              onChange={handleChange}
              className="w-4 h-4 border-2 border-[#0F1C3D] rounded text-[#0F1C3D] focus:ring-[#F9F9F9] transition-all"
            />
          </div>
          <div className="flex ">
            <label htmlFor="receiveUpdates" className="text-sm text-[#0F1C3D] mr-9  font-chillax leading-relaxed">
              Yes, I want to receive updates from Synexis from time to time.
            </label>
            <div className="border-l border-[#E3E3E3] pl-4 ml-4 mt-2">
              <p className="text-xs text-[#0F1C3D] font-chillax leading-relaxed">
                We promise to only send you emails related to our work. You can always unsubscribe whenever you feel like.
              </p>
            </div>
          </div>
        </div>

        {/* reCAPTCHA Component */}
        <div className=" border w-[50%] border-[#D3D3D3] rounded p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Checkbox */}
              <div 
                className={`w-6 h-6 border-2 rounded cursor-pointer flex items-center border-[#D3D3D3] justify-center transition-all duration-200 ${
                  isLoading 
                    ? 'border-blue-500 bg-white' 
                    : isChecked 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-[#0F1C3D] bg-white hover:border-blue-500'
                }`}
                onClick={handleCheckboxClick}
              >
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                )}
                {isChecked && !isLoading && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              {/* Text */}
              <span className="text-sm text-[#0F1C3D] font-sans select-none">
                I'm not a robot
              </span>
            </div>
            
            {/* reCAPTCHA logo and refresh */}
            <div className="flex flex-col items-end">
              <div 
                className="w-8 h-8 rounded cursor-pointer flex items-center justify-center hover:opacity-80 transition-all duration-200 hover:scale-105"
                onClick={handleRefresh}
                title="Refresh reCAPTCHA"
              >
                <img 
                  src="/images/reCap.png" 
                  alt="reCAPTCHA" 
                  className="w-full h-full object-contain hover:rotate-12 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-3 text-right">
            <div className="text-xs text-[#0F1C3D] font-sans">
              <span className="font-medium">reCAPTCHA</span>
            </div>
            <div className="text-xs text-[#0F1C3D] space-x-1 mt-1">
              <a href="#" className="hover:underline text-[#0F1C3D]">Privacy</a>
              <span>-</span>
              <a href="#" className="hover:underline text-[#0F1C3D]">Terms</a>
            </div>
          </div>
          
          {/* Status message */}
          {isChecked && (
            <div className="mt-3 text-sm bg-ring font-medium text-center">
              ✓ Verification successful
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-[62px] bg-[#327AED] text-white rounded-full font-chillax text-sm hover:opacity-90 transition-all"
      >
        Send Request
      </Button>
    </form>
  );
}