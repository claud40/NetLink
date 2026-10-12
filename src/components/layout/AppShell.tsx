import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-start">
      <div className="w-full max-w-lg mx-auto bg-white min-h-screen shadow-xs flex flex-col relative sm:border-x sm:border-slate-200/80">
        {children}
      </div>
    </div>
  );
};
