"use client"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ServicesCardProps {
  title: string
  image: string
  description: string
  requirements: string[]
  requirementsTitle: string
  largeCard: { title: string; body: string }
  showOnlyTitleAndImage?: boolean
}

export default function ServicesCard({
  title,
  image,
  description,
  requirements,
  requirementsTitle,
  largeCard,
  showOnlyTitleAndImage = false,
}: ServicesCardProps) {
  const [open, setOpen] = useState(false)

  const handleOpenModal = () => {
    setOpen(true)
    // Scroll to top smoothly when modal opens
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Small summary card */}
      <motion.div
        layout
        className={`w-full bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center p-6 text-center ${
          showOnlyTitleAndImage ? 'h-[400px] 2xl:h-[550px]' : 'h-[450px] 2xl:h-[600px]'
        }`}
      >
        {/* Image at the top */}
        <div className={`relative w-full rounded-xl overflow-hidden ${
          showOnlyTitleAndImage ? 'h-[300px] 2xl:h-[400px]' : 'h-[450px] 2xl:h-[600px]'
        }`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-obtain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title below the image */}
        <div className="mt-4 flex flex-col items-center">
          <h3 className="text-xl 2xl:text-4xl font-semibold  text-foreground">{title}</h3>
        </div>

        {/* Content - only show if not simplified version */}
        {!showOnlyTitleAndImage && (
          <>
            <div className="mt-3 flex flex-col items-center flex-1">
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3 max-w-[90%]">
                {description}
              </p>
            </div>

            {/* Read More */}
            <button
              onClick={handleOpenModal}
              className="mt-4 text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition"
            >
              Read more
            </button>
          </>
        )}
      </motion.div>

      {/* Popup Modal - only show if not simplified version */}
      {!showOnlyTitleAndImage && (
        
        <AnimatePresence>
       {open && (
    <AnimatePresence>
    {/* Overlay */}
    <motion.div
      className="fixed inset-0 z-[550] flex items-start justify-center pt-20 pb-8 bg-black/50 backdrop-blur-sm overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      {/* Modal Content */}
      <motion.div
        className="relative bg-white text-foreground rounded-2xl shadow-2xl w-full max-w-3xl mx-4 p-6"
        initial={{ scale: 0.9, opacity: 0, y: -30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -30 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-[30px] right-[30px] w-[30px] h-[30px] shadow-full bg-white rounded-full text-muted-foreground hover:text-foreground text-lg z-10"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative w-full h-[250px] rounded-xl overflow-hidden mb-6 ">
          <Image
            src={image}
            alt={title}
            fill
            className="object-obtain"
          />
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-bold text-center mb-3">{title}</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        {/* Requirements Section */}
        {requirementsTitle && (
          <h4 className="text-lg font-semibold text-primary mb-2">
            {requirementsTitle}
          </h4>
        )}
        <ul className="space-y-2 mb-6">
          {requirements.map((req, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-foreground"
            >
              <span className="w-2 h-2 mt-2 bg-primary rounded-full"></span>
              <span>{req}</span>
            </li>
          ))}
        </ul>

        {/* Large Card Section */}
        {largeCard && (
          <div className="bg-muted p-5 rounded-xl shadow-sm">
            <h5 className="font-semibold text-lg text-primary mb-2">
              {largeCard.title}
            </h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {largeCard.body}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  </AnimatePresence>
)}
        </AnimatePresence>
      )}

    </>
  )
}
