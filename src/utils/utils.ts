
export function getCurrentDate(setDate: (date: string) => void) {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
    setDate(currentDate);
}
import React from 'react'
import { useState, useRef, useEffect } from 'react'

export function useDropdownHover(delay: number = 200) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, delay)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    handleMouseEnter,
    handleMouseLeave,
    closeDropdown,
  }
}

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

  // Memoize regex creation - though in utils, pattern is consistent per title
  // This prevents regex recompilation for the same title string
  const regex = React.useMemo(
    () => new RegExp(`(${escapeRegExp(title)})`, 'i'),
    [title]
  );

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


  export  const testimonials = [
      {
        image: "/images/home/img8.png",
        profileImage: "/images/home/profile.png",
        name: "Robin Fish",
        role: "Founder & CEO, Arrive",
        quote: "They brought our app redesign to life beyond expectations! We're thrilled with the results and truly loved collaborating with their incredibly talented team.",
        logo: "/images/home/arrive.png",
        location: "New York, USA"
      },
      {
        image: "/images/chronedo.jpeg",
        profileImage: "/images/home/profile.png",
        name: "Sarah Chen",
        role: "Product Director, TechFlow",
        quote: "Working with Synexis was a game-changer. Their attention to detail and innovative approach helped us deliver a product that exceeded all our expectations.",
        logo: "/images/chronedo_logo.jpeg",
        location: "San Francisco, USA"
      },
      {
        image: "/images/soarfare.jpeg",
        profileImage: "/images/home/profile.png",
        name: "James Anderson",
        role: "CEO, Digital Solutions",
        quote: "The team's expertise in UI/UX design transformed our platform. Every interaction feels intuitive and seamless. Highly recommend their services!",
        logo: "/images/sorarFare_logo.jpeg",
        location: "London, UK"
      },
      {
        image: "/images/client/img1_3.png",
        profileImage: "/images/home/profile.png",
        name: "Maria Rodriguez",
        role: "Founder, Innovation Lab",
        quote: "From concept to launch, Synexis guided us every step of the way. Their creative vision and technical excellence are unmatched. Truly exceptional work!",
        logo: null,
        location: "Barcelona, Spain"
      }
    ];
 export const faqs: { question: string; answer: string }[] = [
      {
        question: 'Why should I choose Synexis for my project?',
        answer:
          'We combine strategy, design, and engineering to deliver measurable outcomes. Our process focuses on business impact, not just deliverables.'
      },
      {
        question: 'What industries does Synexis specialize in?',
        answer:
          'We have experience across SaaS, healthcare, fintech, logistics, and e‑commerce, adapting our UX and engineering practices to each domain.'
      },
      {
        question: 'How does Synexis process differ from other agencies?',
        answer:
          'Short feedback loops, iterative delivery, and close collaboration. You see progress weekly and can steer direction early.'
      },
      {
        question: 'Do you exclusively use Webflow for projects?',
        answer:
          'No. We pick the right stack per project: Webflow for marketing, Next.js for apps, and custom backends where needed.'
      },
      {
        question: 'Can Synexis handle large-scale projects?',
        answer:
          'Yes. We design scalable architectures, CI/CD, observability, and follow security best practices to support growth.'
      },
      {
        question: 'What support can I expect after my project is completed?',
        answer:
          'We offer post‑launch support: performance tuning, A/B testing, feature iterations, and maintenance SLAs.'
      },
      {
        question: 'How quickly can Synexis deliver results?',
        answer:
          'POCs typically ship in 4–6 weeks. Production releases depend on scope, with milestones delivered every sprint.'
      },
      {
        question: 'Is Synexis a good fit if I’m looking for a branding agency in Dubai?',
        answer:
          'Yes. Our team covers brand, product, and web. We can deliver brand systems alongside websites and apps.'
      }
    ];