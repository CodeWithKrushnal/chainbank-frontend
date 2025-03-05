// src/components/RequestLogs.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { post } from '@/services/apiService';
import { RootState } from '@/store';
import { toast } from 'sonner';
import RequestLogsTable from "@/Features/Admin/Logs/Components/Presentational/RequestLogsTable.tsx";
import {RequestLog} from "@/Features/Admin/Logs/types/requestLog.ts";

const RequestLogs: React.FC = () => {
  const [logs, setLogs] = useState<RequestLog[]>([]);
  const authToken = useSelector((state: RootState) => state.auth.authToken);

  const fetchRequestLogs = useCallback(async () => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1); // Set to one month prior
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1); // Set to tomorrow
    endDate.setHours(23, 59, 59, 999);

    try {
      const response = await post<RequestLog[]>(
          '/api/requestlogs',
          {
            from_time: startDate.toISOString(),
            to_time: endDate.toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
      );
      setLogs(response);
    } catch (error) {
      console.error('Error fetching request logs:', error);
      toast.error('Error fetching request logs.');
    }
  }, [authToken]);

  useEffect(() => {
    fetchRequestLogs();
  }, [fetchRequestLogs]);

  return (
      <div>
        {logs.length > 0 ? (
            <RequestLogsTable logs={logs} />
        ) : (
            <p>No request logs found.</p>
        )}
      </div>
  );
};

export default RequestLogs;
