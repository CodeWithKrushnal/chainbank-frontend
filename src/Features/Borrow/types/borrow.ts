// src/types/borrow.ts
export interface BorrowApplication {
  application_id: string;
  borrower_id: string;
  amount: number;
  interest_rate: number;
  term_months: number;
  status: string;
  created_at: string;
  updated_at: string;
}

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
