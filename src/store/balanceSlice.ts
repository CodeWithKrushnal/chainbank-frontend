// src/store/balanceSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {get} from '@/services/apiService';
import {AppDispatch} from '@/store'; // Import AppDispatch type


interface BalanceState {
    balance: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: BalanceState = {
    balance: null,
    loading: false,
    error: null,
};

const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setBalance(state, action: PayloadAction<string>) {
            state.balance = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const {setBalance, setLoading, setError} = balanceSlice.actions;

export default balanceSlice.reducer;

export const fetchBalance = (authToken: string) => async (dispatch:AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await get<{ wallet_id: string; balance: string }>('api/balance', {}, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        dispatch(setBalance(response.balance));
    } catch (error) {
        console.error('Error fetching balance:', error);
        dispatch(setError('Error fetching balance'));
    } finally {
        dispatch(setLoading(false));
    }
};
