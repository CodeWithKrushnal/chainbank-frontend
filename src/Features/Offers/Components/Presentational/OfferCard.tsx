import React from 'react';
import {Card} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Offer} from "@/Features/Offers/types/offer.ts";
import {Banknote} from "lucide-react";

interface OfferCardProps {
    offer: Offer;
    onDisburse: (offerId: string) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({offer, onDisburse}) => {
    return (
        <Card className="p-4 shadow-none">
            <h3 className=" text-xl font-medium mb-2 text-gray-700">Offer ID: {offer.OfferID}</h3>
            <div className="grid grid-cols-3">

                <p className="text-gray-700"><strong>Amount:</strong> ${offer.Amount.toLocaleString()}</p>
                <p className="text-gray-700"><strong>Interest Rate:</strong> {offer.InterestRate}%</p>
                <p className="text-gray-700"><strong>Loan Term:</strong> {offer.LoanTermMonths} months</p>
                <p className="text-gray-700"><strong>Status:</strong> {offer.Status}</p>
                <p className="text-gray-500 text-sm"><strong>Created
                    At:</strong> {new Date(offer.CreatedAt).toLocaleString()}</p>
                {offer.Status === 'Accepted' && (
                    <Button onClick={() => onDisburse(offer.OfferID)} className="max-w-fit justify-self-end">
                        <Banknote size={16}/>
                        Disburse Loan
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default OfferCard;
