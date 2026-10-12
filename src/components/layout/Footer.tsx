import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-3 border-t border-slate-200/70 pt-2.5 pb-1 px-4 text-[10px] text-slate-400">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-2 text-center sm:text-left">
        <span>NetLink · Zambia</span>
        <span>One app. All your networks.</span>
      </div>
    </footer>
  );
};
