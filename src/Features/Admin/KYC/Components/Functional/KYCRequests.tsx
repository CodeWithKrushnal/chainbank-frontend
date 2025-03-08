import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {get, post} from '@/services/apiService';
import {RootState} from '@/store';
import {toast} from 'sonner';
import KYCRequestCard from "@/Features/Admin/KYC/Components/Presentational/KYCRequestCard.tsx";
import {KYCRequest} from "@/Features/Admin/KYC/types/kycRequest.ts";
import {AxiosError} from "axios";

const KYCRequests: React.FC = () => {
    const [kycRequests, setKYCRequests] = useState<KYCRequest[]>([]);
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    const fetchKYCRequests = useCallback(async () => {
        try {
            const response = await get<KYCRequest[]>(
                '/api/kycrequests',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setKYCRequests(response);
        } catch (error) {
            const fetchErr = error as AxiosError
            if (fetchErr.response && fetchErr.response.status === 200) {
                toast.info('No new KYC requests found.');
            } else {
                console.error('Error fetching KYC requests:', error);
            }
        }
    }, [authToken]);

    useEffect(() => {
        fetchKYCRequests();
    }, [fetchKYCRequests]);

    const handleApproveKYC = async (kycId: string) => {
        try {
            await post('/api/kycaction', {kyc_id: kycId, verification_status: '1'}, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            toast.success('KYC status updated successfully!');
            fetchKYCRequests();
        } catch (error) {
            console.error('Error updating KYC status:', error);
            toast.error('Error updating KYC status.');
        }
    };

    return (
        <div className="grid gap-4">
            {typeof (kycRequests) !== "string" && kycRequests.length > 0 ? (
                kycRequests.map((kycRequest) => (
                    <KYCRequestCard key={kycRequest.KYCID} kycRequest={kycRequest} onApprove={handleApproveKYC}/>
                ))
            ) : (<em>
                    <p className="font-serif pt-4">No new KYC requests found.</p></em>
            )}
        </div>
    );
};

export default KYCRequests;
