export interface Loan {
  loan_id: string;
  offer_id: string;
  borrower_id: string;
  lender_id: string;
  total_principle: number;
  remaining_principle: number;
  status: string;
  start_date: string;
  next_payment_date: string;
  application_id: string;
  interest_rate: number;
  settled_amount: number;
  settlement_date: string;
  accrued_interest: number;
  disbursement_transaction_id: string;
  settlement_transaction_id: string;
}
