import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] duration-150';

  const sizeStyles = {
    sm: 'min-h-[36px] px-3 text-xs rounded-xl gap-1.5',
    md: 'min-h-[44px] px-4 py-2.5 text-sm rounded-xl gap-2',
    lg: 'min-h-[48px] px-6 py-3 text-base rounded-2xl gap-2.5',
  }[size];

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs active:bg-blue-800',
    secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300',
    outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
