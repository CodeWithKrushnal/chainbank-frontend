import React, {useCallback, useEffect, useState} from 'react';

import {toast} from 'sonner';
import TotalFlowCardView from "@/Features/Home/Components/Presentational/TotalflowCardView.tsx";
import {fetchEthPrice} from "@/utils/fetchEthPrice.ts";
import {AxiosError} from "axios";

const TotalOutflowCard: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);

    const fetchPrice = useCallback(async () => {
        try {
            const price = await fetchEthPrice();
            setAmount(price);
        } catch (error) {
            const fetchErr = error as AxiosError;
            toast.error(fetchErr.message);
        }
    }, []);

    useEffect(() => {
        fetchPrice();
    }, [fetchPrice]);

    const currentTime = new Date().toLocaleString();
    return (
        <div>
            {amount !== null ? <TotalFlowCardView flow={"Current Price"} amount={Math.round(amount)} currentMonth={currentTime}
                                                  currency={"USD"}/> : <p>Loading...</p>}
        </div>
    );
};

export default TotalOutflowCard;
