export interface LoanApplication {
    application_id: string;
    borrower_id: string;
    amount: number;
    interest_rate: number;
    term_months: number;
    status: string;
    created_at: string;
    updated_at: string;
}
