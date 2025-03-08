import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {get, post} from '@/services/apiService';
import {RootState} from '@/store';
import {toast} from 'sonner';
import {AxiosError} from "axios";
import OfferCard from "@/Features/Offers/Components/Presentational/OfferCard.tsx";
import {Offer} from "@/Features/Offers/types/offer.ts";

const MyOffers: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const authToken = useSelector((state: RootState) => state.auth.authToken);
    const user = useSelector((state: RootState) => state.auth.user);

    const fetchOffers = useCallback(async () => {
        try {
            if (authToken && user) {
                const response = await get<Offer[]>(
                    `/api/loans/offers?user_id=${user.user_id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setOffers(response);
            }
        } catch (error) {
            const fetchErr = error as AxiosError;
            if (fetchErr.response && fetchErr.response.status === 404) {
                toast.info('No loan offers found.');
            } else {
                console.error('Error fetching offers:', error);
            }
        }
    }, [authToken, user]);

    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);

    const handleDisburseLoan = async (offerId: string) => {
        try {
            await post(`/api/loans/disburse/${offerId}`, {}, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            toast.success('Loan disbursed successfully!');
            fetchOffers();
        } catch (error) {
            toast.error('Error disbursing loan.');
            console.error('Error disbursing loan:', error);
        }
    };

    return (
        <div className="grid gap-4">
            {offers.length > 0 ? (
                offers.map((offer) => (
                    <OfferCard
                        key={offer.OfferID}
                        offer={offer}
                        onDisburse={handleDisburseLoan}
                    />
                ))
            ) : (
                <p>No offers available.</p>
            )}
        </div>
    );
};

export default MyOffers;
