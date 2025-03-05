export interface KYC {
    "KYCID": string,
    "UserID": string,
    "DocumentType": string,
    "DocumentNumber": string,
    "VerificationStatus": "Verified" | "Pending",
    "SubmittedAt": string,
    "VerifiedAt": string,
    "VerifiedBy": string
}

export interface KYCRequest {
    document_type: string;
    document_number: string;
}

export interface KYCResponse {
    kyc_id: string;
}
