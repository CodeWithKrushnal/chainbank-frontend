// src/components/MyLoans.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {get} from '@/services/apiService';
import {RootState} from '@/store';
import {toast} from 'sonner';
import LoanCard from "@/Features/MyLoans/Components/Functional/LoanCard.tsx";
import {Loan} from "@/Features/MyLoans/types/loan.ts";
import {AxiosError} from "axios";

const MyLoans: React.FC = () => {
    const [loans, setLoans] = useState<Loan[]>([]);
    const authToken = useSelector((state: RootState) => state.auth.authToken);
    const user = useSelector((state: RootState) => state.auth.user);

    const fetchLoans = useCallback(async () => {
        try {
            if (authToken && user) {
                const response = await get<Loan[]>(
                    `/api/loans?borrower_id=${user.user_id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setLoans(response);
            }
        } catch (error) {
            const fetchErr = error as AxiosError
            if (fetchErr.response && fetchErr.response.status === 404) {
                toast.info('No loans found.');
            } else {
                console.error('Error fetching loans:', error);
            }
        }
    }, [authToken, user]);

    useEffect(() => {
        fetchLoans();
    }, [fetchLoans]);

    return (
        <div className="grid gap-4">
            {loans.length > 0 ? (
                loans.map((loan) => <LoanCard key={loan.loan_id} loan={loan} onLoanUpdate={fetchLoans}/>)
            ) : (
                <p>No loans available.</p>
            )}
        </div>
    );
};

export default MyLoans;
