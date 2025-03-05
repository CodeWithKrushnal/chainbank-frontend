import {Card} from "@/components/ui/card.tsx";

const BalanceCardView = ({loading, error, balance}: {
    loading: boolean,
    error: string | null,
    balance: string | null
}) => {
    return (
        <Card className="p-4 rounded-2xl shadow-none bg-transparent">
            <div className="grid grid-cols-[1fr_3fr] gap-4 h-full">
                <h1 className="text-xl font-medium text-gray-500">Account Balance</h1>

                <div className="flex items-center justify-end">
                    <p className="text-4xl font-medium text-right text-gray-700">
                        {loading ? 'Loading...' : error ? 'Error loading balance' : `ETH ${balance}`}
                    </p>
                </div>
            </div>
        </Card>)
}
export default BalanceCardView