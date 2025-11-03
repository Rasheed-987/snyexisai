'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface CounterAnimationProps {
  end: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({
  end,
  duration = 2,
  className = '',
  suffix = '',
  prefix = ''
}) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      
      // Start with random number animation
      const randomInterval = setInterval(() => {
        setCount(Math.floor(Math.random() * end * 1.5))
      }, 50)

      // After 500ms, start the actual counting animation
      setTimeout(() => {
        clearInterval(randomInterval)
        
        const startTime = Date.now()
        const startValue = 0
        
        const animate = () => {
          const now = Date.now()
          const elapsed = (now - startTime) / 1000
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function for smooth animation
          const easeOutCubic = 1 - Math.pow(1 - progress, 3)
          const currentValue = Math.floor(startValue + (end - startValue) * easeOutCubic)
          
          setCount(currentValue)
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setCount(end)
          }
        }
        
        requestAnimationFrame(animate)
      }, 500)
    }
  }, [isInView, end, duration, hasAnimated])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  )
}

export default CounterAnimation