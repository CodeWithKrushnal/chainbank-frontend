import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import {Transaction} from "@/Features/PassBook/types/transaction.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

interface TransactionTableProps {
    title: string;
    transactions: Transaction[];
}

const TransactionTableView: React.FC<TransactionTableProps> = ({title, transactions}) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-medium mb-2">{title}</h2>
                <ScrollArea className="h-[870px] rounded-2xl shadow-none border">
                    <Table className="min-w-full bg-white rounded-2xl">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="py-2 px-4 border-b">Transaction ID</TableHead>
                                <TableHead className="py-2 px-4 border-b">Wallet ID</TableHead>
                                <TableHead className="py-2 px-4 border-b">Amount</TableHead>
                                <TableHead className="py-2 px-4 border-b">Type</TableHead>
                                <TableHead className="py-2 px-4 border-b">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((tx) => (
                                <TableRow key={tx.transaction_id}>
                                    <TableCell className="py-2 px-4 border-b">{tx.transaction_id}</TableCell>
                                    <TableCell className="py-2 px-4 border-b">
                                        {title === 'Outbound Transfers' ? tx.receiver_wallet_id : tx.sender_wallet_id}
                                    </TableCell>
                                    <TableCell className="py-2 px-4 border-b">{tx.amount}</TableCell>
                                    <TableCell className="py-2 px-4 border-b">
                                        <Badge variant="secondary">{tx.transaction_type}</Badge>
                                    </TableCell>
                                    <TableCell className="py-2 px-4 border-b">
                                        <Badge variant="secondary">{tx.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
        </div>
    );
};

export default TransactionTableView;
