import {Card} from "@/components/ui/card.tsx";
import React from "react";
import TransferForm from "@/Features/Home/Components/Functional/TransferForm.tsx";
import {useAppDispatch} from "@/store";
import {fetchBalance} from "@/store/balanceSlice.ts";


const TransferCard: React.FC = () => {
    const dispatch = useAppDispatch();


    const handleTransferSuccess = () => {
        dispatch(fetchBalance());
    };

    return (
        <Card className="min-w-full p-4 flex flex-col gap-4 shadow-none">
            <h1 className="font-serif font-medium text-2xl text-center text-gray-800">
                Transfer Money
            </h1>
            <TransferForm onSuccess={handleTransferSuccess}/>
        </Card>
    )
}

export default TransferCard