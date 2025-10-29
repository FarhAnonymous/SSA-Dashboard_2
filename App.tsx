import React, { useState, useMemo, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Legend } from './components/Legend';
import { Insights } from './components/Insights';
import { Sidebar } from './components/Sidebar';
import { initialDashboardData } from './services/data';
import { recalculateState } from './utils/calculations';
import { MenuIcon } from './components/icons/MenuIcon';

type EsgCategory = 'ENVIRONMENTAL' | 'SOCIAL' | 'GOVERNANCE';
export type AppView = 'ASSESSMENT' | 'INSIGHTS';

const getPerformanceTier = (score: number): { label: string; colorClass: string, textClass: string } => {
  const roundedScore = Math.round(score);
  if (roundedScore <= 0) return { label: 'Negative Impact High', colorClass: 'bg-red-500', textClass: 'text-red-500' };
  if (roundedScore === 1) return { label: 'Negative Impact Medium', colorClass: 'bg-red-400', textClass: 'text-red-400' };
  if (roundedScore === 2) return { label: 'Negative Impact Low', colorClass: 'bg-amber-500', textClass: 'text-amber-500' };
  if (roundedScore === 3) return { label: 'Neutral', colorClass: 'bg-blue-500', textClass: 'text-blue-500' };
  if (roundedScore === 4) return { label: 'Positive Impact Low', colorClass: 'bg-green-400', textClass: 'text-green-400' };
  if (roundedScore === 5) return { label: 'Positive Impact Medium', colorClass: 'bg-green-500', textClass: 'text-green-500' };
  return { label: 'Positive Impact High', colorClass: 'bg-green-600', textClass: 'text-green-600' };
};

const LeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a3e635" />
        <stop offset="100%" stopColor="#65a30d" />
      </linearGradient>
    </defs>
    <path 
      d="M32 59.7C19.7 51.5 13.6 37.3 17.8 24.1c2.5-7.8 8.3-14.3 15.9-18.1" 
      stroke="url(#leafGradient)" 
      strokeWidth="5" 
      fill="none" 
      strokeLinecap="round" 
      transform="rotate(15 32 32)" 
    />
    <ellipse cx="23.5" cy="40" rx="9" ry="5" fill="url(#leafGradient)" transform="rotate(50 23.5 40)" />
    <ellipse cx="21" cy="28" rx="8" ry="4" fill="url(#leafGradient)" transform="rotate(50 21 28)" />
    <ellipse cx="38" cy="21" rx="9" ry="5" fill="url(#leafGradient)" transform="rotate(-35 38 21)" />
    <ellipse cx="43" cy="32" rx="10" ry="6" fill="url(#leafGradient)" transform="rotate(-35 43 32)" />
    <ellipse cx="47" cy="44" rx="9" ry="5" fill="url(#leafGradient)" transform="rotate(-35 47 44)" />
  </svg>
);


const App: React.FC = () => {
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [activeEsgTab, setActiveEsgTab] = useState<EsgCategory>('ENVIRONMENTAL');
  const [activeView, setActiveView] = useState<AppView>('ASSESSMENT');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSetView = (view: AppView) => {
    setActiveView(view);
    setIsSidebarOpen(false);
  };

  const handleInputChange = (parameterIndex: number, newValue: number) => {
    const newRawValue = isNaN(newValue) ? 0 : newValue;
    const clampedValue = Math.max(0, Math.min(6, newRawValue));

    setDashboardData(prevState => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.parameters[parameterIndex].input = clampedValue;
      return recalculateState(newState, initialDashboardData);
    });
  };
  
  const overallPerformance = useMemo(() => {
    return dashboardData.overallScore.toFixed(2);
  }, [dashboardData.overallScore]);

  const performanceTier = useMemo(() => getPerformanceTier(dashboardData.overallScore), [dashboardData.overallScore]);

  const ESG_TABS: EsgCategory[] = ['ENVIRONMENTAL', 'SOCIAL', 'GOVERNANCE'];

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 flex flex-col items-center">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        activeView={activeView} 
        setActiveView={handleSetView} 
      />
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30"
          aria-hidden="true"
        ></div>
      )}
      
      <header className={`w-full sticky top-0 z-20 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-700'
            : 'bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm'
        }`}>
          <div className={`max-w-screen-2xl mx-auto flex items-center flex-wrap gap-2 sm:gap-4 px-4 sm:px-8 lg:px-12 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 rounded-full text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500">
              <MenuIcon className="w-6 h-6" />
              <span className="sr-only">Open Menu</span>
            </button>
            <div className="transition-transform duration-300 hover:scale-110 animate-pulse-gentle">
                <LeafIcon className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Social Sustainability Assessment 2.0
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Interactive dashboard for assessing ESG Index performance
              </p>
            </div>
          </div>
        </header>

      <div className="w-full max-w-screen-2xl mx-auto flex flex-1 p-4 sm:p-8 lg:p-12">
        <main className="flex-1">
           {activeView === 'ASSESSMENT' && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-2 sm:p-6 lg:p-8">
                <div className="mb-6">
                  <div className="p-1.5 flex flex-wrap gap-1 sm:gap-2 items-center bg-slate-200 dark:bg-slate-700/80 rounded-xl">
                    {ESG_TABS.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveEsgTab(tab)}
                        className={`${
                          activeEsgTab === tab
                            ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md'
                            : 'text-slate-600 hover:bg-slate-300/50 dark:text-slate-300 dark:hover:bg-slate-600/50'
                        } whitespace-nowrap py-2.5 px-3 sm:px-6 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-slate-900`}
                        aria-current={activeEsgTab === tab ? 'page' : undefined}
                      >
                        {tab.charAt(0) + tab.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <Dashboard data={dashboardData} onInputChange={handleInputChange} activeTab={activeEsgTab} />

                <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
                  <div className="lg:col-span-1 p-4 sm:p-6 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col justify-center">
                    <h2 className="text-sm sm:text-base font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Overall ESG Index Performance</h2>
                    <div className="relative mt-2">
                      <p className="text-5xl sm:text-7xl font-bold text-slate-900 dark:text-white">{overallPerformance}</p>
                       <div className="absolute top-0 right-0">
                          <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full ${performanceTier.colorClass} bg-opacity-10 dark:bg-opacity-20 ${performanceTier.textClass}`}>
                              {performanceTier.label}
                          </span>
                       </div>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mt-4">
                        <div className={`${performanceTier.colorClass} h-2.5 rounded-full`} style={{ width: `${(dashboardData.overallScore / 6) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <Legend />
                  </div>
                </div>
              </div>
           )}

           {activeView === 'INSIGHTS' && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-2 sm:p-6 lg:p-8">
                <Insights data={dashboardData} />
              </div>
           )}
        </main>
      </div>

       <footer className="w-full max-w-screen-2xl mx-auto text-center pb-8 px-4 sm:px-8 lg:px-12">
            <p className="text-sm text-slate-500 dark:text-slate-400">
                {activeView === 'ASSESSMENT' ? "Change values in the green 'INPUT' column to see the dashboard update in real-time. On smaller screens, the table may be horizontally scrollable." : "Charts will update in real-time as you change data in the Assessment tab."}
            </p>
        </footer>
    </div>
  );
};

export default App;