import React, { useState } from 'react';
import { StepIndicator } from './components/StepIndicator';
import { LandingStep } from './components/steps/LandingStep';
import { UploadStep } from './components/steps/UploadStep';
import { DetailsStep } from './components/steps/DetailsStep';
import { DocumentStep } from './components/steps/DocumentStep';
import { ConfirmationStep } from './components/steps/ConfirmationStep';
import { useApi } from './hooks/useApi';
import { Step, ExtractedData } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');
  
  const { loading, error, startWorkflow, uploadAudio, generateOfferLetter, sendEmail } = useApi();

  const handleStart = async () => {
    const url = await startWorkflow();
    if (url) {
      setResumeUrl(url);
      setCurrentStep('upload');
    }
  };

  const handleUpload = async (file: File) => {
    if (!resumeUrl) return;
    
    const data = await uploadAudio(file, resumeUrl);
    if (data) {
      setExtractedData(data);
      setCurrentStep('details');
    }
  };

  const handleDetailsConfirm = async (data: ExtractedData) => {
    if (!resumeUrl) return;
    
    const html = await generateOfferLetter(data, resumeUrl);
    if (html) {
      setHtmlContent(html);
      setCurrentStep('document');
    }
  };

  const handleSendEmail = async () => {
    if (!resumeUrl) return;
    
    const success = await sendEmail(resumeUrl);
    if (success) {
      setCurrentStep('confirmation');
    }
  };

  const handleRestart = () => {
    setCurrentStep('landing');
    setResumeUrl(null);
    setExtractedData(null);
    setHtmlContent('');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingStep onStart={handleStart} loading={loading} />;
      case 'upload':
        return <UploadStep onUpload={handleUpload} loading={loading} />;
      case 'details':
        return extractedData ? (
          <DetailsStep 
            data={extractedData} 
            onContinue={handleDetailsConfirm}
            loading={loading}
          />
        ) : null;
      case 'document':
        return (
          <DocumentStep 
            htmlContent={htmlContent}
            onSendEmail={handleSendEmail}
            loading={loading}
          />
        );
      case 'confirmation':
        return <ConfirmationStep onRestart={handleRestart} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep !== 'landing' && (
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">OL</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Offer Letter Generator</h1>
            </div>
          </header>

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} />

          {/* Error Display */}
          {error && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-800">
                  <strong>Error:</strong> {error}
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main>
            {renderStep()}
          </main>

          {/* Footer */}
          <footer className="text-center mt-16 text-gray-500 text-sm">
            <p>&copy; 2025 Offer Letter Generator. Professional loan documentation made simple.</p>
          </footer>
        </div>
      )}
      
      {currentStep === 'landing' && renderStep()}
    </div>
  );
}

export default App;