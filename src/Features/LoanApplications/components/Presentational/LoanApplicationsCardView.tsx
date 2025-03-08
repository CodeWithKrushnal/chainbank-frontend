// src/components/LoanApplicationCard.tsx (Presentational Component)
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoanApplication } from "@/Features/LoanApplications/types/loanApplication";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LoanApplicationCounterOfferForm
    from "@/Features/LoanApplications/components/Presentational/LoanApplicationCounterOfferForm.tsx";

interface LoanApplicationCardViewProps {
    loan: LoanApplication;
    formData: {
        amount: number;
        interest_rate: number;
        duration: number;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleMatchOffer: () => void;
    handleCounterOffer: (e: React.FormEvent) => void;
}

const LoanApplicationCardView: React.FC<LoanApplicationCardViewProps> = ({
                                                                     loan,
                                                                     formData,
                                                                     handleChange,
                                                                     handleMatchOffer,
                                                                     handleCounterOffer,
                                                                 }) => {
    return (
        <Card className="p-6 shadow-none rounded-2xl hover:shadow-md transition-shadow duration-300">
            <span>
                <h2 className="text-2xl font-medium mb-4 inline-block">ETH: {loan.amount}</h2>
                <span className="float-right"><p className="text-gray-500 text-sm">{loan.application_id}</p></span>
            </span>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <p className="text-gray-700"><strong>Amount:</strong> ${loan.amount.toLocaleString()}</p>
                    <p className="text-gray-700"><strong>Interest Rate:</strong> {loan.interest_rate}%</p>
                    <p className="text-gray-700"><strong>Term:</strong> {loan.term_months} months</p>
                </div>
                <div>
                    <p className="text-gray-700"><strong>Status:</strong> {loan.status}</p>
                    <p className="text-gray-500 text-sm"><strong>Created At:</strong> {new Date(loan.created_at).toLocaleString()}</p>
                    <p className="text-gray-500 text-sm"><strong>Updated At:</strong> {new Date(loan.updated_at).toLocaleString()}</p>
                </div>
                <div>
                    <Button variant="outline" className="mb-2 float-right" onClick={handleMatchOffer}>
                        Match Offer
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger className="float-right">
                            <Button variant="outline" className="mb-2 float-right">
                                Counter Offer
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Create a Counter Offer</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Bargain at your will!
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <LoanApplicationCounterOfferForm handleCounterOffer={handleCounterOffer} formData={formData} handleChange={handleChange} key={loan.application_id}/>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </Card>
    );
};

export default LoanApplicationCardView;