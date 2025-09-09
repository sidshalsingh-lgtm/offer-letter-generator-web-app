import React from 'react';
import { Mail } from 'lucide-react';
import { LoadingSpinner } from '../LoadingSpinner';

interface DocumentStepProps {
  htmlContent: string;
  onSendEmail: () => void;
  loading: boolean;
}

export const DocumentStep: React.FC<DocumentStepProps> = ({ 
  htmlContent, 
  onSendEmail, 
  loading 
}) => {
  if (loading) {
    return <LoadingSpinner message="Sending offer letter via email..." size="lg" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Generated Offer Letter</h2>
        <p className="text-gray-600">
          Review your generated offer letter below
        </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Offer Letter Document</h3>
          <button
            onClick={onSendEmail}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-200"
          >
            <Mail size={20} />
            <span>Send via Email</span>
          </button>
        </div>
        
        <div className="p-6">
          <iframe
            srcDoc={htmlContent}
            className="w-full h-96 border border-gray-200 rounded-lg"
            title="Offer Letter"
          />
        </div>
      </div>
      </div>
    </div>
  );
};