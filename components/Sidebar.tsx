import React from 'react';
import type { AppView } from '../App';
import { AssessmentIcon } from './icons/AssessmentIcon';
import { ChartIcon } from './icons/ChartIcon';
import { CloseIcon } from './icons/CloseIcon';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const navItems: { view: AppView; label: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { view: 'ASSESSMENT', label: 'Assessment', icon: AssessmentIcon },
  { view: 'INSIGHTS', label: 'Insights', icon: ChartIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeView, setActiveView }) => {
  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="font-bold text-lg text-slate-800 dark:text-slate-200">Navigation</h2>
        <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500">
          <CloseIcon className="w-6 h-6" />
          <span className="sr-only">Close Menu</span>
        </button>
      </div>
      <div className="p-4">
        <nav className="flex flex-col space-y-2">
          {navItems.map(({ view, label, icon: Icon }) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-slate-900 ${
                activeView === view
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-slate-200'
              }`}
              aria-current={activeView === view ? 'page' : undefined}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};