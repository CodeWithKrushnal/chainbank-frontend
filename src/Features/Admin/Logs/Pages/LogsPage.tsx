import RequestLogs from "@/Features/Admin/Logs/Components/Functional/RequestLogs.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

const LogsPage = () => {
    return (
        <div className="p-4">
            <h1 className="font-serif text-4xl mb-4 text-gray-700">API Request Logs</h1>
            <ScrollArea className="h-[870px] rounded-2xl shadow-none border">
                <RequestLogs/>
            </ScrollArea>
        </div>
    )
}

export default LogsPage