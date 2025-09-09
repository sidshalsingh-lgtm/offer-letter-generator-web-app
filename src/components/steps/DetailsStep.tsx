import React, { useState } from 'react';
import { Edit3, Save, X } from 'lucide-react';
import { ExtractedData } from '../../types';
import { LoadingSpinner } from '../LoadingSpinner';

interface DetailsStepProps {
  data: ExtractedData;
  onContinue: (updatedData: ExtractedData) => void;
  loading: boolean;
}

export const DetailsStep: React.FC<DetailsStepProps> = ({ data, onContinue, loading }) => {
  const [editedData, setEditedData] = useState<ExtractedData>(data);
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleEdit = (section: string, field: string) => {
    setEditingField(`${section}.${field}`);
  };

  const handleSave = () => {
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditedData(data);
    setEditingField(null);
  };

  const handleChange = (section: keyof ExtractedData, field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderField = (
    label: string,
    section: keyof ExtractedData,
    field: string,
    value: string
  ) => {
    const fieldKey = `${section}.${field}`;
    const isEditing = editingField === fieldKey;

    return (
      <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
        <div className="font-medium text-gray-700 w-1/3">{label}</div>
        <div className="flex-1 mx-4">
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(section, field, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <span className="text-gray-900">{value || 'Not specified'}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:text-green-700"
              >
                <Save size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <button
              onClick={() => handleEdit(section, field)}
              className="p-1 text-blue-600 hover:text-blue-700"
            >
              <Edit3 size={16} />
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderSection = (title: string, section: keyof ExtractedData, fields: Record<string, string>) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-1">
        {Object.entries(fields).map(([key, label]) =>
          renderField(label, section, key, (editedData[section] as any)[key])
        )}
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner message="Generating offer letter..." size="lg" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Review Extracted Details</h2>
        <p className="text-gray-600">
          Please review and edit the extracted information as needed
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderSection('Customer Information', 'customerData', {
          effective_date: 'Effective Date',
          customer_name: 'Customer Name',
          customer_address: 'Address',
          account_number: 'Account Number',
          bvn_number: 'BVN Number'
        })}

        {renderSection('Loan Details', 'loanData', {
          loan_amount_text: 'Loan Amount (Text)',
          loan_amount_numeric: 'Loan Amount (Numeric)',
          loan_tenure: 'Loan Tenure',
          monthly_repayment: 'Monthly Repayment',
          repayment_date: 'Repayment Date',
          interest_rate: 'Interest Rate'
        })}

        {renderSection('Fees Information', 'feesData', {
          management_fee: 'Management Fee',
          insurance_fee: 'Insurance Fee'
        })}

        {renderSection('Bank Details', 'bankData', {
          bank_name: 'Bank Name',
          bank_code: 'Bank Code',
          branch_code: 'Branch Code',
          contact_email: 'Contact Email',
          contact_phone: 'Contact Phone'
        })}

        <div className="md:col-span-2">
          {renderSection('Verification Data', 'verificationData', {
            verification_code: 'Verification Code',
            reference_number: 'Reference Number',
            processing_date: 'Processing Date',
            approval_officer: 'Approval Officer'
          })}
        </div>
        </div>

        <div className="text-center">
        <button
          onClick={() => onContinue(editedData)}
          className="px-8 py-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-200"
        >
          Generate Offer Letter
        </button>
        </div>
      </div>
    </div>
  );
};