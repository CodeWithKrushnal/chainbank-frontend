// src/components/TransactionTypes.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {post} from '@/services/apiService';
import {RootState} from '@/store';
import {toast} from 'sonner';
import {TransactionStats, TransactionType} from "@/Features/Admin/Dash/types/stats.ts";
import {TransactionTypesPie} from "@/Features/Admin/Dash/Components/Presentational/TransactionTypesPie.tsx";

const TransactionTypes: React.FC = () => {
    const [data, setData] = useState<TransactionType[]>([]);
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    const fetchTransactionTypes = useCallback(async () => {
        try {
            const response = await post<TransactionStats>(import.meta.env.VITE_ADMIN_STATS_TRANSACTION_TYPES_DISTRIBUTION,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setData(response.stat);
        } catch (error) {
            console.error('Error fetching transaction types stats:', error);
            toast.error('Error fetching transaction types stats.');
        }
    }, [authToken]);

    useEffect(() => {
        fetchTransactionTypes();
    }, [fetchTransactionTypes]);

    return (
        <div>
            {data.length > 0 ? <TransactionTypesPie data={data}/> : <p>Loading...</p>}
        </div>
    );
};

export default TransactionTypes;
