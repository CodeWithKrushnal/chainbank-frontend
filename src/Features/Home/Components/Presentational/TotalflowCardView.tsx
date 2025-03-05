import React from 'react';
import {Card} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

interface TotalOutflowCardViewProps {
    amount: number | null;
    currentMonth: string;
    flow: string
    currency: string;
}

const TotalflowCardView: React.FC<TotalOutflowCardViewProps> = ({flow, amount, currentMonth, currency}) => {
    return (
        <Card className="p-4 rounded-2xl shadow-none bg-transparent">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h1 className="text-xl font-medium text-gray-500">{flow}</h1>
                    <Badge className="mt-2 bg-gray-400">
                        {currentMonth}
                    </Badge>
                </div>
                <div className="justify-end">
                    <p className="text-4xl font-medium text-right text-gray-700">
                        {currency ? currency : "ETH"}
                    </p>
                    <p className="text-4xl font-medium text-right text-gray-700">
                        {amount !== null ? amount.toLocaleString() : 'N/A'}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default TotalflowCardView;
