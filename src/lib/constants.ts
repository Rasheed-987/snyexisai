export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const APP_CONFIG = {
  name: 'Snyexisai',
  description: 'Modern Next.js application',
  version: '1.0.0',
  author: 'Snyexisai Team',
  email: 'contact@snyexisai.example.com',
  social: {
    twitter: '@snyexisai',
    github: 'https://github.com/snyexisai',
    linkedin: 'https://linkedin.com/company/snyexisai',
  }
}

export const THEME_CONFIG = {
  defaultTheme: 'light',
  storageKey: 'snyexisai-theme',
}

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  DASHBOARD: '/dashboard',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
}

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-()]+$/,
  PASSWORD_MIN_LENGTH: 8,
}