// src/pages/PassBookPage.tsx
import React from 'react';
import TransactionTable from "@/Features/PassBook/Components/Functional/TransactionTable.tsx";


const PassBookPage: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="font-serif text-4xl mb-4 text-gray-700">Transaction History</h1>
            <TransactionTable/>
        </div>
    )
};

export default PassBookPage;
