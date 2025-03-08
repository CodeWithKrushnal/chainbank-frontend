import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {post} from '@/services/apiService';
import {RootState} from '@/store';
import {toast} from 'sonner';
import {CountStat} from "@/Features/Admin/Dash/types/stats.ts";
import {DAUGraph} from "@/Features/Admin/Dash/Components/Presentational/DAUGraph.tsx";

export interface DayData {
    day: string;
    count: number;
}

const DAUGraphCard: React.FC = () => {
    const [chartData, setChartData] = useState<DayData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    const fetchDAUStats = useCallback(async () => {
        setIsLoading(true);

        try {
            // Create an array to store the last 5 days' data
            const last5DaysData: DayData[] = [];

            // Get today and the past 4 days
            for (let i = 4; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);

                // Create start and end time for the specific day
                const startDate = new Date(date);
                startDate.setHours(0, 0, 0, 0);

                const endDate = new Date(date);
                endDate.setHours(23, 59, 59, 999);

                // Format the day name (e.g., "Mon", "Tue")
                const dayName = date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });

                // Make API call for this specific day
                const response = await post<CountStat>(
                    '/api/requestlogstats',
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

                // Add the day's data to our array
                last5DaysData.push({
                    day: dayName,
                    count: typeof response.stat === 'number' ? response.stat : 0
                });
            }

            // Update the chart data
            setChartData(last5DaysData);

        } catch (error) {
            console.error('Error fetching DAU stats:', error);
            toast.error('Error fetching DAU stats.');
        } finally {
            setIsLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        fetchDAUStats();
    }, [fetchDAUStats]);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <DAUGraph data={chartData}/>
            )}
        </div>
    );
};

export default DAUGraphCard;