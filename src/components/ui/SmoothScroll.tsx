'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, ReactNode, useState } from 'react'

interface SmoothScrollProps {
  children: ReactNode
  className?: string
  smoothness?: number // 0-1, higher = smoother (default: 0.1)
}

export default function SmoothScroll({ 
  children, 
  className = '',
  smoothness = 0.1 
}: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)
  
  // Track scroll progress
  const { scrollY } = useScroll()
  
  // Create smooth scroll effect with spring physics
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    mass: smoothness,
  })

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.getBoundingClientRect().height
        setContentHeight(height)
        document.body.style.height = `${height}px`
      }
    }

    // Initial update with delay to ensure content is rendered
    const timer = setTimeout(updateHeight, 100)
    
    // Update height on window resize
    const handleResize = () => {
      updateHeight()
    }
    window.addEventListener('resize', handleResize)
    
    // Observe content changes
    const resizeObserver = new ResizeObserver(() => {
      updateHeight()
    })
    
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current)
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
      document.body.style.height = ''
    }
  }, [children])

  return (
    <motion.div
      ref={scrollRef}
      style={{
        y: useTransform(smoothScrollY, (value) => -value),
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        overflow: 'visible',
        willChange: 'transform',
      }}
      className={className}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </motion.div>
  )
}
