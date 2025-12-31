'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { toast } from 'react-toastify';

interface CareerFormData {
  name: string;
  email: string;
  location: string;
  websiteOrPortfolio: string;
  socialLinks: string;
  aiExcitement: string;
  cv: { name: string, data: string }[];
}

interface CareerApplicationFormProps {
  jobTitle: string;
  Id?: string;
}

export function CareerApplicationForm({ jobTitle, Id }: CareerApplicationFormProps) {
  const [formData, setFormData] = useState<CareerFormData>({
    name: '',
    email: '',
    location: '',
    websiteOrPortfolio: '',
    socialLinks: '',
    aiExcitement: '',
    cv: []
  });

  const [errors, setErrors] = useState<Partial<CareerFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Helper to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          jobTitle,
          Id,
          submittedAt: new Date().toISOString()
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit application');
      }
      
      // Show success message
      toast.success(data.message || 'Application submitted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        location: '',
        websiteOrPortfolio: '',
        socialLinks: '',
        aiExcitement: '',
        cv: []
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
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
      <p className="text- text-sm mb-6">
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

      <div>

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

        {/* AI Excitement Field */}
        <div>
          <textarea
            name="aiExcitement"
            placeholder="Tell us why you're excited about AI and Synexis AI* (Keep it short and sweet)"
            value={formData.aiExcitement}
            onChange={handleChange}
            rows={4}
            className={`${inputFieldStyles} resize-none`}
          />
        </div>

        {/* Upload CV Field */}
        <div>
          <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">Upload Your CV</label>
          <input
            type="file"
            id="cv"
            name="cv"
            accept=".pdf,.doc,.docx"
            onChange={async (e) => {
              if (e.target.files && e.target.files.length > 0) {
                const files = await Promise.all(
                  Array.from(e.target.files).map(async (file) => ({
                    name: file.name,
                    data: await fileToBase64(file),
                  }))
                );
                setFormData(prev => ({
                  ...prev,
                  cv: files
                }));
              }
            }}
            className={`${inputFieldStyles}`}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-[70%] py-3 px-6 bg-primary hover:bg-blue-700 text-white rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Apply Now'}
        </Button>

        {/* Social Share */}
        <div className="pt-4 border-t border-gray-200 flex items-start gap-4">
          <p className="text-xs text-foreground leading-relaxed max-w-[200px]">Follow us for insights on AI, design and development:</p>
          <div className="flex gap-3">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
              onClick={() => {
                window.open('https://www.linkedin.com/company/synexis-ai/', '_blank', 'noopener,noreferrer');
              }}
            >
              <img src="/images/linkedin.png" alt="LinkedIn" className="object-cover" />
            </button>
            <button
              type="button"
              className="w-8 h-8  flex items-center justify-center hover:bg-gray-100 transition-colors"
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