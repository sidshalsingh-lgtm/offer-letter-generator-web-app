export interface CustomerData {
  effective_date: string;
  customer_name: string;
  customer_address: string;
  account_number: string;
  bvn_number: string;
}

export interface LoanData {
  loan_amount_text: string;
  loan_amount_numeric: string;
  loan_tenure: string;
  monthly_repayment: string;
  repayment_date: string;
  interest_rate: string;
}

export interface FeesData {
  management_fee: string;
  insurance_fee: string;
}

export interface BankData {
  bank_name: string;
  bank_code: string;
  branch_code: string;
  contact_email: string;
  contact_phone: string;
}

export interface VerificationData {
  verification_code: string;
  reference_number: string;
  processing_date: string;
  approval_officer: string;
}

export interface ExtractedData {
  customerData: CustomerData;
  loanData: LoanData;
  feesData: FeesData;
  bankData: BankData;
  verificationData: VerificationData;
}

export interface ApiResponse {
  resumeUrl?: string;
  html?: string;
  status?: string;
}

export type Step = 'landing' | 'upload' | 'details' | 'document' | 'confirmation';