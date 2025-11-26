import React, { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import  GridTextCard  from "@/components/ui/GridTextCard"

// FlipCard component for the grid cards
export const FlipCard = ({ frontImage, frontAlt, title, description, bgColor = "#22306A", startWithText = false }: {
    frontImage: string
    frontAlt: string
    title: string
    description: string
    bgColor?: string
    startWithText?: boolean
  }) => {
    const [isFlipped, setIsFlipped] = useState(false)

  

    return (
      <div
        className="rounded-xl h-[350px] xl:min-h-[400px] 2xl:min-h-[550px] cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onFocus={() => setIsFlipped(true)}
        onBlur={() => setIsFlipped(false)}
        tabIndex={0}
        role="button"
      >
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{ rotateX: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
         
          {startWithText ? (
            <>
              {/* Front Side - Text Card */}
              <div className="absolute w-full h-full inset-0 backface-hidden">
                <GridTextCard
                  title={title}
                  description={description}
                />
              </div>
              
              {/* Back Side - Image */}
              <div className="absolute rounded-xl  inset-0 w-full h-full backface-hidden flex"
                   style={{ backgroundColor: bgColor, transform: "rotateX(180deg)" }}>
                <Image
                  src={frontImage}
                  alt={frontAlt}
                  width={400}
                  height={260}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </>
          ) : (
            <>
              {/* Front Side - Image */}
              <div className="absolute inset-0  rounded-xl w-full h-full backface-hidden flex"
                   style={{ backgroundColor: bgColor }}>
                <Image
                  src={frontImage}
                  alt={frontAlt}
                  width={400}
                  height={260}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              
              {/* Back Side - Text Card */}
              <div className="absolute w-full h-full inset-0 backface-hidden"
                   style={{ transform: "rotateX(180deg)" }}>
                <GridTextCard
                  title={title}
                  description={description}
                />
              </div>
            </>
          )}
        </motion.div>
      </div>
    )
  }
