import KYCRequests from "@/Features/Admin/KYC/Components/Functional/KYCRequests.tsx";

const KYCPage=()=>{
    return (
        <div className="p-4">
            <h1 className="font-serif text-4xl mb-4 text-gray-700">KYC Actions</h1>
            <KYCRequests/>
        </div>
    )
}

export default KYCPage;