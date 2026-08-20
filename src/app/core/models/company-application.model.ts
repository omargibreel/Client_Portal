export interface CompanyApplication {
  companyName: string;
  companyType: 'construction' | 'consultancy' | 'infrastructure' | 'fitout' | 'other' | string;
  companySize: 'tier1' | 'tier2' | 'tier3' | 'tier4' | string;
  country: string;
  fullName: string;
  jobTitle?: string;
  email: string;
  phone: string;
  taxNumber: string;
  activeProjects?: number;
  managementGoals: string[];
  additionalMessage?: string;
  consent: boolean;
  submittedAt?: string;
}

export interface ApplicationSubmissionResponse {
  success: boolean;
  applicationId?: string;
  message: string;
  timestamp: string;
}
