
export function getCurrentDate(setDate: (date: string) => void) {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
    setDate(currentDate);
}
import React from 'react'

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function highlightJobTitle(
  job: { description: string; jobTitle?: string },
  jobTitle?: string
): React.ReactNode[] {
  const title = (jobTitle || job.jobTitle || '').trim();
  const description = job.description || '';

  if (!title) return [description];

  // Create a regex for only the first match (no global flag)
  const regex = new RegExp(`(${escapeRegExp(title)})`, 'i');

  const parts = description.split(regex);

  let boldedOnce = false;

  return parts.map((part, i) => {
    if (!boldedOnce && part.toLowerCase() === title.toLowerCase()) {
      boldedOnce = true;
      return React.createElement('strong', { key: i }, part);
    }
    return part;
  });
}

// Helpers for requirements/responsibilities array fields
export const addRequirement = (text: string, setRequirements: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (!text.trim()) return
    setRequirements((prev) => [...prev, text.trim()])
  }

 export const removeRequirement = (index: number, setRequirements: React.Dispatch<React.SetStateAction<string[]>>) => {
    setRequirements((prev) => prev.filter((_, i) => i !== index))
  }
