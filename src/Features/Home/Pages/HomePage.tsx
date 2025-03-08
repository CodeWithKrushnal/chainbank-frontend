// src/pages/HomePage.tsx
import BalanceCard from "@/Features/Home/Components/Functional/BalanceCard.tsx";
import React from "react";
import TotalInflowCard from "@/Features/Home/Components/Functional/TotalInflowCard.tsx";
import TotalOutFlowCard from "@/Features/Home/Components/Functional/TotalOutFlowCard.tsx";
import CurrentPriceCard from "@/Features/Home/Components/Functional/CurrentPriceCard.tsx";
import {User} from "@/types/types.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import ReceivePaymentCard from "@/Features/Home/Components/Functional/ReceivePaymentCard.tsx";
import TransferCard from "@/Features/Home/Components/Functional/TransferCard.tsx";

const HomePage: React.FC = () => {

    const user: User | null = useSelector((state: RootState): User | null => state.auth.user);

    return (
        <div className="p-4 gap-4 min-w-full">
            <div>
                <h1 className="font-serif text-4xl text-gray-700">Hello {user?.full_name}, Good Day !</h1>
            </div>
            <div>
            <div className="grid grid-cols-4 gap-4">
                <div className="py-4">
                    <BalanceCard/>
                </div>
                <div className="py-4">
                    <TotalInflowCard/>
                </div>
                <div className="py-4">
                    <TotalOutFlowCard/>
                </div>
                <div className="py-4">
                    <CurrentPriceCard/>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <TransferCard/>
                </div>
                <div>
                    <ReceivePaymentCard/>
                </div>
            </div>
            </div>
        </div>
    );
};

export default HomePage;
