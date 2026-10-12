import React from 'react';

interface NetLinkLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const NetLinkLogo: React.FC<NetLinkLogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { box: 'w-7 h-7 rounded-lg', icon: 18, text: 'text-sm' },
    md: { box: 'w-8 h-8 rounded-xl', icon: 20, text: 'text-base' },
    lg: { box: 'w-11 h-11 rounded-2xl', icon: 26, text: 'text-xl' },
    xl: { box: 'w-14 h-14 rounded-3xl', icon: 34, text: 'text-2xl' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official NetLink Brand Squircle: Vibrant Gradient with Continuous Looping "N" Link */}
      <div
        className={`${sizeMap.box} bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-xs shrink-0 ring-1 ring-blue-400/40`}
        aria-hidden="true"
      >
        <svg
          width={sizeMap.icon}
          height={sizeMap.icon}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Continuous looping ribbon / interlocking link forming the letter N */}
          <path
            d="M9 22C6.79086 22 5 20.2091 5 18C5 15.7909 6.79086 14 9 14C11.2091 14 13 15.7909 13 18C13 19.3333 14 21 16 21C18 21 19 19.3333 19 18C19 14.5 13 10.5 13 7C13 4.79086 14.7909 3 17 3C19.2091 3 21 4.79086 21 7C21 8.5 20 10.5 18 11.5"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.25"
          />
          <path
            d="M9 21C6.79086 21 5 19.2091 5 17C5 14.7909 6.79086 13 9 13H11C13.5 13 15 15 16 16.5C17 18 18.5 20 21 20H23C25.2091 20 27 18.2091 27 16C27 13.7909 25.2091 12 23 12C20.5 12 19 14 18 15.5"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="17" r="2.2" fill="white" />
          <circle cx="23" cy="16" r="2.2" fill="white" />
        </svg>
      </div>

      {showText && (
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold text-slate-900 tracking-tight leading-none ${sizeMap.text}`}>
            NetLink
          </span>
        </div>
      )}
    </div>
  );
};
