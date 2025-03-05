import React, { useState, useEffect } from 'react';
import LoanCardView from '../Presentational/LoanCardView.tsx';
import { Loan } from "@/Features/MyLoans/types/loan.ts";
import { get, post } from '@/services/apiService.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toast } from 'sonner';
import { SettlementInfo } from "@/Features/Offers/types/offer.ts";

interface LoanCardContainerProps {
  loan: Loan;
  onLoanUpdate: () => void;
}

const LoanCardContainer: React.FC<LoanCardContainerProps> = ({ loan, onLoanUpdate }) => {
  const [settlementInfo, setSettlementInfo] = useState<SettlementInfo | null>(null);
  const [isLoadingSettlement, setIsLoadingSettlement] = useState(false);
  const authToken = useSelector((state: RootState) => state.auth.authToken);

  const fetchSettlementInfo = async () => {
    setIsLoadingSettlement(true);
    try {
      const response = await get<SettlementInfo>(`/api/loans/${loan.loan_id}/settle`, {}, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setSettlementInfo(response);
    } catch (error) {
      console.error('Error fetching settlement information:', error);
      toast.error('Error fetching settlement information.');
      setSettlementInfo(null); // Set to null in case of error
    } finally {
      setIsLoadingSettlement(false);
    }
  };

  const handleSettleLoan = async () => {
    try {
      await post(`/api/loans/${loan.loan_id}/settle`, {}, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      toast.success('Loan settled successfully!');
      onLoanUpdate();
    } catch (error) {
      console.error('Error settling loan:', error);
      toast.error('Error settling loan.');
    }
  };

  useEffect(() => {
    if (loan.status !== 'closed') {
      fetchSettlementInfo();
    }
  }, [loan.status, authToken]);

  return (
      <LoanCardView
          loan={loan}
          settlementInfo={settlementInfo}
          handleSettleLoan={handleSettleLoan}
          isLoadingSettlement={isLoadingSettlement}
      />
  );
};

export default LoanCardContainer;