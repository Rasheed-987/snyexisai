
export interface CaseStudy {
  _id: string
  caseStudyId: string
  caseTitle: string
  subtitle: string
  addLine: string
  images: {
    banner?: string
    gallery: string[]
  }
  largeCard: { title: string; body: string }
  smallCardsA: Array<{ title: string; body: string }>
  smallCardsB: Array<{ title: string; body: string }>
  status: string
  createdAt: string
  updatedAt: string
}

interface ImageSlot {
  id: string
  file: File | null
  previewUrl: string | null
}


export const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number, imageSlots: ImageSlot[], setImageSlots: React.Dispatch<React.SetStateAction<ImageSlot[]>>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Clean up previous URL if it exists to prevent memory leaks
      if (imageSlots[index]?.previewUrl) {
        URL.revokeObjectURL(imageSlots[index].previewUrl)
      }
      
      const url = URL.createObjectURL(file)
      const newSlots: ImageSlot[] = imageSlots.map((slot, i) => 
        i === index ? { ...slot, file, previewUrl: url } : slot
      )
      setImageSlots(newSlots)
    } else {
      console.log('No file selected or index is invalid')
    }
  }

export const formatDate = (dateString: string) => {
   
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
      
      if (diffInHours < 1) return 'Just now'
      if (diffInHours < 24) return `${diffInHours}h ago`
      if (diffInHours < 48) return 'Yesterday'
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      })
    } catch {
      return 'Unknown'
    }
  }

