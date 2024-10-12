import React, { useState, useRef, useEffect } from 'react';

const PDFViewer = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTextLayerEnabled, setIsTextLayerEnabled] = useState(true);
  const [pageLayout, setPageLayout] = useState('single');
  const [annotations, setAnnotations] = useState([]);
  const [password, setPassword] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);
  const fileInputRef = useRef(null);
  const pdfContainerRef = useRef(null);

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
    setScale(1);
    setCurrentPage(1);
    setRotation(0);
    setBookmarks([]);
    setNotes({});
    setAnnotations([]);
    setIsEncrypted(false);
    setPassword('');
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const additionalFunctions = {
    rotatePDF: () => {
      setRotation((prevRotation) => (prevRotation + 90) % 360);
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
      setScale((prevScale) => Math.min(prevScale + 0.1, 2));
    },
    zoomOut: () => {
      setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
    },
    reset: () => {
      setFile(null);
      setScale(1);
      setCurrentPage(1);
      setTotalPages(1);
      setSearchText('');
      setRotation(0);
      setBookmarks([]);
      setNotes({});
      setAnnotations([]);
      setIsEncrypted(false);
      setPassword('');
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
    jumpToPage: (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    },
    search: (text) => {
      setSearchText(text);
      console.log(`Searching for: ${text}`);
    },
    highlightText: () => {
      console.log('Highlight Text functionality to be implemented');
    },
    toggleDarkMode: () => {
      setDarkMode(!darkMode);
    },
    addBookmark: () => {
      if (file) {
        const newBookmark = { page: currentPage, label: `Bookmark on page ${currentPage}` };
        setBookmarks([...bookmarks, newBookmark]);
      }
    },
    addNote: () => {
      if (file) {
        const noteText = prompt('Enter your note:');
        if (noteText) {
          setNotes((prevNotes) => ({
            ...prevNotes,
            [currentPage]: [...(prevNotes[currentPage] || []), noteText],
          }));
        }
      }
    },
    toggleFullscreen: () => {
      if (!document.fullscreenElement) {
        pdfContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    },
    toggleTextLayer: () => {
      setIsTextLayerEnabled(!isTextLayerEnabled);
    },
    changePageLayout: () => {
      setPageLayout((prevLayout) => (prevLayout === 'single' ? 'double' : 'single'));
    },
    addAnnotation: () => {
      if (file) {
        const annotationText = prompt('Enter annotation text:');
        if (annotationText) {
          setAnnotations([...annotations, { page: currentPage, text: annotationText }]);
        }
      }
    },
    extractText: () => {
      console.log('Text extraction functionality to be implemented');
    },
    decryptPDF: () => {
      if (file && isEncrypted) {
        console.log(`Attempting to decrypt PDF with password: ${password}`);
        // Implement actual decryption logic here
        setIsEncrypted(false);
      }
    },
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (file) {
      setTotalPages(5); // Assume there are 5 pages in the PDF for demonstration purposes
      // Simulating an encrypted PDF for demonstration
      setIsEncrypted(Math.random() > 0.5);
    }
  }, [file]);

  return (
    <div className={`flex flex-col items-center justify-center py-10 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={additionalFunctions.toggleDarkMode}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 focus:outline-none"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

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
          <p className="text-lg font-medium text-gray-700">{file.name}</p>
        ) : (
          <p className="text-gray-500">
            Drag & drop a PDF file here, or{' '}
            <span className="text-blue-500 underline">click to upload</span>
          </p>
        )}
      </div>

      <div className="mt-8 w-full max-w-3xl" ref={pdfContainerRef}>
        {file ? (
          <div
            className="relative"
            style={{
              height: '80vh',
              width: '100%',
              overflow: 'auto',
            }}
          >
            <iframe
              src={URL.createObjectURL(file)}
              title="PDF Viewer"
              className="w-full h-full border rounded-lg"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transformOrigin: 'top left',
                maxHeight: '100%',
                maxWidth: '100%',
              }}
            />
            {isTextLayerEnabled && (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <p className="text-red-500">Text layer placeholder</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-200 h-80 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">No PDF loaded</p>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={additionalFunctions.previousPage}
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
            disabled={!file || currentPage === 1}
          >
            Previous Page
          </button>
          <button
            onClick={additionalFunctions.nextPage}
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
            disabled={!file || currentPage === totalPages}
          >
            Next Page
          </button>
          <p className="self-center">{file ? `Page ${currentPage} of ${totalPages}` : 'No PDF loaded'}</p>
        </div>

        <div className="mt-4 flex items-center">
          <input
            type="number"
            value={currentPage}
            onChange={(e) => additionalFunctions.jumpToPage(Number(e.target.value))}
            min={1}
            max={totalPages}
            className="px-4 py-2 border rounded-lg mr-4 w-20"
            placeholder="Page #"
            disabled={!file}
          />
          <span className="text-sm">
            {file ? `Jump to page (1 - ${totalPages})` : 'No PDF loaded'}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <button
            onClick={additionalFunctions.zoomIn}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500"
            disabled={!file}
          >
            Zoom In
          </button>
          <button
            onClick={additionalFunctions.zoomOut}
            className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow hover:bg-orange-500"
            disabled={!file}
          >
            Zoom Out
          </button>
          <button
            onClick={additionalFunctions.reset}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-500"
          >
            Reset
          </button>
          <button
            onClick={additionalFunctions.downloadPDF}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-500"
            disabled={!file}
          >
            Download PDF
          </button>
          <button
            onClick={additionalFunctions.rotatePDF}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-500"
            disabled={!file}
          >
            Rotate
          </button>
          <button
            onClick={additionalFunctions.addBookmark}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-500"
            disabled={!file}
          >
            Add Bookmark
          </button>
          <button
            onClick={additionalFunctions.addNote}
            className="px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow hover:bg-pink-500"
            disabled={!file}
          >
            Add Note
          </button>
          <button
            onClick={additionalFunctions.toggleFullscreen}
            className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-500"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          <button
            onClick={additionalFunctions.toggleTextLayer}
            className="px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow hover:bg-cyan-500"
            disabled={!file}
          >
            {isTextLayerEnabled ? 'Disable Text Layer' : 'Enable Text Layer'}
          </button>
          <button
            onClick={additionalFunctions.changePageLayout}
            className="px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow hover:bg-yellow-500"
            disabled={!file}
          >
            {pageLayout === 'single' ? 'Double Page' : 'Single Page'}
          </button>
          <button
            onClick={additionalFunctions.addAnnotation}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-500"
            disabled={!file}
          >
            Add Annotation
          </button>
          <button
            onClick={additionalFunctions.extractText}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-500"
            disabled={!file}
          >
            Extract Text
          </button>
        </div>

        {isEncrypted && (
          <div className="mt-4 flex items-center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter PDF password"
              className="px-4 py-2 border rounded-lg w-48"
            />
            <button
              onClick={additionalFunctions.decryptPDF}
              className="ml-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-500"
            >
              Decrypt PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
