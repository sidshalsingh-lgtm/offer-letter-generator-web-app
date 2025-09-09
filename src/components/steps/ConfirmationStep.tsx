import React from 'react';
import { CheckCircle, Mail } from 'lucide-react';

interface ConfirmationStepProps {
  onRestart: () => void;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ onRestart }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-6">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="text-white" size={48} />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Email Sent Successfully!</h2>
          <p className="text-xl text-gray-600">
            The offer letter has been sent to the customer's email address.
          </p>
        </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 max-w-md mx-auto">
        <div className="space-y-6">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
            <Mail className="text-white" size={24} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">Process Complete</h3>
            <p className="text-gray-600">
              The offer letter generation process has been completed successfully.
            </p>
          </div>

          <button
            onClick={onRestart}
            className="w-full py-4 px-6 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-200"
          >
            Generate Another Letter
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};