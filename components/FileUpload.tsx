
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { FileIcon } from './icons/FileIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileSelect = useCallback((file: File | null) => {
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setFileName(file.name);
      onFileChange(file);
    } else if (file) {
      alert("Please upload a valid Excel file (.xlsx, .xls).");
      onFileChange(null);
    } else {
      setFileName(null);
      onFileChange(null);
    }
  }, [onFileChange]);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    onFileChange(null);
    // Reset file input value
    const input = document.getElementById('file-upload') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };
  
  if (fileName) {
    return (
        <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between transition-all duration-300">
            <div className="flex items-center gap-3">
                <FileIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-300" />
                <span className="font-medium text-gray-800 dark:text-gray-200 truncate">{fileName}</span>
            </div>
            <button onClick={handleRemoveFile} className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
                <XCircleIcon className="w-6 h-6" />
            </button>
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="file-upload"
        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400"/>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Excel files (.xlsx or .xls)</p>
        </div>
        <input id="file-upload" type="file" className="hidden" accept=".xlsx, .xls" onChange={handleInputChange} />
      </label>
    </div>
  );
};
