// src/components/LoanApplicationCardContainer.tsx (Functional Component)
import React, {useState} from 'react';
import {LoanApplication} from "@/Features/LoanApplications/types/loanApplication";
import {post} from '@/services/apiService';
import {toast} from 'sonner';
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import LoanApplicationsCardView
    from "@/Features/LoanApplications/components/Presentational/LoanApplicationsCardView.tsx";

interface LoanApplicationCardProps {
    loan: LoanApplication;
    onLoanUpdate: () => void;
}

const LoanApplicationCard: React.FC<LoanApplicationCardProps> = ({loan, onLoanUpdate}) => {
    const [formData, setFormData] = useState({
        amount: loan.amount,
        interest_rate: loan.interest_rate,
        duration: loan.term_months,
    });

    const authToken = useSelector((state: RootState) => state.auth.authToken);

    const handleMatchOffer = async () => {
        try {
            await post(`/api/loans/applications/${loan.application_id}/offers`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            toast.success('Offer matched successfully!');
            onLoanUpdate();
        } catch (error) {
            toast.error('Error matching offer.');
            console.error('Error matching offer:', error);
        }
    };

    const handleCounterOffer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await post(`/api/loans/applications/${loan.application_id}/offers`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            toast.success('Counter offer submitted successfully!');
            onLoanUpdate();
        } catch (error) {
            toast.error('Error submitting counter offer.');
            console.error('Error submitting counter offer:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <LoanApplicationsCardView
            loan={loan}
            formData={formData}
            handleChange={handleChange}
            handleMatchOffer={handleMatchOffer}
            handleCounterOffer={handleCounterOffer}
        />
    );
};

export default LoanApplicationCard;