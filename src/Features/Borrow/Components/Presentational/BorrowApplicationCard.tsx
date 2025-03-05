import React, {useEffect, useState} from 'react';
import {Card} from '@/components/ui/card';
import {get, put} from '@/services/apiService';
import {toast} from 'sonner';
import OfferCard from './OfferCard';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import {BorrowApplication, Offer} from "@/Features/Borrow/types/borrow.ts";

interface BorrowApplicationCardProps {
    application: BorrowApplication;
    onBorrowUpdate: () => void;
}

const BorrowApplicationCard: React.FC<BorrowApplicationCardProps> = ({application, onBorrowUpdate}) => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await get<Offer[]>(
                    `/api/loans/applications/${application.application_id}/offers`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setOffers(response || []); // Ensure offers is an array
            } catch (error) {
                console.error('Error fetching offers:', error);
            }
        };

        fetchOffers();
    }, [application.application_id, authToken]);

    const handleAcceptOffer = async (offerId: string) => {
        try {
            await put(`/api/loans/offers/${offerId}/accept`, {}, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            toast.success('Offer accepted successfully!');
            onBorrowUpdate();
        } catch (error) {
            toast.error('Error accepting offer.');
            console.error('Error accepting offer:', error);
        }
    };

    return (
        <Card className="p-4 shadow-none rounded-2xl hover:shadow-md transition-shadow duration-300">
      <span>
        <h2 className="text-2xl font-medium mb-4 inline-block">ETH: {application.amount}</h2>
        <span className="float-right"><p className="text-gray-500 text-sm">{application.application_id}</p></span>
      </span>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-gray-700"><strong>Amount:</strong> ${application.amount.toLocaleString()}</p>
                    <p className="text-gray-700"><strong>Interest Rate:</strong> {application.interest_rate}%</p>
                    <p className="text-gray-700"><strong>Term:</strong> {application.term_months} months</p>
                </div>
                <div>
                    <p className="text-gray-700"><strong>Status:</strong> {application.status}</p>
                    <p className="text-gray-500 text-sm"><strong>Created
                        At:</strong> {new Date(application.created_at).toLocaleString()}</p>
                    <p className="text-gray-500 text-sm"><strong>Updated
                        At:</strong> {new Date(application.updated_at).toLocaleString()}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                {offers && offers.length > 0 ? (
                    offers
                        .filter((offer) => offer.Status == "Open" && application.status=="open")
                        .map((offer) => (
                            <OfferCard
                                key={offer.OfferID}
                                offer={offer}
                                onAccept={() => handleAcceptOffer(offer.OfferID)}
                            />
                        ))
                ) : (
                    <p>No offers available.</p>
                )}
            </div>
        </Card>
    );
};

export default BorrowApplicationCard;
