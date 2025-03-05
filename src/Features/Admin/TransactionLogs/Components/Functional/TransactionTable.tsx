import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from '@/services/apiService';
import { RootState } from '@/store';
import {Transaction} from "@/Features/PassBook/types/transaction.ts";
import TransactionTableView from "@/Features/Admin/TransactionLogs/Components/Presentational/TransactionTableView.tsx";

const PassBookPage: React.FC = () => {
  const [Transactions, setTransactions] = useState<Transaction[]>([]);
  const authToken = useSelector((state: RootState) => state.auth.authToken);
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (userEmail && authToken) {
          const outboundResponse = await get<Transaction[]>(
            `/api/transactions`,
            {},
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setTransactions(outboundResponse);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [userEmail, authToken]);

  return (
    <div>
      <TransactionTableView title="" transactions={Transactions} />
    </div>
  );
};

export default PassBookPage;
