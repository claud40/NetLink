import React from 'react';
import { Home, Tag, BarChart2, Scale, MoreHorizontal } from 'lucide-react';
import { NavTabId } from '../../types/network';

interface BottomNavProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: { id: NavTabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'networks', label: 'Bundles', icon: Tag },
    { id: 'activity', label: 'Usage', icon: BarChart2 },
    { id: 'compare', label: 'Compare', icon: Scale },
    { id: 'profile', label: 'More', icon: MoreHorizontal },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 max-w-lg mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 shadow-md select-none"
      aria-label="Bottom Navigation"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              type="button"
              className={`flex flex-col items-center justify-center py-0.5 min-h-[38px] rounded-lg transition-all cursor-pointer ${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              aria-label={`Go to ${item.label}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`relative flex items-center justify-center w-6 h-6 rounded-md transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-500'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {isActive && (
                  <span className="absolute -bottom-0.5 w-1 h-1 bg-blue-600 rounded-full" />
                )}
              </div>
              <span className={`text-[9.5px] mt-0.5 leading-none ${isActive ? 'text-blue-600 font-bold' : 'text-slate-500 font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
