'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';


type Props = {
  textColor: string;
  navbarBackground: string;
};

const PortfolioDropdown = ({ textColor, navbarBackground }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className={`font-chillax font-semibold text-[14px] tracking-[0.5px]'} px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-150`}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        PORTFOLIO
        {/* <img src="/images/arrow_down.png" alt="Portfolio Icon" className='w-4 h-4 ml-1' /> */}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className={`absolute right-0 mt-2 w-40  border rounded-lg shadow-lg z-50 ${navbarBackground}`}>
          <Link href="/casestudies" className={`block px-4 py-2 text-sm ${textColor} hover:bg-blue-50 rounded-t-lg`}>Case Studies</Link>
          <Link href="/ourproject" className={`block px-4 py-2 text-sm ${textColor} rounded-b-lg]`}>My Projects</Link>
        </div>
      )}
    </div>
  );
};

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const isCaseStudyPage = pathname === '/casestudy';
  const navbarBackground = isCaseStudyPage ? 'bg-[#0A1329]' : 'bg-[#F9F9F9]';
  const textColor = isCaseStudyPage ? 'text-white' : 'text-[#0F1C3D]';
  const logoSrc = isCaseStudyPage ? '/images/logo_white.png' : '/images/logo.png';

  return (
    <nav className={`w-full h-[68px] ${navbarBackground}   flex items-center justify-between px-6 relative z-[100]`}>
      {/* Logo */}
      <div className="flex items-center">
        <img 
          src={logoSrc} 
          alt="Synexis Ai" 
          className={`w-[206px] h-[50px] object-contain`} 
        />
      </div>

      {/* Hamburger Menu Button (Mobile) */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 z-[110]"
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

      {/* Navigation Links */}
      <div className={`hidden md:flex mt-2 ml-3 items-center mr-3 gap-9 ${textColor}`}>
        <Link href="/" className={`font-chillax font-semibold text-[14px] tracking-[0.5px] ${textColor}`}>HOME</Link>
        <Link href="/about" className={`font-chillax font-semibold text-[14px] tracking-[0.5px] ${textColor}`}>ABOUT</Link>
        <Link href="#" className={`font-chillax font-semibold text-[14px] tracking-[0.5px] ${textColor}`}>SERVICES</Link>
        <div className="flex items-center">
          <PortfolioDropdown textColor={textColor} navbarBackground={navbarBackground} />
        </div>
        <Link href="/careers" className={`font-chillax font-semibold text-[14px] tracking-[0.5px] ${textColor}`}>CAREER</Link>
        <Link href="/contact" className={`font-chillax font-semibold text-[14px] tracking-[0.5px] uppercase ${textColor}`}>CONTACT US</Link>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-[90] md:hidden"
            onClick={closeMenu}
          />
          
          {/* Menu Content */}
          <div className="fixed top-[68px] left-0 w-full h-[calc(100vh-68px)] bg-[#F9F9F9] z-[100] shadow-lg md:hidden overflow-y-auto">
            <div className="flex flex-col p-6">
              <Link 
                href="/" 
                className="text-[#0F1C3D] font-chillax font-semibold 2xl:text-[20px]  tracking-[0.5px] py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                HOME
              </Link>
              <Link 
                href="#" 
                className="text-[#0F1C3D] font-chillax font-semibold text-[14px] tracking-[0.5px] py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                ABOUT
              </Link>
              <Link 
                href="#" 
                className="text-[#0F1C3D] font-chillax font-semibold text-[14px] tracking-[0.5px] py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                SERVICES
              </Link>
              <Link 
                href="#" 
                className="text-[#0F1C3D] font-chillax font-semibold text-[14px] tracking-[0.5px] py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                PORTFOLIO
              </Link>
              <Link 
                href="/careers" 
                className="text-[#0F1C3D] font-chillax font-semibold text-[14px] tracking-[0.5px] py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                CAREER
              </Link>
              <Link 
                href="#" 
                className="text-[#0F1C3D] font-chillax font-semibold text-[14px] tracking-[0.5px] py-4 text-center"
                onClick={closeMenu}
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};