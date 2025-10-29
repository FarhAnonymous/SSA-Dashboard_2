import React from 'react';

const legendData = [
  { label: 'Negative impact High', value: 0, color: 'bg-red-300 dark:bg-red-700/50' },
  { label: 'Negative impact Medium', value: 1, color: 'bg-red-200 dark:bg-red-700/40' },
  { label: 'Negative impact Low', value: 2, color: 'bg-amber-200 dark:bg-amber-600/40' },
  { label: 'Neutral', value: 3, color: 'bg-slate-200 dark:bg-slate-600/50' },
  { label: 'Positive impact Low', value: 4, color: 'bg-lime-200 dark:bg-lime-600/40' },
  { label: 'Positive impact Medium', value: 5, color: 'bg-green-200 dark:bg-green-700/40' },
  { label: 'Positive impact High', value: 6, color: 'bg-green-300 dark:bg-green-700/50' },
];

export const Legend: React.FC = () => {
  return (
    <div className="h-full rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col bg-slate-50 dark:bg-slate-800/50">
      <div className="p-3 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 bg-slate-100 dark:bg-slate-700/50">
        <h3 className="text-base font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Legend</h3>
      </div>
      <div className="p-3 overflow-y-auto">
        <table className="w-full border-collapse text-sm table-fixed">
          <tbody>
            {legendData.map(({ label, value, color }) => (
              <tr key={label}>
                <td className="p-2 border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300 break-words">{label}</td>
                <td className={`p-2 border border-slate-200 dark:border-slate-700 w-12 text-center font-bold text-slate-800 dark:text-slate-100 ${color}`}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};