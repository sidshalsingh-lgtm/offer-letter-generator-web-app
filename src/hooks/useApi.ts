import { useState } from 'react';
import { ExtractedData, ApiResponse } from '../types';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startWorkflow = async (): Promise<string | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5678/webhook-test/d83e7ce8-6a06-402d-9532-bd1e8dd83f22', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'start' }),
      });

      if (!response.ok) {
        throw new Error('Failed to start workflow');
      }

      const data: ApiResponse = await response.json();
      return data.resumeUrl || null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const uploadAudio = async (audioFile: File, resumeUrl: string): Promise<ExtractedData | null> => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('audio', audioFile);

      const response = await fetch(resumeUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload audio file');
      }

      const data = await response.json();
      return data as ExtractedData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateOfferLetter = async (data: ExtractedData, resumeUrl: string): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(resumeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate offer letter');
      }

      const result = await response.json();
      return result.html || null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async (resumeUrl: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(resumeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_response: 'Approve' }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const result = await response.json();
      return result.status === 'Email Sent';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    startWorkflow,
    uploadAudio,
    generateOfferLetter,
    sendEmail,
  };
};