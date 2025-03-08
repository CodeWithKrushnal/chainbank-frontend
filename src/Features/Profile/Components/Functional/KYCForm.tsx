// src/components/KYCForm.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { post } from '@/services/apiService';
import { RootState } from '@/store';
import { toast } from 'sonner';
import {KYCRequest, KYCResponse} from "@/Features/Profile/Types/KYC.ts";
import KYCFormView from "@/Features/Profile/Components/Presentational/KYCFormView.tsx";

interface KYCFormProps {
    onSuccess: () => void;
}

const KYCForm: React.FC<KYCFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<KYCRequest>({
        document_type: '',
        document_number: '',
    });

    const authToken = useSelector((state: RootState) => state.auth.authToken);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await post<KYCResponse>('/api/requestkyc', formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            toast.success('KYC application submitted successfully!');
            console.log('KYC ID:', response.kyc_id);
            onSuccess();
        } catch (error) {
            toast.error('Error submitting KYC application.');
            console.error('Error submitting KYC application:', error);
        }
    };

    return <KYCFormView formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />;
};

export default KYCForm;
