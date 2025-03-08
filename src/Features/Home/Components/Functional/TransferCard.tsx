import {Card} from "@/components/ui/card.tsx";
import React from "react";
import TransferForm from "@/Features/Home/Components/Functional/TransferForm.tsx";
import { useSelector} from "react-redux";
import {RootState, useAppDispatch} from "@/store";
import {fetchBalance} from "@/store/balanceSlice.ts";


const TransferCard: React.FC = () => {

    const authToken = useSelector((state: RootState) => state.auth.authToken);
    const dispatch = useAppDispatch();


    const handleTransferSuccess = () => {
        if (authToken) {
            dispatch(fetchBalance(authToken));
        }
    };

    return (
        <Card className="min-w-full p-4 flex flex-col gap-4 rounded-2xl rounded-2xl shadow-none">
            <h1 className="font-serif font-medium text-2xl text-center text-gray-800 mb-6">
                Transfer Money
            </h1>
            <TransferForm onSuccess={handleTransferSuccess} />
        </Card>
    )
}

export default TransferCard