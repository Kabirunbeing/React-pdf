import React, { useState, useRef } from 'react';

const PDFViewer = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const [jumpPage, setJumpPage] = useState(''); // Page jump state
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    setFile(file);
    setScale(1); // Reset scale when a new file is selected
    setCurrentPage(1); // Reset page when a new file is selected
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const additionalFunctions = {
    rotatePDF: () => {
      console.log('Rotate PDF functionality to be implemented');
    },
    downloadPDF: () => {
      if (file) {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    },
    zoomIn: () => {
      setScale((prevScale) => Math.min(prevScale + 0.1, 2)); // Maximum zoom level
    },
    zoomOut: () => {
      setScale((prevScale) => Math.max(prevScale - 0.1, 1)); // Minimum zoom level
    },
    reset: () => {
      setFile(null);
      setScale(1);
      setCurrentPage(1);
      setTotalPages(1);
      setSearchText('');
    },
    nextPage: () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    },
    previousPage: () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    },
    search: (text) => {
      setSearchText(text);
      console.log(`Searching for: ${text}`);
    },
    highlightText: () => {
      console.log('Highlight Text functionality to be implemented');
    },
    fitToWidth: () => {
      // Fit the PDF to the width of the container (scale adjustment)
      setScale(1);
    },
    jumpToPage: () => {
      const page = parseInt(jumpPage, 10);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    toggleDarkMode: () => {
      setDarkMode(!darkMode);
    },
  };

  // Simulate PDF loading to set total pages for demonstration (replace this with actual PDF handling)
  React.useEffect(() => {
    if (file) {
      setTotalPages(5); // Assume there are 5 pages in the PDF for demonstration purposes
    }
  }, [file]);

  return (
    <div className={`flex flex-col items-center justify-center py-10 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div
        className={`w-full max-w-xl p-6 text-center border-2 border-dashed rounded-lg cursor-pointer transition-all ${
          isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept="application/pdf"
          className="hidden"
        />
        {file ? (
          <p className="text-lg font-medium">
            {file.name}
          </p>
        ) : (
          <p>
            Drag & drop a PDF file here, or <span className="text-blue-500 underline">click to upload</span>
          </p>
        )}
      </div>

      {file && (
        <div className="mt-8 w-full max-w-3xl">
          <iframe
            src={URL.createObjectURL(file)}
            title="PDF Viewer"
            className="w-full border rounded-lg"
            style={{ height: `${(96 * scale)}px` }} // Dynamic height based on scale
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={additionalFunctions.previousPage}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
            >
              Previous Page
            </button>
            <button
              onClick={additionalFunctions.nextPage}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
            >
              Next Page
            </button>
            <p className="self-center">{`Page ${currentPage} of ${totalPages}`}</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex space-x-4">
        <button
          onClick={additionalFunctions.rotatePDF}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-500"
        >
          Rotate PDF
        </button>
        <button
          onClick={additionalFunctions.downloadPDF}
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-500"
        >
          Download PDF
        </button>
        <button
          onClick={additionalFunctions.zoomIn}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500"
        >
          Zoom In
        </button>
        <button
          onClick={additionalFunctions.zoomOut}
          className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow hover:bg-orange-500"
        >
          Zoom Out
        </button>
        <button
          onClick={additionalFunctions.fitToWidth}
          className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-500"
        >
          Fit to Width
        </button>
        <button
          onClick={additionalFunctions.reset}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-500"
        >
          Reset
        </button>
      </div>

      <div className="mt-6">
        <input
          type="number"
          value={jumpPage}
          onChange={(e) => setJumpPage(e.target.value)}
          placeholder="Jump to page..."
          className="px-4 py-2 border rounded-lg"
        />
        <button
          onClick={additionalFunctions.jumpToPage}
          className="ml-4 px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow hover:bg-yellow-500"
        >
          Go
        </button>
      </div>

      {/* Dark mode toggle */}
      <div className="mt-6">
        <button
          onClick={additionalFunctions.toggleDarkMode}
          className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-gray-700"
        >
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
      {/* Search and Highlight Functionality */}
      <div className="mt-6">
        <input
          type="text"
          value={searchText}
          onChange={(e) => additionalFunctions.search(e.target.value)}
          placeholder="Search PDF..."
          className="px-4 py-2 border rounded-lg"
        />
        <button
          onClick={additionalFunctions.highlightText}
          className="ml-4 px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow hover:bg-yellow-500"
        >
          Highlight Text
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;

    