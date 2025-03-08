import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {post} from '../../../../services/apiService.ts';
import {RootState} from '@/store';
import TransferFormView from "@/Features/Home/Components/Presentational/TransferFormView.tsx";
import {toast} from "sonner";
import {AxiosError} from "axios";

interface TransferFormProps {
    onSuccess: () => void;
}

const TransferForm: React.FC<TransferFormProps> = ({onSuccess}) => {
    const [formData, setFormData] = useState({
        recipient_email: '',
        amount: '',
        password: '',
        recepient_wallet_id: ''
    });

    const authToken = useSelector((state: RootState) => state.auth.authToken);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            toast.loading("Transfer in Progress")
            const res = await post(import.meta.env.VITE_TRANSFER_API, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            toast.dismiss()
            console.log(res)
            toast.success("Transfer successfully.", {description: "Transfer successfully."});
            onSuccess();
        } catch (error) {
            toast.dismiss()
            const axioserr=error as AxiosError;
            toast.error('Error making transfer',{description:axioserr.message});
        }
    };

    return (
        <TransferFormView
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
};

export default TransferForm;
