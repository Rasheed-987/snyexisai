import React, { useState } from 'react';
import Link from 'next/link';

const PortfolioDropdown = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="text-sm text-[#0070f3] px-4 py-2 rounded-lg border-2 bg-white shadow-md hover:bg-blue-50 flex items-center gap-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        Portfolio
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
          <Link href="/casestudy" className="block px-4 py-2 text-sm text-[#0070f3] hover:bg-blue-50 rounded-t-lg">Case Studies</Link>
          <Link href="/ourproject" className="block px-4 py-2 text-sm text-[#0070f3] hover:bg-blue-50 rounded-b-lg">My Projects</Link>
        </div>
      )}
    </div>
  );
};

export default PortfolioDropdown;
