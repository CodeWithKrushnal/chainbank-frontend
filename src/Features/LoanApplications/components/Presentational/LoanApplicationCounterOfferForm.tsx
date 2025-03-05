import React from 'react';
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

interface LoanApplicationCounterOfferFormProps {
    formData: {
        amount: number;
        interest_rate: number;
        duration: number;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCounterOffer: (e: React.FormEvent) => void;
}

const LoanApplicationCounterOfferForm: React.FC<LoanApplicationCounterOfferFormProps> = ({
                                                                                             formData,
                                                                                             handleChange,
                                                                                             handleCounterOffer,
                                                                                         }) => {
    return (
        <form onSubmit={handleCounterOffer}>
            <div>
                <Label className="mb-2">Amount:</Label>
                <Input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full mb-2"
                />
            </div>
            <div>
                <Label className="mb-2">Interest Rate:</Label>
                <Input
                    type="number"
                    name="interest_rate"
                    value={formData.interest_rate}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full mb-2"
                />
            </div>
            <div>
                <Label className="mb-2">Duration (months):</Label>
                <Input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full mb-4"
                />
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">Continue</AlertDialogAction>
            </AlertDialogFooter>
        </form>
    );
};

export default LoanApplicationCounterOfferForm;
