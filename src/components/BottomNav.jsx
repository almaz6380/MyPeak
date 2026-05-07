import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dumbbell, Apple, BookOpen, User } from 'lucide-react';

const navItems = [
  { path: '/', icon: Dumbbell, labelKey: 'nav.training' },
  { path: '/nutrition', icon: Apple, labelKey: 'nav.nutrition' },
  { path: '/library', icon: BookOpen, labelKey: 'nav.library' },
  { path: '/profile', icon: User, labelKey: 'nav.profile' },
];

export default function BottomNav() {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark-alt border-t border-slate-200 dark:border-slate-700 z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 pb-[env(safe-area-inset-bottom)]">
        {navItems.map(({ path, icon: Icon, labelKey }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{t(labelKey)}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
