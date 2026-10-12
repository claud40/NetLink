import React from 'react';
import { DemoNotification } from '../../types/network';
import { Bell, X, CheckCheck, AlertCircle, Info } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: DemoNotification[];
  onMarkAllAsRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
              <p className="text-[10px] text-slate-500">Demo network alerts</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              type="button"
              className="text-[11px] text-blue-600 font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark read</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                notif.unread
                  ? 'bg-blue-50/30 border-blue-200'
                  : 'bg-slate-50/60 border-slate-200/70'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  {notif.type === 'warning' ? (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  ) : (
                    <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  )}
                  <span>{notif.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {notif.message}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            type="button"
            className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold cursor-pointer"
          >
            Close Notifications
          </button>
        </div>
      </div>
    </div>
  );
};
