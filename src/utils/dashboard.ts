

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