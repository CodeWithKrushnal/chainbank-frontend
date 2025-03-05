// src/components/LoanApplicationForm.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { post } from '@/services/apiService';
import { RootState } from '@/store';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {AxiosError} from "axios";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {HandCoins} from "lucide-react";

interface LoanApplicationFormProps {
    onSuccess: () => void;
}

const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        amount: 1,
        interestRate: 10,
        termMonths: 10,
    });

    const authToken = useSelector((state: RootState) => state.auth.authToken);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: Number(value), // Convert the value to a number
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await post('/api/loans/apply', formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log(response);
            toast.success('Loan application submitted successfully!');
            onSuccess();
        } catch (error) {
            const fetchErr=error as AxiosError
            if (fetchErr.response && fetchErr.response.status === 403) {
                toast.error('User is not KYC verified.');
            } else {
                toast.error('Error submitting loan application.');
                console.error('Error submitting loan application:', error);
            }
        }
    };

    return (
        <Card className="p-6 shadow-none rounded-2xl hover:shadow-md transition-shadow duration-300 mb-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label className="mb-2">Amount:</Label>
                    <Input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <Label className="mb-2">Interest Rate:</Label>
                    <Input
                        type="number"
                        name="interestRate"
                        value={formData.interestRate}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <Label className="mb-2">Term (Months):</Label>
                    <Input
                        type="number"
                        name="termMonths"
                        value={formData.termMonths}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <Button type="submit">
                    <HandCoins size={"16px"}/>
                    Apply
                </Button>
            </form>
        </Card>
    );
};

export default LoanApplicationForm;
