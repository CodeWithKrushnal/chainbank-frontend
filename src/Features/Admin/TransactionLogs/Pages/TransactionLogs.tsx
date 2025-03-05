import TransactionTable from "@/Features/Admin/TransactionLogs/Components/Functional/TransactionTable.tsx";

const TransactionLogs = () => {
    return (
        <div className="p-4">
            <h1 className="font-serif text-4xl mb-4 text-gray-700">Transaction Logs</h1>
            <TransactionTable/>
        </div>
    )
}

export default TransactionLogs;