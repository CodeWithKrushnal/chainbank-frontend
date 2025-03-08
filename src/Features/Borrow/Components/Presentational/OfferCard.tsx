import React from 'react';
import {Card} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Offer} from "@/Features/Borrow/types/borrow.ts";
import {HeartHandshake} from "lucide-react";

interface OfferCardProps {
    offer: Offer;
    onAccept: () => void;
}

const OfferCard: React.FC<OfferCardProps> = ({offer, onAccept}) => {
    return (
        <Card className="p-4 grid grid-cols-3">
            <div>
                <h3 className="text-xl font-medium mb-2">ETH: {offer.Amount.toLocaleString()}</h3>
                <p className="text-gray-700"><strong>Amount:</strong> ${offer.Amount.toLocaleString()}</p>
                <p className="text-gray-700"><strong>Interest Rate:</strong> {offer.InterestRate}%</p>
            </div>
            <div>
                <p className="text-gray-700"><strong>Loan Term:</strong> {offer.LoanTermMonths} months</p>
                <p className="text-gray-700"><strong>Status:</strong> {offer.Status}</p>
                <p className="text-gray-500 text-sm"><strong>Created
                    At:</strong> {new Date(offer.CreatedAt).toLocaleString()}</p>
            </div>
            <div className="flex flex-col items-end">
                <p className="text-gray-500 text-xs mb-2">
                    {offer.OfferID}
                </p>
                <Button onClick={onAccept} className="mt-2 max-w-fit"><HeartHandshake size={"16px"}/>Accept
                    Offer
                </Button>
            </div>
        </Card>
    );
};

export default OfferCard;
