export interface KYCRequest {
  KYCID: string;
  UserID: string;
  DocumentType: string;
  DocumentNumber: string;
  VerificationStatus: string;
  SubmittedAt: string;
  VerifiedAt: string;
  VerifiedBy: string;
}
