import React from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import { Clock, FileText, Edit } from 'lucide-react';

interface LandingStepProps {
  onStart: () => void;
  loading: boolean;
}

export const LandingStep: React.FC<LandingStepProps> = ({ onStart, loading }) => {
  if (loading) {
    return <LoadingSpinner message="Starting workflow..." size="lg" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-gray-800">
            Offer Letter Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate professional, comprehensive offer letters in minutes with
            AI-powered analysis and formatting
          </p>
        </div>

        <button
          onClick={onStart}
          className="px-8 py-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-200 text-lg"
        >
          Start Drafting Proposal
        </button>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Fast Generation</h3>
            <p className="text-gray-600">
              Generate comprehensive proposals in just 3-4 minutes
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Format</h3>
            <p className="text-gray-600">
              AI-generated proposals with proper structure and formatting
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Edit className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Editable Results</h3>
            <p className="text-gray-600">
              Edit and customize your proposals before final export
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};