import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {get} from '@/services/apiService';
import {RootState} from '@/store';
import {Transaction} from "@/Features/PassBook/types/transaction.ts";
import TransactionTableView from "@/Features/PassBook/Components/Presentational/TransactionTableView.tsx";

const PassBookPage: React.FC = () => {
    const [outboundTransactions, setOutboundTransactions] = useState<Transaction[]>([]);
    const [inboundTransactions, setInboundTransactions] = useState<Transaction[]>([]);
    const userEmail = useSelector((state: RootState) => state.auth.user?.email);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                if (userEmail) {
                    const outboundResponse = await get<Transaction[]>(
                        `/api/transactions?senderEmail=${userEmail}`
                    );
                    setOutboundTransactions(outboundResponse);

                    const inboundResponse = await get<Transaction[]>(
                        `/api/transactions?receiverEmail=${userEmail}`
                    );
                    setInboundTransactions(inboundResponse);
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [userEmail]);

    return (
        <div>
            <TransactionTableView title="Outbound Transfers" transactions={outboundTransactions}/>
            <TransactionTableView title="Inbound Transfers" transactions={inboundTransactions}/>
        </div>
    );
};

export default PassBookPage;
