'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

interface CareerFormData {
  name: string;
  email: string;
  location: string;
  websiteOrPortfolio: string;
  socialLinks: string;
}

interface CareerApplicationFormProps {
  jobTitle: string;
  jobId: string;
}

export function CareerApplicationForm({ jobTitle, jobId }: CareerApplicationFormProps) {
  const [formData, setFormData] = useState<CareerFormData>({
    name: '',
    email: '',
    location: '',
    websiteOrPortfolio: '',
    socialLinks: '',
  });

  const [errors, setErrors] = useState<Partial<CareerFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof CareerFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<CareerFormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Here you would typically send the application data to your backend
      console.log('Application submitted:', {
        ...formData,
        jobTitle,
        jobId,
        submittedAt: new Date().toISOString()
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message or redirect
      alert('Application submitted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        location: '',
        websiteOrPortfolio: '',
        socialLinks: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputFieldStyles = "w-[80%] px-4 py-2  bg-[#F4F0ED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4F0ED]";

  return (
    <div className=" rounded-lg border-[#DEE0E3] border-[2px] p-6">
      <h3 className="text-[35px] font-medium text-[#0f1c3d] mb-2">
        Don't Overthink It.
      </h3>
      <p className="text-gray-600 text-sm mb-6">
        Apply for the {jobTitle} position
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your name*"
            value={formData.name}
            onChange={handleChange}
            className={`${inputFieldStyles} ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Your email*"
            value={formData.email}
            onChange={handleChange}
            className={`${inputFieldStyles} ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Location Field */}
        <div>
          <input
            type="text"
            name="location"
            placeholder="Your location*"
            value={formData.location}
            onChange={handleChange}
            className={`${inputFieldStyles} ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>

        {/* Website/Portfolio Field */}
        <div>
          <input
            type="url"
            name="websiteOrPortfolio"
            placeholder="Your website or portfolio*"
            value={formData.websiteOrPortfolio}
            onChange={handleChange}
            className={`${inputFieldStyles}`}
          />
        </div>

        {/* Social Links Field */}
        <div>
          <input
            type="text"
            name="socialLinks"
            placeholder="A social link* (perhaps your Dribbble or LinkedIn)"
            value={formData.socialLinks}
            onChange={handleChange}
            className={`${inputFieldStyles}`}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-[70%] py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Apply Now'}
        </Button>

        {/* Social Share */}
        <div className="pt-4 border-t border-gray-200 flex items-center gap-4">
          <p className="text-xs text-gray-500">SHARE</p>
          <div className="flex gap-3">
            <button
              type="button"
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              onClick={() => {/* Add LinkedIn share */}}
            >
              <img src="/images/linkedin.png" alt="LinkedIn" className="object-cover" />
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              onClick={() => {/* Add Twitter share */}}
            >
              <img src="/images/twitter.png" alt="Twitter" className="object-cover" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}