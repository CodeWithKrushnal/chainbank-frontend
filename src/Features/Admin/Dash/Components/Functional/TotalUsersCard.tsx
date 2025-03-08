import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { post } from '@/services/apiService';
import { RootState } from '@/store';
import { toast } from 'sonner';
import StatCard from "@/Features/Admin/Dash/Components/Presentational/StatCard.tsx";
import { Stats } from "@/Features/Admin/Dash/types/stats.ts";

const TotalUsersCard: React.FC = () => {
    const [statCount, setStatCount] = useState<number | null>(null);
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    const fetchStats = useCallback(async () => {
        try {
            const response = await post<Stats>(import.meta.env.VITE_ADMIN_STATS_TOTAL_USERS_API,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            // Extract the count from the response
            if (response.stat && response.stat.length > 0) {
                setStatCount(response.stat[0].count);
            } else {
                setStatCount(0); // Handle case where the response is empty
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
            toast.error('Error fetching stats.');
        }
    }, [authToken]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const badgeContent = 'Total Users';

    return (
        <div>
            {statCount !== null ? (
                <StatCard heading="Platform Total Users" statcount={statCount} badgeContent={badgeContent} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TotalUsersCard;
