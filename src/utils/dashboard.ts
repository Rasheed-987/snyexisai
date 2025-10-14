
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

// Enhanced utility function for fetching case studies
export const fetchCaseStudies = async (
  setCaseStudies: React.Dispatch<React.SetStateAction<CaseStudy[]>>, 
  setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  options?: {
    limit?: number;
    page?: number;
    status?: 'draft' | 'published' | 'archived';
    showLoading?: boolean;
  }
) => {
  try {
    if (options?.showLoading !== false) {
      setLoading(true);
    }
    
    const params = new URLSearchParams();
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.page) params.append('page', options.page.toString());
    if (options?.status) params.append('status', options.status);
    
    const url = `/api/case-studies${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch case studies');
    }

    const caseStudiesData = await response.json();
    console.log('Fetched case studies:', caseStudiesData);
    
    if (caseStudiesData.success) {
      setCaseStudies(caseStudiesData.caseStudies);
      setError(null); // Clear any previous errors
    } else {
      throw new Error('API returned unsuccessful response');
    }
    
    return caseStudiesData; // Return data for additional processing if needed
  } catch (error) {
    console.error('Error fetching case studies:', error);
    setError(error instanceof Error ? error.message : 'Failed to fetch case studies');
    setCaseStudies([]); // Clear case studies on error
    throw error; // Re-throw for caller to handle if needed
  } finally {
    if (options?.showLoading !== false) {
      setLoading(false);
    }
  }
};

// Utility function for deleting a case study
export const deleteCaseStudy = async (
  id: string,
  caseStudies: CaseStudy[],
  setCaseStudies: React.Dispatch<React.SetStateAction<CaseStudy[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  options?: {
    showConfirmation?: boolean;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
) => {
  try {
    // Show confirmation dialog if enabled
    if (options?.showConfirmation !== false) {
      const confirmed = window.confirm('Are you sure you want to delete this case study? This action cannot be undone.');
      if (!confirmed) return false;
    }
    
    setLoading(true);
    console.log('Deleting case study:', id);
    
    const response = await fetch(`/api/case-studies/${id}`, {
      method: 'DELETE'
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete case study');
    }
    
    console.log('✅ Case study deleted successfully');
    
    // Remove case study from local state
    setCaseStudies(caseStudies.filter(caseStudy => caseStudy._id !== id));
    
    // Call success callback if provided
    if (options?.onSuccess) {
      options.onSuccess();
    } else {
      alert('Case study deleted successfully!');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error deleting case study:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete case study';
    
    // Call error callback if provided
    if (options?.onError) {
      options.onError(errorMessage);
    } else {
      alert(errorMessage);
    }
    
    return false;
  } finally {
    setLoading(false);
  }
};
