// src/components/TotalInflowCard.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { post } from '@/services/apiService';
import { RootState } from '@/store';
import { toast } from 'sonner';
import {TransactionStats} from "@/Features/Home/types/transactionStats.ts";
import TotalflowCardView from "@/Features/Home/Components/Presentational/TotalflowCardView.tsx";

const TotalInflowCard: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const authToken = useSelector((state: RootState) => state.auth.authToken);
    const user = useSelector((state: RootState) => state.auth.user);

    const fetchTransactionStats = useCallback(async () => {
        const startDate = new Date();
        startDate.setDate(1); // Set to the first day of the current month
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0); // Set to the last day of the current month
        endDate.setHours(23, 59, 59, 999);

        try {
            const response = await post<TransactionStats>(
                '/api/transactionstats',
                {
                    column: 'amount',
                    sum: true,
                    from_time: startDate.toISOString(),
                    to_time: endDate.toISOString(),
                    wallet_type: 'receiver',
                    wallet_id: user?.wallet_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setAmount(response.amount!=null?response.amount:0);
        } catch (error) {
            console.error('Error fetching transaction stats:', error);
            toast.error('Error fetching transaction stats.');
        }
    }, [authToken, user]);

    useEffect(() => {
        fetchTransactionStats();
    }, [fetchTransactionStats]);

    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div>
            {amount !== null ? <TotalflowCardView flow={"Monthly Inflow"} amount={amount} currentMonth={currentMonth} currency={"ETH"}/> : <p>Loading...</p>}
        </div>
    );
};

export default TotalInflowCard;
