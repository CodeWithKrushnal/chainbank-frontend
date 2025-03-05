import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toast } from 'sonner';
import {EthPrice} from "@/Features/Home/types/transactionStats.ts";
import TotalflowCardView from "@/Features/Home/Components/Presentational/TotalflowCardView.tsx";
import {get} from "@/services/apiService.ts";

const TotalOutflowCard: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const authToken = useSelector((state: RootState) => state.auth.authToken);
    const user = useSelector((state: RootState) => state.auth.user);

    const fetchCurrentPrice = useCallback(async () => {
        try {
            const response = await get<EthPrice>(
                '/api/ethprice', {},
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setAmount(Math.round(response.ethusd));
        } catch (error) {
            console.error('Error fetching transaction stats:', error);
            toast.error('Error fetching transaction stats.');
        }
    }, [authToken, user]);

    useEffect(() => {
        fetchCurrentPrice();
    }, [fetchCurrentPrice]);

    const currentTime = new Date().toLocaleString();
    return (
        <div>
            {amount !== null ? <TotalflowCardView flow={"Current Price"} amount={amount} currentMonth={currentTime} currency={"USD"} /> : <p>Loading...</p>}
        </div>
    );
};

export default TotalOutflowCard;
