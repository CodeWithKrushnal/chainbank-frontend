import {Card} from "@/components/ui/card.tsx";
import {KYC} from "@/Features/Profile/Types/KYC.ts";
import {Badge} from "@/components/ui/badge.tsx";

const KYCDetailsCard = ({KYCInfo}: { KYCInfo: KYC }) => {
    return (
        <Card className="p-4 mb-4 rounded-2xl shadow-none">
            <h2 className="text-xl font-semibold mb-4">KYC Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="font-medium">KYC ID:</p>
                    <p className="text-gray-700">{KYCInfo.KYCID}</p>
                </div>
                <div>
                    <p className="font-medium">Document Type:</p>
                    <p className="text-gray-700">{KYCInfo.DocumentType}</p>
                </div>
                <div>
                    <p className="font-medium">Document Number:</p>
                    <p className="text-gray-700">{KYCInfo.DocumentNumber}</p>
                </div>
                <div>
                    <p className="font-medium">Verification Status: <Badge className={KYCInfo.VerificationStatus=="Verified"?"bg-green-500":"bg-gray-500"}>{KYCInfo.VerificationStatus}</Badge></p>
                </div>
                <div>
                    <p className="font-medium">Submitted At:</p>
                    <p className="text-gray-700">{KYCInfo.SubmittedAt}</p>
                </div>
                {KYCInfo.VerifiedAt != "0001-01-01T00:00:00Z" && <div>
                        <p className="font-medium">Verified At:</p>
                        <p className="text-gray-700">{KYCInfo.VerifiedAt || "N/A"}</p>
                    </div> &&
                    <div>
                        <p className="font-medium">Verified By:</p>
                        <p className="text-gray-700">{KYCInfo.VerifiedBy || "N/A"}</p>
                    </div>
                }
            </div>
        </Card>
    );
};

export default KYCDetailsCard;