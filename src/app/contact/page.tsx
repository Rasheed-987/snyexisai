'use client';

import React from 'react';
import ContactForm from '../../components/forms/ContactForm';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <div className="min-h-screen rounded-b-[80px] pb-12  pt-10 relative z-50  overflow-visible">
      {/* Main container with responsive two-column layout */}
      <div className="relative mx-auto w-full max-w-[1500px] min-h-[874.38px] px-3 lg:px-12 2xl:px-24 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 min-h-screen py-10 sm:py-16 lg:py-20 overflow-visible">
          
          {/* Left Column - Hero Content */}
          <div className="flex flex-col space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-6xl 2xl:text-8xl font-normal leading-tight tracking-tight text-foreground ">
                  Tell us about
                </h1>
                <div className="flex items-center space-x-4">
                  <span className="text-4xl lg:text-6xl 2xl:text-8xl font-normal leading-tight tracking-tight text-foreground ">
                    your
                  </span>
                </div>
                <h1 className="text-4xl lg:text-6xl 2xl:text-8xl font-normal leading-tight tracking-tight text-foreground ">
                  project
                </h1>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-2xl">
              <p className="text-base lg:text-lg 2xl:text-2xl leading-relaxed text-foreground ">
                At Synexis.ai, we believe in building intelligent collaborations, not just client relationships. We don't operate as a typical agency we integrate as your innovation partner, focused on scaling your vision with AI-driven solutions. From advanced digital platforms to smart brand experiences, we deliver end-to-end services that transform ideas into intelligent realities.
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-6 pt-8 border-t border-[#E3E3E3]">
              <p className="text-sm 2xl:text-lg text-foreground ">
                Hate forms? Chat now or schedule a call with our founder to discuss your project directly.
              </p>
              
              <Button
                variant="nav-contact"
                size="nav-contact"
                className="bg-background border border-foreground text-foreground text-base 2xl:text-xl hover:bg-foreground hover:text-white rounded-full px-8 py-4  transition-all duration-300"
                onClick={() => {
                  window.location.href = '/book-meeting';
                }}
              >
                Book A Meeting
                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                  <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                </svg>
              </Button>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex flex-col h-full w-full overflow-visible">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}