import React from 'react';

/**
 * Reusable Container Component
 * Enforces max widths and horizontal padding across layouts.
 */
export default function Container({ 
  children, 
  className = '', 
  size = 'lg', 
  as: Component = 'div',
  ...props 
}) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-(--size-container-max)', // Resolves Tailwind v4 config variable
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <Component
      className={`w-full mx-auto px-(--spacing-container-px) ${sizeClasses[size] || sizeClasses.lg} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
