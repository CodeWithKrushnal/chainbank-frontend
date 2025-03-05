// src/components/BorrowApplications.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {get} from '@/services/apiService';
import {RootState} from '@/store';
import BorrowApplicationCard from "@/Features/Borrow/Components/Presentational/BorrowApplicationCard.tsx";
import {BorrowApplication} from "@/Features/Borrow/types/borrow.ts";

interface BorrowApplicationsProps {
    onBorrowUpdate: () => void;
}

const BorrowApplications: React.FC<BorrowApplicationsProps> = ({onBorrowUpdate}) => {
    const [borrowApplications, setBorrowApplications] = useState<BorrowApplication[]>([]);
    const authToken = useSelector((state: RootState) => state.auth.authToken);
    const user = useSelector((state: RootState) => state.auth.user);

    const fetchBorrowApplications = useCallback(async () => {
        try {
            if (authToken && user) {
                const response = await get<BorrowApplication[]>(
                    `/api/loans/applications?user_id=${user.user_id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setBorrowApplications(response);
            }
        } catch (error) {
            console.error('Error fetching borrow applications:', error);
        }
    }, [authToken, user]);

    useEffect(() => {
        fetchBorrowApplications();
    }, [fetchBorrowApplications]);

    useEffect(() => {
        onBorrowUpdate();
    }, [borrowApplications]);

    return (
        <div className="grid gap-4">
                {borrowApplications.map((application) => (
                    <BorrowApplicationCard key={application.application_id} application={application}
                                           onBorrowUpdate={fetchBorrowApplications}/>
                ))}
        </div>
    );
};

export default BorrowApplications;
