"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface ServicesCardProps {
  id?: string
  title: string
  image: string
  description: string
  requirements: string[]
  requirementsTitle: string
  largeCard: { title: string; body: string }
  showOnlyTitleAndImage?: boolean
}

export default function ServicesCard({
  id,
  title,
  image,
  description,
  requirements,
  requirementsTitle,
  largeCard,
  showOnlyTitleAndImage = false,
}: ServicesCardProps) {

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
            <Link
              href={`/services/${id}`}
              className="mt-4 text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition"
            >
              Read more
            </Link>
          </>
        )}
      </motion.div>
    </>
  )
}
