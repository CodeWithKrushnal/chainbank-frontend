import DAUCard from "@/Features/Admin/Dash/Components/Functional/DAUCard.tsx";
import APITraffic from "@/Features/Admin/Dash/Components/Functional/APITraffic.tsx";
import MAUCard from "@/Features/Admin/Dash/Components/Functional/MAUCard.tsx";
import TotalUsersCard from "@/Features/Admin/Dash/Components/Functional/TotalUsersCard.tsx";
import TotalTransactionsCard from "@/Features/Admin/Dash/Components/Functional/TotalTransactionsCard.tsx";
import RequestLogs from "@/Features/Admin/Logs/Components/Functional/RequestLogs.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import TransactionTypes from "@/Features/Admin/Dash/Components/Functional/TransactionTypes.tsx";
import DAUGraphCard from "@/Features/Admin/Dash/Components/Presentational/DAUGraphCard.tsx";

const DashPage = () => {
    return (
        <div className="p-4">
            <h1 className="font-serif text-4xl mb-4 text-gray-700">Admin Dash</h1>
            <div className="grid grid-cols-4 gap-4">
                <div className="py-4">
                    <DAUCard/>
                </div>
                <div className="py-4">
                    <MAUCard/>
                </div>
                <div className="py-4">
                    <TotalUsersCard/>
                </div>
                <div className="py-4">
                    <TotalTransactionsCard/>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="py-4">
                    <APITraffic/>
                </div>
                <div className="py-4">
                    <DAUGraphCard/>
                </div>
                <div className="py-4">
                    <TransactionTypes/>
                </div>
            </div>
            <ScrollArea className="h-[300px] rounded-2xl shadow-none border">
                <RequestLogs/>
            </ScrollArea>
        </div>
    )
}

export default DashPage