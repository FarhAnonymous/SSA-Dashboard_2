
import React from 'react';
// Note: In a real project, you'd install this. Here we assume a bundler or environment handles it.
// For this single-file setup, we rely on browser-native features and Tailwind's 'prose'.
// To render markdown, we'll just wrap it in a pre-formatted tag for simplicity without extra libraries.

interface AnalysisResultProps {
  content: string;
}

// A simple component to render markdown-like text.
// Using Tailwind's typography plugin (`prose`) classes for styling.
const SimpleMarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  // Simple replacement for markdown-like elements to HTML
  let html = text
    // Headers
    .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-semibold mt-4 mb-2">$1</h4>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-5 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3 border-b pb-2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-6 mb-4 border-b pb-2">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Unordered list
    .replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>')
    // Ordered list
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>')
    // Newlines to paragraphs
    .split('\n\n')
    .map(p => {
        if (p.startsWith('<h') || p.startsWith('<li')) return p;
        return p.trim() ? `<p>${p.replace(/\n/g, '<br/>')}</p>` : '';
    }).join('');

    // Wrap list items in <ul> or <ol>
    html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
        if (match.includes("1. ") || match.includes("2. ")) { // crude check for ordered
            return `<ol class="list-decimal list-inside space-y-1">${match}</ol>`;
        }
        return `<ul class="list-disc list-inside space-y-1">${match}</ul>`;
    });


  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};


export const AnalysisResult: React.FC<AnalysisResultProps> = ({ content }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analysis Report</h2>
      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 sm:p-6 rounded-lg prose dark:prose-invert max-w-none">
        <SimpleMarkdownRenderer text={content} />
      </div>
    </div>
  );
};
