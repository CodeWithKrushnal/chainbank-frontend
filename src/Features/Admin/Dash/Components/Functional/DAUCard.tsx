// src/components/DAUCard.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {post} from '@/services/apiService';
import {RootState} from '@/store';
import {toast} from 'sonner';
import {CountStat} from "@/Features/Admin/Dash/types/stats.ts";
import StatCard from "@/Features/Admin/Dash/Components/Presentational/StatCard.tsx";

const DAUCard: React.FC = () => {
    const [dauCount, setDauCount] = useState<number | string | null>(null);
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    const fetchDAUStats = useCallback(async () => {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        try {
            const response = await post<CountStat>(
                import.meta.env.VITE_ADMIN_API_REQUEST_LOG_STATS_API,
                {
                    from_time: startDate.toISOString(),
                    to_time: endDate.toISOString(),
                    column: 'user_id',
                    unique: true,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setDauCount(response.stat);
        } catch (error) {
            console.error('Error fetching DAU stats:', error);
            toast.error('Error fetching DAU stats.');
        }
    }, [authToken]);

    useEffect(() => {
        fetchDAUStats();
    }, [fetchDAUStats]);

    const currentDate = new Date().toLocaleDateString();

    return (
        <div>
            {dauCount !== null ?
                <StatCard heading={"Daily Active Users"} statcount={dauCount} badgeContent={currentDate}/> :
                <p>Loading...</p>}
        </div>
    );
};

export default DAUCard;
