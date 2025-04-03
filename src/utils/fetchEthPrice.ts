import {get} from "@/services/apiService.ts";
import {EthPrice} from "@/Features/Home/types/transactionStats.ts";

export const fetchEthPrice = async (): Promise<number> => {
    try {
        const response = await get<EthPrice>('/api/ethprice');
        return response.ethusd;
    } catch (error) {
        console.error('Error fetching transaction stats:', error);
        throw new Error('Error fetching transaction stats.');
    }
};
