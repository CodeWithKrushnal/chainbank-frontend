import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from '@/services/apiService';
import { RootState } from '@/store';
import {Transaction} from "@/Features/PassBook/types/transaction.ts";
import TransactionTableView from "@/Features/PassBook/Components/Presentational/TransactionTableView.tsx";

const PassBookPage: React.FC = () => {
  const [outboundTransactions, setOutboundTransactions] = useState<Transaction[]>([]);
  const [inboundTransactions, setInboundTransactions] = useState<Transaction[]>([]);
  const authToken = useSelector((state: RootState) => state.auth.authToken);
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (userEmail && authToken) {
          const outboundResponse = await get<Transaction[]>(
            `/api/transactions?senderEmail=${userEmail}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setOutboundTransactions(outboundResponse);

          const inboundResponse = await get<Transaction[]>(
            `/api/transactions?receiverEmail=${userEmail}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setInboundTransactions(inboundResponse);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [userEmail, authToken]);

  return (
    <div>
      <TransactionTableView title="Outbound Transfers" transactions={outboundTransactions} />
      <TransactionTableView title="Inbound Transfers" transactions={inboundTransactions} />
    </div>
  );
};

export default PassBookPage;
