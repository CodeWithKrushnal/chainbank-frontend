import React from 'react';
import { Card } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';

interface DAUCardViewProps {
    heading: string;
    statcount: number | string;
    badgeContent: string;
}

const StatCard: React.FC<DAUCardViewProps> = ({heading, statcount, badgeContent }) => {
    return (
        <Card className="p-4 rounded-2xl shadow-none bg-transparent">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h1 className="text-xl font-medium text-gray-500">{heading}</h1>
                    <Badge className="mt-2 bg-gray-400">{badgeContent}</Badge>
                </div>
                <div className="justify-end">
                    <p className="text-6xl font-medium text-right text-gray-700">{statcount}</p>
                </div>
            </div>
        </Card>
    );
};

export default StatCard;
