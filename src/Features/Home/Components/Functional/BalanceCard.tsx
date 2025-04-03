import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "@/store";
import {useEffect} from "react";
import {fetchBalance} from "@/store/balanceSlice.ts";
import BalanceCardView from "@/Features/Home/Components/Presentational/BalanceCardView.tsx";


const BalanceCard = () => {

    const dispatch = useAppDispatch();
    const balance = useSelector((state: RootState) => state.balance.balance);
    const loading = useSelector((state: RootState) => state.balance.loading);
    const error = useSelector((state: RootState) => state.balance.error);

    useEffect(() => {
        dispatch(fetchBalance());
    }, [dispatch]);

    return (
        <BalanceCardView loading={loading} error={error} balance={balance}/>
    )
}

export default BalanceCard;