import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'accent' | 'warning';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const variantStyles = {
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200/70',
    accent: 'bg-blue-50 text-blue-700 border border-blue-200/60',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200/60',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
