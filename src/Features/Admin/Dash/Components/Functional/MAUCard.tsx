// src/components/MAUCard.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {post} from '@/services/apiService.ts';
import {RootState} from '@/store';
import {toast} from 'sonner';
import {CountStat} from "@/Features/Admin/Dash/types/stats.ts";
import StatCard from "@/Features/Admin/Dash/Components/Presentational/StatCard.tsx";

const MAUCard: React.FC = () => {
    const [mauCount, setMauCount] = useState<number | string | null>(null);
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    const fetchMAUStats = useCallback(async () => {
        const startDate = new Date();
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);
        endDate.setHours(23, 59, 59, 999);

        try {
            const response = await post<CountStat>(import.meta.env.VITE_ADMIN_API_REQUEST_LOG_STATS_API,
                {
                    from_time: startDate.toISOString(),
                    to_time: endDate.toISOString(),
                    column: 'user_id',
                    count: false,
                    avg: false,
                    unique: true,
                    min: false,
                    max: false,
                    sum: false,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setMauCount(response.stat);
        } catch (error) {
            console.error('Error fetching MAU stats:', error);
            toast.error('Error fetching MAU stats.');
        }
    }, [authToken]);

    useEffect(() => {
        fetchMAUStats();
    }, [fetchMAUStats]);

    const currentMonth = new Date().toLocaleString('default', {month: 'long', year: 'numeric'});

    return (
        <div>
            {mauCount !== null ?
                <StatCard heading={"Monthly Active Users"} statcount={mauCount} badgeContent={currentMonth}/> :
                <p>Loading...</p>}
        </div>
    );
};

export default MAUCard;
