// import Link from 'next/link';
// import Button from '@/components/ui/Button';
'use client';


import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full h-[68px] bg-background ">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex sm:flex-justifycontentend items-center justify-between gap-9">
        {/* Logo */}
        <div className="flex items-center mt-[9px]">
          <img 
            src="/images/logo.png" 
            alt="Synexis Ai" 
            className="w-[206px] h-[50px] object-contain"
          />
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <Button
          variant="nav-outline"
          size="nav-menu"
          className="md:hidden flex"
          style={{ borderRadius: '1400px' }}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {/* Hamburger Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="5" width="24" height="2.5" rx="1.25" fill="#0F1C3D" />
            <rect y="11" width="24" height="2.5" rx="1.25" fill="#0F1C3D" />
            <rect y="17" width="24" height="2.5" rx="1.25" fill="#0F1C3D" />
          </svg>
        </Button>

        {/* Navigation Links */}
        <div className={`items-center gap-8 ${menuOpen ? 'flex flex-col absolute top-[68px] left-0 w-full bg-background z-50 p-6 shadow-lg' : 'hidden'} md:flex md:static md:flex-row md:bg-transparent md:shadow-none md:p-0`}>
          <Link href="/" className="navbar-item text-foreground">HOME</Link>
          <Link href="#" className="navbar-item text-muted-foreground">ABOUT</Link>
          <Link href="#" className="navbar-item text-muted-foreground">SERVICES</Link>
          <Link href="#" className="navbar-item text-muted-foreground">CASE STUDIES</Link>
          <Link href="/careers" className="navbar-item text-muted-foreground">CAREER</Link>
        </div>

        {/* Action Buttons */}
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
    </nav>
  );
};
         