// src/components/APITraffic.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {post} from '@/services/apiService';
import {RootState} from '@/store';
import {toast} from 'sonner';
import {APIStats, EndpointUsage} from "@/Features/Admin/Dash/types/stats.ts";
import {APITrafficPie} from "@/Features/Admin/Dash/Components/Presentational/APITrafficPie.tsx";

const APITraffic: React.FC = () => {
    const [data, setData] = useState<EndpointUsage[]>([]);
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    const fetchAPITraffic = useCallback(async () => {
        try {
            const response = await post<APIStats>(import.meta.env.VITE_ADMIN_STATS_ENDPOINT_USAGE_API, {},
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            console.log(response.stat);
            setData(response.stat);
        } catch (error) {
            console.error('Error fetching API traffic stats:', error);
            toast.error('Error fetching API traffic stats.');
        }
    }, [authToken]);

    useEffect(() => {
        fetchAPITraffic();
    }, [fetchAPITraffic]);

    console.log("Data", data)

    return (
        <div>
            {data.length > 0 ? <APITrafficPie data={data}/> : <p>Loading...</p>}
        </div>
    );
};

export default APITraffic;
