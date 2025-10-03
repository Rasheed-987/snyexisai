import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const PortfolioDropdown = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  console.log('🔄 Rendering PortfolioDropdown, open state:', open, 'pathname:', pathname);
  
  // Close dropdown when route changes
  useEffect(() => {
    console.log('📍 Pathname changed to:', pathname, 'closing dropdown');
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    console.log('🎯 PortfolioDropdown mounted');
    return () => {
      console.log('💀 PortfolioDropdown unmounted');
    };
  }, []);
  return (
    <div className="relative">
      <button
        className="text-sm text-[#0070f3] px-4 py-2 rounded-lg border-2 bg-white shadow-md  flex items-center gap-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        Portfolio
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
          <Link href="/casestudies" className="block px-4 py-2 text-sm text-[#0070f3] rounded-t-lg hover:bg-gray-50">Case Studies</Link>
          <Link href="/ourproject" className="block px-4 py-2 text-sm text-[#0070f3] rounded-b-lg hover:bg-gray-50">My Projects</Link>
        </div>
      )}
    </div>
  );
};

export default PortfolioDropdown;
