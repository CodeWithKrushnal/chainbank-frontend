import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { get } from '@/services/apiService';
import { RootState } from '@/store';
import {LoanApplication} from "@/Features/LoanApplications/types/loanApplication.ts";
import LoanApplicationCard from "@/Features/LoanApplications/components/Presentational/LoanApplicationCard.tsx";

const LoanApplications: React.FC = () => {
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>([]);
  const authToken = useSelector((state: RootState) => state.auth.authToken);

  const fetchLoanApplications = useCallback(async () => {
    try {
      if (authToken) {
        const response = await get<LoanApplication[]>(
            '/api/loans/applications?status=open',
            {},
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
        );
        setLoanApplications(response);
      }
    } catch (error) {
      console.error('Error fetching loan applications:', error);
    }
  }, [authToken]);

  useEffect(() => {
    fetchLoanApplications();
  }, [fetchLoanApplications]);

  return (
      <div >
        <h1 className="font-serif text-xl mb-4 text-gray-500">Open Loan Applications</h1>
        <div className="grid grid-cols-2 gap-4">
          {loanApplications.map((loan) => (
              <LoanApplicationCard key={loan.application_id} loan={loan} onLoanUpdate={fetchLoanApplications} />
          ))}
        </div>
      </div>
  );
};

export default LoanApplications;
