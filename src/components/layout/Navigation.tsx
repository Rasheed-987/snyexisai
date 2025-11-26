
import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import type { Variants } from 'motion/react'
import { stagger } from 'motion/react'
import Image from 'next/image'
import * as motion from 'motion/react-client'
import HomeDropdown from '../ui/HomeDropdown'
import AboutDropdown from '../ui/AboutDropdown'
import { useDropdownHover } from '@/utils/utils'


type Props = {
  textColor: string
  navbarBackground: string
  isCaseStudyPage: boolean
}

const PortfolioDropdown = ({ textColor, navbarBackground, isCaseStudyPage }: Props) => {
  const pathname = usePathname() // Close dropdown when route changes
  const router = useRouter()
  const { isOpen: open, handleMouseEnter, handleMouseLeave, closeDropdown } = useDropdownHover()
  
  useEffect(() => {
    closeDropdown()
  }, [pathname])


  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      <button
        className={`font-semibold text-[14px] tracking-[0.5px] py-2 rounded-lg flex items-center gap-2 transition-colors duration-150 relative`}
        type="button"
      >
         
        <span className={`transition-colors duration-200 ${textColor}`}>   PORTFOLIO   </span>
         
        <Image
          src={
            isCaseStudyPage
              ? '/images/Services/arrow-down-white.svg'
              : '/images/arrow-down-solid-full.svg'
          }
          alt="Portfolio Icon"
          width={16}
          height={16}
          className={`w-4 mb-1 h-4 ml-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
          
      </button>
      
      {open && (
     <div
  className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-white border border-border rounded-xl shadow-xl z-50 transition-all duration-200"
 onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
>


  <Link
    href="/ourproject"
    className="flex items-start gap-4 px-5 py-3 hover:bg-gray-50 transition-all"
    onClick={closeDropdown}
  >
    <div className="flex-1">
      <div className="text-[15px] font-medium text-foreground">
        Design Projects
      </div>
      <div className="text-[13px] text-foreground">
        Work of the past, some still hold significant importance to us.
      </div>
    </div>
   <div className="w-9 h-9 relative ">
           <Image src="/images/project.png" alt="Projects" fill className="object-contain group-hover:scale-105 transition" />
         </div>
  </Link>

  <Link
    href="/casestudies"
    className="flex items-start gap-4 px-5 py-3 hover:bg-gray-50 transition-all"
    onClick={closeDropdown}
  >
    <div className="flex-1">
      <div className="text-[15px] font-medium text-foreground">
        Case Studies
      </div>
      <div className="text-[13px] text-foreground">
        Projects that we love and have created the most impact for our clients.
      </div>
    </div>
    <div className=" opacity-70">
      <div className="w-9 h-9 relative ">
              <Image src="/images/case-studies.png" alt="Case Studies" fill className="object-contain group-hover:scale-105 transition" />
            </div>
    </div>
  </Link>
</div>

      )}
    </div>
  )
}


const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 })

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth
      dimensions.current.height = ref.current.offsetHeight
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  return dimensions.current
}

/**
 * ============== Variants ================
 */

const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    // MODIFIED: Animate from top-right
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    // MODIFIED: Animate to top-right
    clipPath: 'circle(25px at calc(100% - 35px) 29px)',
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

const navVariants = {
  open: {
    transition: { delayChildren: stagger(0.07, { startDelay: 0.2 }) },
  },
  closed: {
    transition: { delayChildren: stagger(0.05, { from: 'last' }) },
  },
}

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}


const nav: React.CSSProperties = {
  width: '100%',
}

const getBackgroundStyle = (isCaseStudyPage: boolean): React.CSSProperties => ({
  backgroundColor: isCaseStudyPage ? '#0f1c34' : '#FFFFFF',
  position: 'absolute',
  top: 0,
  left: 0, // background still fills its parent
  bottom: 0,
  width: "100%",
})

const toggleContainer: React.CSSProperties = {
  outline: 'none',
  border: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  cursor: 'pointer',
  position: 'absolute',
  top: 6, // MODIFIED: Position on right
  right: -5,
  width: 50,
  height: 50,
  borderRadius: '50%',
  background: 'transparent',
  zIndex: 60,
}

const list: React.CSSProperties = {
  listStyle: 'none',
  padding: 25,
  margin: 0,
  position: 'absolute',
  top: 80,
  width: '100%',
}

const listItem: React.CSSProperties = {
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center', // Ensure this is 'center'
 padding: 0,
 margin: 0,
 listStyle: 'none',
 marginBottom: 20,
 cursor: 'pointer',
 width: '100%',
}



interface PathProps {
  d?: string
  variants: Variants
  transition?: { duration: number }
}

const Path = ({ strokeColor, ...props }: PathProps & { strokeColor: string }) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke={strokeColor}
    strokeLinecap="round"
    {...props}
  />
)

const MenuToggle = ({ toggle, color, isOpen }: { toggle: () => void; color: string; isOpen: boolean }) => (
  <button style={toggleContainer} onClick={toggle}>
     
    <svg width="23" height="23" viewBox="0 0 23 23">
        
      <Path
        strokeColor={color}
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
        
      <Path
        strokeColor={color}
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
        
      <Path
        strokeColor={color}
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
       
    </svg>
    
  </button>
)

// This renders your *actual* mobile links with the animation variants.
const AnimatedLinkList = ({ closeMenu, isCaseStudyPage }: { closeMenu: () => void; isCaseStudyPage: boolean }) => {
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const linkTextColor = isCaseStudyPage ? 'text-white' : 'text-foreground'

  const linkStyle: React.CSSProperties = {
    ...listItem,
    padding: 0,
  }
  const portfolioContainerStyle: React.CSSProperties = {
    ...linkStyle,
    flexDirection: 'column', // MODIFIED: Align items to the end (right)
    alignItems: 'center',
  }

  return (
    <motion.ul style={list} variants={navVariants}>
        
      <motion.li
        style={linkStyle}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
            {/* MODIFIED: Added text-right */}   
        <Link
          href="/"
          className={`${linkTextColor} font-semibold text-[18px] tracking-[0.5px] py-3 w-full text-center`}
          onClick={closeMenu}
        >
          HOME
        </Link>
          
      </motion.li>
           
      <motion.li
        style={linkStyle}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
         {/* MODIFIED: Added text-right */}   
        <Link
          href="/about"
          className={`${linkTextColor} font-semibold text-[18px] tracking-[0.5px] py-3 w-full text-center`}
          onClick={closeMenu}
        >
          ABOUT
        </Link>
          
      </motion.li>
           
      <motion.li
        style={linkStyle}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
            {/* MODIFIED: Added text-right */}   
        <Link
          href="/services"
          className={`${linkTextColor} font-semibold text-[18px] tracking-[0.5px] py-3 w-full text-center`}
          onClick={closeMenu}
        >
          SERVICES
        </Link>
          
      </motion.li>
        
      <motion.li style={portfolioContainerStyle} variants={itemVariants}>
           
        <button
          onClick={() => setPortfolioOpen(!portfolioOpen)}
          className={`${linkTextColor} font-semibold text-[18px] tracking-[0.5px] py-3 focus:outline-none w-full flex items-center justify-center`}
        >
               <span>PORTFOLIO</span>    <span>{portfolioOpen ? '▲' : '▼'}</span>  
          
        </button>
           
        {portfolioOpen && (
          <motion.div // MODIFIED: Align items-end and use pr-6
            className="flex flex-col items-center  w-full pr-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
                 
            <Link
              href="/casestudies"
              className={`${linkTextColor} text-[16px] font-medium py-2`}
              onClick={closeMenu}
            >
                     Case Studies      
            </Link>
                 
            <Link
              href="/ourproject"
              className={`${linkTextColor} text-[16px] font-medium py-2`}
              onClick={closeMenu}
            >
                     My Projects      
            </Link>
                
          </motion.div>
        )}
          
      </motion.li>
        
      <motion.li
        style={linkStyle}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
            {/* MODIFIED: Added text-right */}   
        <Link
          href="/careers"
          className={`${linkTextColor} font-semibold text-[18px] tracking-[0.5px] py-3 w-full text-center`}
          onClick={closeMenu}
        >
          CAREER
        </Link>
          
      </motion.li>
           
      <motion.li
        style={linkStyle}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
            {/* MODIFIED: Added text-right */}   
        <Link
          href="/contact"
          className={`${linkTextColor} font-semibold text-[18px] tracking-[0.5px] py-3 w-full text-center`}
          onClick={closeMenu}
        >
          CONTACT US
        </Link>
          
      </motion.li>
       
    </motion.ul>
  )
}



export const Navigation = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { height } = useDimensions(containerRef)

  const closeMenu = () => {
    setIsOpen(false)
  }
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const isCaseStudyPage = pathname === '/casestudies'
  const navbarBackground = isCaseStudyPage ? 'bg-foreground' : 'bg-background'
  const textColor = isCaseStudyPage ? 'text-white' : 'text-foreground'
  const menuColorClosed = isCaseStudyPage ? '#FFFFFF' : '#0f1c34'
  const menuColorOpen = isCaseStudyPage ? '#F9F9F9' : '#0f1c34'
  const logoSrc = isCaseStudyPage ? '/images/logo_white.png' : '/images/logo.png'
  const border = isCaseStudyPage ? 'border-0' : 'border-muted'

  return (
    <nav
      className={`w-full h-[60px] border ${border} ${navbarBackground} flex items-center justify-between px-6 relative z-[100]`}
    >
         {/* Logo (Unchanged) */}  
      <div className="flex items-center">
           
        <Image src={logoSrc} alt="Synexis Ai" width={206} height={50} className={` w-[140px] lg:w-[206px] h-[50px] object-contain`} priority /> 
        
      </div>
         {/* --- DESKTOP NAVIGATION LINKS (Unchanged) --- */}  
      <div className={`hidden md:flex mt-2 ml-3 items-center mr-3 gap-7 ${textColor}`}>
           
       
      <HomeDropdown  textColor={textColor} />

           
        <AboutDropdown textColor={textColor} />
           
        <Link
          href="/services"
          className={` font-semibold text-[14px] tracking-[0.5px] ${textColor}`}
        >
          SERVICES
        </Link>
           
        <div className="flex items-center ">
              
          <PortfolioDropdown
            textColor={textColor}
            navbarBackground={navbarBackground}
            isCaseStudyPage={isCaseStudyPage}
          />
             
        </div>
           
        <Link
          href="/careers"
          className={` font-semibold text-[14px] tracking-[0.5px] ${textColor}`}
        >
          CAREER
        </Link>
           
        <Link
          href="/contact"
          className={` font-semibold text-[14px] tracking-[0.5px] uppercase ${textColor}`}
        >
          CONTACT US
        </Link>
          
      </div>
     <div className="md:hidden">
    <motion.nav
     initial={false}
     animate={isOpen ? 'open' : 'closed'}
     custom={height}
     ref={containerRef}
     style={nav}
     className=" absolute top-0 right-0 h-dvh bottom-auto z-[100]"
    >
      <motion.div style={getBackgroundStyle(isCaseStudyPage)} variants={sidebarVariants} />
      <AnimatedLinkList closeMenu={closeMenu} isCaseStudyPage={isCaseStudyPage} />

      <MenuToggle 
        toggle={() => setIsOpen(!isOpen)} 
        color={isOpen ? menuColorOpen : menuColorClosed}
        isOpen={isOpen}
      />
    </motion.nav>
   </div>
    </nav>
  )
}
