import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import TransferFormView from '@/Features/Home/Components/Presentational/TransferFormView.tsx';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import {post} from "@/services/apiService.ts";

// Define the form schema using Zod
const formSchema = z.object({
    recipient_email: z.string().email({ message: 'Invalid email address.' }),
    amount: z.string().nonempty({ message: 'Amount is required.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
    recipient_wallet_id: z.string().optional(),
});

interface TransferFormProps {
    onSuccess: () => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ onSuccess }) => {
    const [transactionDetails, setTransactionDetails] = useState<any>(null);
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    // Initialize the form with useForm and zodResolver
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            recipient_email: '',
            amount: '',
            password: '',
            recipient_wallet_id: '',
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            toast.loading('Transfer in Progress');
            const res = await post(import.meta.env.VITE_TRANSFER_API, values, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            toast.dismiss();
            setTransactionDetails(res); // Store transaction details
            form.reset(); // Reset the form
            onSuccess();
        } catch (error) {
            toast.dismiss();
            const axioserr = error as AxiosError;
            toast.error('Error making transfer', { description: axioserr.message });
        }
    };

    return (
        <TransferFormView
            form={form}
            onSubmit={form.handleSubmit(handleSubmit)}
            transactionDetails={transactionDetails}
            setTransactionDetails={setTransactionDetails}
        />
    );
};

export default TransferForm;
