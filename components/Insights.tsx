import React, { useEffect, useRef, useMemo } from 'react';
import type { DashboardData } from '../services/data';

// Since Chart.js is loaded from a CDN, we need to declare it for TypeScript
declare var Chart: any;

const getPerformanceColor = (score: number): string => {
  const roundedScore = Math.round(score);
  if (roundedScore <= 0) return 'rgba(239, 68, 68, 0.6)';  // red-500
  if (roundedScore === 1) return 'rgba(248, 113, 113, 0.6)'; // red-400
  if (roundedScore === 2) return 'rgba(245, 158, 11, 0.6)';  // amber-500
  if (roundedScore === 3) return 'rgba(99, 102, 241, 0.6)';  // indigo-500
  if (roundedScore === 4) return 'rgba(74, 222, 128, 0.6)'; // green-400
  if (roundedScore === 5) return 'rgba(34, 197, 94, 0.6)';  // green-500
  return 'rgba(22, 163, 74, 0.6)'; // green-600
};

const getPerformanceBorderColor = (score: number): string => {
    return getPerformanceColor(score).replace('0.6', '1');
};

const SubCategoryBarChart: React.FC<{ data: DashboardData }> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const chartData = {
      labels: data.headers.subCategories.map(label => label.split(' ')),
      datasets: [{
        label: 'ESG Index',
        data: data.footer.esgIndex.values,
        backgroundColor: data.footer.esgIndex.values.map(getPerformanceColor),
        borderColor: data.footer.esgIndex.values.map(getPerformanceBorderColor),
        borderWidth: 1,
      }]
    };

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 6,
            grid: { color: 'rgba(100, 116, 139, 0.2)' },
            ticks: { color: '#64748b' }
          },
          x: {
            grid: { display: false },
            ticks: { 
                color: '#64748b',
                maxRotation: 90,
                minRotation: 70,
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b',
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 4,
            displayColors: false,
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]); // Re-render chart when data changes

  return <canvas ref={canvasRef} />;
};


const CategoryRadarChart: React.FC<{ data: DashboardData }> = ({ data }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<any>(null);

    const categoryAverages = useMemo(() => {
        const envScores = data.footer.esgIndex.values.slice(0, 5);
        const socialScores = data.footer.esgIndex.values.slice(5, 9);
        const govScores = data.footer.esgIndex.values.slice(9, 12);

        const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
        
        return [avg(envScores), avg(socialScores), avg(govScores)];
    }, [data]);


    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const chartData = {
            labels: ['Environmental', 'Social', 'Governance'],
            datasets: [{
                label: 'Average ESG Index',
                data: categoryAverages,
                fill: true,
                backgroundColor: 'rgba(79, 70, 229, 0.2)',
                borderColor: 'rgb(79, 70, 229)',
                pointBackgroundColor: 'rgb(79, 70, 229)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(79, 70, 229)'
            }]
        };

        chartRef.current = new Chart(ctx, {
            type: 'radar',
            data: chartData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                r: {
                    angleLines: { color: 'rgba(100, 116, 139, 0.2)' },
                    grid: { color: 'rgba(100, 116, 139, 0.2)' },
                    pointLabels: {
                        font: { size: 14 },
                        color: '#334155'
                    },
                    ticks: {
                        backdropColor: 'rgba(241, 245, 249, 0.8)',
                        color: '#64748b',
                        stepSize: 1
                    },
                    min: 0,
                    max: 6
                }
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 10,
                    cornerRadius: 4,
                }
              }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [categoryAverages]); // Re-render chart when data changes

    return <canvas ref={canvasRef} />;
};


export const Insights: React.FC<{ data: DashboardData }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
       <div className="xl:col-span-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">ESG Index by Sub-Category</h3>
            <div className="relative h-80 sm:h-96">
                <SubCategoryBarChart data={data} />
            </div>
        </div>
        <div className="xl:col-span-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Performance by Main Category</h3>
            <div className="relative h-80 sm:h-96">
                <CategoryRadarChart data={data} />
            </div>
        </div>
    </div>
  );
};