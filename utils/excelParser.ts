
// This script relies on the xlsx library being available in the global scope,
// which is loaded via CDN in index.html.
declare var XLSX: any;

export const parseExcelToCSV = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event.target?.result) {
        return reject(new Error("Failed to read file."));
      }

      try {
        const data = new Uint8Array(event.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          return reject(new Error("No sheets found in the Excel file."));
        }

        const worksheet = workbook.Sheets[firstSheetName];
        const csvData = XLSX.utils.sheet_to_csv(worksheet);
        
        resolve(csvData);
      } catch (err) {
        reject(new Error("Error parsing Excel file. Please ensure it's a valid format."));
      }
    };

    reader.onerror = (error) => {
      reject(new Error("Error reading file: " + error));
    };

    reader.readAsArrayBuffer(file);
  });
};
