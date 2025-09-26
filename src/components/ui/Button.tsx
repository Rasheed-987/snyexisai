'use client'

import React from 'react';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'nav-outline' | 'nav-primary' | 'nav-1' | 'nav-2'| 'nav-contact';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'nav-menu' | 'nav-cta' | 'nav-1' | 'nav-contact';
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
  type?: ButtonType;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  style = {},
  onClick,
  disabled = false,
  type = 'button',
  ...props 
}) => {
  // Base button styles with Chillax typography
  const baseStyles = 'inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 btn-chillax';
  
  // Variant styles
  const variantStyles: Record<ButtonVariant, string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    // New navigation-specific variants
    'nav-outline': 'bg-transparent border border-gray-300 hover:bg-gray-50 text-foreground',
    'nav-primary': 'bg-ring text-white hover:opacity-90',
    'nav-1': 'bg-ring text-white hover:opacity-90',
    'nav-2': 'bg-[#F1F1F1] text-[#0F1C3D] hover:bg-[#E1E1E1]',
    'nav-contact': 'bg-[#E3E3E3] text-[#0F1C3D] hover:bg-[#D3D3D3]',
  };
  
  // Size styles
  const sizeStyles: Record<ButtonSize, string> = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
    // New navigation-specific sizes
    'nav-menu': 'w-[88.05px] h-[47px]',
    'nav-cta': 'w-[106.83px] h-[47px]',
    'nav-1': 'w-[113.01px] h-[35.11px] rounded-[21.05px]',
    'nav-contact': 'w-[200.44px] h-[66px] rounded-[1440px]',
  };
  
  // Border radius styles for pill buttons
  const pillStyle = (size === 'nav-menu' || size === 'nav-cta') ? { borderRadius: '1400px' } : {};
  
  // Combine all classes
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();
  
  return (
    <button
      type={type}
      className={buttonClasses}
      style={{ ...pillStyle, ...style }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;