'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';


type Props = {
  textColor: string;
  navbarBackground: string;
  isCaseStudyPage: boolean;
};

const PortfolioDropdown = ({ textColor, navbarBackground, isCaseStudyPage }: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  
  
  // Close dropdown when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

 
  return (
   <div
  className="relative"
  onMouseEnter={() => setOpen(true)}
>
  <button
    className={`font-semibold text-[14px] tracking-[0.5px] px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-150 relative`}
    type="button"
  >
    <span className={`transition-colors duration-200 ${textColor}`}>
      PORTFOLIO
    </span>
    <img
      src={isCaseStudyPage ? "/images/Services/arrow-down-white.svg" : "/images/arrow-down-solid-full.svg"}
      alt="Portfolio Icon"
      className={`w-4 mb-1 h-4 ml-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    />
    {/* Blue top border indicator */}
    {open && (
      <span className="absolute bottom-0 left-0 w-60% h-[2px] bg-[#0A3AFF]"></span>
    )}
  </button>

  {open && (
    <div
      className={`absolute left-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-xl z-50 transition-all duration-200`}
    >
      <Link
        href="/casestudies"
        className="block px-5 py-2 text-[14px] text-[#0F1C3D] hover:text-[#0A3AFF] transition-colors"
      >
        Case Studies
      </Link>
      <Link
        href="/ourproject"
        className="block px-5 py-2 text-[14px] text-[#0F1C3D] hover:text-[#0A3AFF] transition-colors"
      >
        My Projects
      </Link>
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

  const isCaseStudyPage = pathname === '/casestudies';
  const navbarBackground = isCaseStudyPage ? 'bg-[#0A1329]' : 'bg-[#F9F9F9]';
  const textColor = isCaseStudyPage ? 'text-white' : 'text-[#0F1C3D]';
  const menuColor = isCaseStudyPage ? '#F9F9F9' : '#0F1C3D';
  const logoSrc = isCaseStudyPage ? '/images/logo_white.png' : '/images/logo.png';
  const border = isCaseStudyPage ? 'border-0' : 'border-[#E7E7E7]';
  return (
    <nav className={`w-full h-[68px]  border ${border} ${navbarBackground}   flex items-center justify-between   px-6 relative z-[100]`}>
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
        className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full  z-[110]`}
        onClick={toggleMenu}
        type="button"
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          // Close X Icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke={menuColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6l12 12" stroke={menuColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          // Hamburger Icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="5" width="24" height="2.5" rx="1.25" fill={menuColor} />
            <rect y="11" width="24" height="2.5" rx="1.25" fill={menuColor} />
            <rect y="17" width="24" height="2.5" rx="1.25" fill={menuColor} />
          </svg>
        )}
      </button>

      {/* Navigation Links */}
      <div className={`hidden md:flex mt-2 ml-3 items-center mr-3 gap-9 ${textColor}`}>
        <Link href="/" className={` font-semibold text-[14px] tracking-[0.5px] ${textColor}`}>HOME</Link>
        <Link href="/about" className={` font-semibold text-[14px] tracking-[0.5px] ${textColor}`}>ABOUT</Link>
        <Link href="/services" className={` font-semibold text-[14px] tracking-[0.5px] ${textColor}`}>SERVICES</Link>
        <div className="flex items-center ">
          <PortfolioDropdown textColor={textColor} navbarBackground={navbarBackground} isCaseStudyPage={isCaseStudyPage} />
        </div>
        <Link href="/careers" className={` font-semibold text-[14px] tracking-[0.5px] ${textColor}`}>CAREER</Link>
        <Link href="/contact" className={` font-semibold text-[14px] tracking-[0.5px] uppercase ${textColor}`}>CONTACT US</Link>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <>
          {/* Menu Content */}
          <div className="fixed top-[68px] left-0 w-full h-auto bg-[#F9F9F9] z-[100] shadow-lg md:hidden overflow-y-auto">
            <div className="flex flex-col p-6">
              <Link 
                href="/" 
                className="text-[#0F1C3D]  font-semibold 2xl:text-[20px]  tracking-[0.5px] py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                HOME
              </Link>
              <Link 
                href="/about" 
                className="text-[#0F1C3D]  font-semibold text-[14px] tracking-[0.5px] py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                ABOUT
              </Link>
              <Link 
                href="/services" 
                className="text-[#0F1C3D]  font-semibold text-[14px] tracking-[0.5px] py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                SERVICES
              </Link>
              {/* <Link 
                href="#" 
                className="text-[#0F1C3D]  font-semibold text-[14px] tracking-[0.5px] py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                PORTFOLIO
              </Link> */}
              <Link 
                href="/careers" 
                className="text-[#0F1C3D]  font-semibold text-[14px] tracking-[0.5px] py-4 text-center border-b border-gray-200"
                onClick={closeMenu}
              >
                CAREER
              </Link>
              <Link 
                href="/contact" 
                className="text-[#0F1C3D]  font-semibold text-[14px] tracking-[0.5px] py-4 text-center"
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