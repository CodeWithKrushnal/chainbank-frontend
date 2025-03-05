// src/components/RequestLogsTable.tsx
import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {RequestLog} from "@/Features/Admin/Logs/types/requestLog.ts";
import {Badge} from "@/components/ui/badge.tsx";

interface RequestLogsTableProps {
    logs: RequestLog[];
}

const RequestLogsTable: React.FC<RequestLogsTableProps> = ({logs}) => {
    return (
        <Table className="min-w-full bg-white rounded-2xl">
            <TableHeader>
                <TableRow>
                    <TableHead className="py-2 px-4 border-b mt-2">Request ID</TableHead>
                    <TableHead className="py-2 px-4 border-b mt-2">User ID</TableHead>
                    <TableHead className="py-2 px-4 border-b mt-2">Endpoint</TableHead>
                    <TableHead className="py-2 px-4 border-b mt-2">HTTP Method</TableHead>
                    <TableHead className="py-2 px-4 border-b mt-2">Response Status</TableHead>
                    <TableHead className="py-2 px-4 border-b mt-2">Response Time (ms)</TableHead>
                    <TableHead className="py-2 px-4 border-b mt-2">IP Address</TableHead>
                    <TableHead className="py-2 px-4 border-b mt-2">Created At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {logs.map((log) => (
                    <TableRow key={log.RequestID}>
                        <TableCell className="py-2 px-4 border-b">{log.RequestID}</TableCell>
                        <TableCell className="py-2 px-4 border-b">{log.UserID}</TableCell>
                        <TableCell className="py-2 px-4 border-b">{log.Endpoint}</TableCell>
                        <TableCell className="py-2 px-4 border-b"><Badge
                            className={log.HTTPMethod == "POST" ? "bg-[#fefbea] border-[#ffda4f] text-[#8b5200] shadow-none" : "bg-[#e8faf0] border-[#b1f0cb] text-[#0e5d2e] shadow-none"}>{log.HTTPMethod}</Badge></TableCell>
                        <TableCell className="py-2 px-4 border-b">{log.ResponseStatus}</TableCell>
                        <TableCell className="py-2 px-4 border-b">{log.ResponseTimeMs}</TableCell>
                        <TableCell className="py-2 px-4 border-b"><code
                            className="relative rounded-2xl bg-muted px-[0.8rem] py-[0.3rem]">
                            {log.IPAddress}</code></TableCell>
                        <TableCell className="py-2 px-4 border-b">{new Date(log.CreatedAt).toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default RequestLogsTable;
