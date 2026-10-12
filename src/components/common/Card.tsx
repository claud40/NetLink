import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'surface' | 'subtle' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'surface',
  ...props
}) => {
  const variantStyles = {
    surface: 'bg-white border border-slate-200/80 shadow-xs',
    subtle: 'bg-slate-50/70 border border-slate-200/60',
    elevated: 'bg-white border border-slate-200 shadow-sm',
  }[variant];

  return (
    <div
      className={`rounded-2xl transition-all duration-150 ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
