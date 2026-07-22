import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dumbbell, Apple, BookOpen, User } from 'lucide-react';

const leftItems = [
  { path: '/training', icon: Dumbbell, labelKey: 'nav.training' },
  { path: '/nutrition', icon: Apple, labelKey: 'nav.nutrition' },
];

const rightItems = [
  { path: '/library', icon: BookOpen, labelKey: 'nav.library' },
  { path: '/profile', icon: User, labelKey: 'nav.profile' },
];

function NavItem({ path, icon: Icon, labelKey, t }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
          isActive
            ? 'text-primary-400'
            : 'text-slate-500 hover:text-slate-400 dark:text-slate-500 dark:hover:text-slate-300'
        }`
      }
    >
      <Icon className="w-6 h-6" />
      <span className="text-[10px] font-medium">{t(labelKey)}</span>
    </NavLink>
  );
}

export default function BottomNav() {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Home FAB — positioned above the bar */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-10">
        <NavLink to="/">
          {({ isActive }) => (
            <div className={`w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30 transition-transform ${isActive ? 'scale-105' : ''}`}>
              <svg width="28" height="28" viewBox="0 0 512 512" fill="none">
                <polyline
                  points="45,400 130,270 195,340 275,210 340,280 430,150"
                  stroke="#0a0a0a"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M400,165 L430,150 L432,183"
                  stroke="#0a0a0a"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </NavLink>
      </div>

      {/* Bar */}
      <div className="bg-white dark:bg-surface-dark-alt border-t border-slate-200 dark:border-slate-800">
        <div
          className="max-w-lg mx-auto flex items-center justify-around h-16"
          style={{ paddingBottom: 'max(var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px)), 0.75rem)' }}
        >
          {leftItems.map((item) => (
            <NavItem key={item.path} {...item} t={t} />
          ))}

          {/* Spacer for the FAB */}
          <div className="w-14" />

          {rightItems.map((item) => (
            <NavItem key={item.path} {...item} t={t} />
          ))}
        </div>
      </div>
    </nav>
  );
}
