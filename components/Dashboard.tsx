import React from 'react';
import type { DashboardData } from '../services/data';

type EsgCategory = 'ENVIRONMENTAL' | 'SOCIAL' | 'GOVERNANCE';

interface DashboardProps {
  data: DashboardData;
  onInputChange: (parameterIndex: number, newValue: number) => void;
  activeTab: EsgCategory;
}

const formatNumber = (num: number, precision: number = 3) => num.toFixed(precision);

const tabColumnRanges: Record<EsgCategory, { start: number; end: number }> = {
    ENVIRONMENTAL: { start: 0, end: 4 },
    SOCIAL: { start: 5, end: 8 },
    GOVERNANCE: { start: 9, end: 11 },
};

export const Dashboard: React.FC<DashboardProps> = ({ data, onInputChange, activeTab }) => {
  const { start, end } = tabColumnRanges[activeTab];

  const visibleSubCategories = data.headers.subCategories.slice(start, end + 1);
  const visibleWeights = data.headers.weights.slice(start, end + 1);

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
              <thead className="border-b-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50">
                  <tr>
                      <th scope="col" className="p-2 sm:p-3 border-r border-slate-200 dark:border-slate-700 w-56 min-w-48 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Parameter</th>
                      {visibleSubCategories.map((subCat, index) => (
                          <th scope="col" key={subCat} className="p-2 sm:p-3 font-semibold whitespace-normal w-40 min-w-36 text-center text-xs sm:text-sm uppercase tracking-wider align-middle">
                              {subCat}
                              <span className="block font-normal normal-case text-xs text-slate-500 dark:text-slate-400 mt-1">({formatNumber(visibleWeights[index])})</span>
                          </th>
                      ))}
                      <th scope="col" className="p-2 sm:p-3 border-l border-slate-200 dark:border-slate-700 w-24 min-w-20 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider">Input</th>
                  </tr>
              </thead>
              <tbody>
                  {data.parameters.map((param, paramIndex) => (
                      <tr key={param.name} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150">
                          <th scope="row" className="p-2 sm:p-2.5 border-r border-slate-200 dark:border-slate-700 font-medium bg-yellow-50 dark:bg-yellow-900/20 whitespace-normal text-left">{param.name}</th>
                          {param.scores.slice(start, end + 1).map((score, scoreIndex) => (
                              <td key={scoreIndex} className="p-2 sm:p-2.5 border-b border-slate-200 dark:border-slate-700 tabular-nums text-center">{formatNumber(score)}</td>
                          ))}
                          <td className="p-0 border-b border-l border-slate-200 dark:border-slate-700 bg-green-100 dark:bg-green-900/30">
                              <input
                                  type="number"
                                  value={param.input}
                                  onChange={(e) => onInputChange(paramIndex, e.target.valueAsNumber)}
                                  min="0"
                                  max="6"
                                  step="1"
                                  className="w-full h-full p-2 text-center bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset rounded-none font-semibold"
                                  aria-label={`Input for ${param.name}`}
                              />
                          </td>
                      </tr>
                  ))}
              </tbody>
              <tfoot className="font-bold border-t-2 border-slate-300 dark:border-slate-600">
                  {Object.entries(data.footer).map(([key, rowData]) => (
                      <tr key={key}>
                          <th scope="row" className="p-2 sm:p-2.5 border-r border-slate-200 dark:border-slate-700 text-left bg-slate-50 dark:bg-slate-700/50">{rowData.label}</th>
                          {rowData.values.slice(start, end + 1).map((val, index) => (
                              <td key={index} className="p-2 sm:p-2.5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 tabular-nums text-center">{formatNumber(val)}</td>
                          ))}
                           <td className="p-2 sm:p-2.5 border-b border-l border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-700"></td>
                      </tr>
                  ))}
              </tfoot>
          </table>
      </div>
    </div>
  );
};