export interface Offer {
    OfferID: string;
    LenderID: string;
    Amount: number;
    InterestRate: number;
    LoanTermMonths: number;
    Status: string;
    CreatedAt: string;
    ApplicationID: string;
}

export interface SettlementInfo {
    loan_id: string;
    principal: number;
    interest: number;
    fees: number;
    penalties: number;
    total_payable: number;
}