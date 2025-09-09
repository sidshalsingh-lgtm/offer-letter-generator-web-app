import React from 'react';
import { Check, CheckCircle } from 'lucide-react';
import { Step } from '../types';

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = [
  { key: 'upload', title: 'Start', description: 'Upload Audio' },
  { key: 'details', title: 'Details', description: 'Review Information' },
  { key: 'document', title: 'Processing', description: 'Generate Letter' },
  { key: 'confirmation', title: 'Results', description: 'Send Email' },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  // Don't show stepper on landing page
  if (currentStep === 'landing') {
    return null;
  }

  const getCurrentStepIndex = () => steps.findIndex(step => step.key === currentStep);
  const currentIndex = getCurrentStepIndex();

  return (
    <div className="w-full py-12">
      <div className="flex items-center justify-center max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    isCompleted
                      ? 'bg-blue-600 text-white'
                      : isCurrent
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle size={16} /> : index + 1}
                </div>
                <div className="mt-2 text-center">
                  <div
                    className={`text-xs font-medium ${
                      isCompleted || isCurrent ? 'text-gray-700' : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 transition-all duration-200 ${
                    index < currentIndex
                      ? 'bg-blue-600'
                      : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};