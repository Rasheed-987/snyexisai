'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useState, useEffect } from 'react';

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <nav className="w-full h-[68px] bg-background relative z-50">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between gap-9">
        {/* Logo */}
        <div className="flex items-center mt-[9px]">
          <img 
            src="/images/logo.png"
            alt="Synexis Ai"
            className="w-[206px] h-[50px] object-contain"
          />
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 z-50"
          onClick={toggleMenu}
          type="button"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            // Close X Icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#0F1C3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6l12 12" stroke="#0F1C3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            // Hamburger Icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="5" width="24" height="2.5" rx="1.25" fill="#0F1C3D" />
              <rect y="11" width="24" height="2.5" rx="1.25" fill="#0F1C3D" />
              <rect y="17" width="24" height="2.5" rx="1.25" fill="#0F1C3D" />
            </svg>
          )}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="navbar-item text-foreground">HOME</Link>
          <Link href="#" className="navbar-item text-muted-foreground">ABOUT</Link>
          <Link href="#" className="navbar-item text-muted-foreground">SERVICES</Link>
          <Link href="#" className="navbar-item text-muted-foreground">CASE STUDIES</Link>
          <Link href="/careers" className="navbar-item text-muted-foreground">CAREER</Link>
        </div>

        {/* Desktop Action Buttons */}
        <div className="flex items-center gap-3" style={{ marginTop: '10px' }}>
          <Button 
            variant="nav-outline"
            size="nav-menu"
            className="hidden md:flex"
            style={{ borderRadius: '1400px' }}
          >
            Menu
          </Button>
          <Button 
            variant="nav-primary"
            size="nav-cta"
            className="hidden md:flex"
            style={{ borderRadius: '1400px' }}
          >
            Let's Talk
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMenu}
          />
          
          {/* Menu Content */}
          <div className="fixed top-[68px] left-0 w-full h-[calc(100vh-68px)] bg-background z-50 shadow-lg md:hidden overflow-y-auto">
            <div className="flex flex-col p-6">
              <Link 
                href="/" 
                className="navbar-item text-foreground py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                HOME
              </Link>
              <Link 
                href="#" 
                className="navbar-item text-muted-foreground py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                ABOUT
              </Link>
              <Link 
                href="#" 
                className="navbar-item text-muted-foreground py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                SERVICES
              </Link>
              <Link 
                href="#" 
                className="navbar-item text-muted-foreground py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                CASE STUDIES
              </Link>
              <Link 
                href="/careers" 
                className="navbar-item text-muted-foreground py-4 text-center"
                onClick={closeMenu}
              >
                CAREER
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};