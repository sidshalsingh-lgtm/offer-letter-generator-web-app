import React, { useRef, useState } from 'react';
import { Upload, FileAudio } from 'lucide-react';
import { LoadingSpinner } from '../LoadingSpinner';

interface UploadStepProps {
  onUpload: (file: File) => void;
  loading: boolean;
}

export const UploadStep: React.FC<UploadStepProps> = ({ onUpload, loading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('audio/') || file.name.endsWith('.wav') || file.name.endsWith('.mp3')) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid audio file');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Extracting details from audio recording..." size="lg" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Upload Meeting Recording</h2>
        <p className="text-gray-600">
          Upload the audio file from your meeting to extract loan details automatically
        </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : selectedFile
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept="audio/*,.wav,.mp3"
            onChange={handleInputChange}
            className="hidden"
          />

          {selectedFile ? (
            <div className="space-y-4">
              <FileAudio className="mx-auto text-green-600" size={48} />
              <div>
                <p className="font-semibold text-green-800">{selectedFile.name}</p>
                <p className="text-sm text-gray-600">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Choose different file
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="mx-auto text-gray-400" size={48} />
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  Drop your audio file here
                </p>
                <p className="text-gray-500">or click to browse</p>
              </div>
              <button
                onClick={() => inputRef.current?.click()}
                className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-200"
              >
                Choose File
              </button>
            </div>
          )}
        </div>

        {selectedFile && (
          <div className="mt-6 text-center">
            <button
              onClick={handleUpload}
              className="px-8 py-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-200"
            >
              Extract Details
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};