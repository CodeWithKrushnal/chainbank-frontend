import React from 'react';
import {Card} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {KYCRequest} from "@/Features/Admin/KYC/types/kycRequest.ts";
import {ShieldCheck} from "lucide-react";

interface KYCRequestCardProps {
    kycRequest: KYCRequest;
    onApprove: (kycId: string) => void;
}

const KYCRequestCard: React.FC<KYCRequestCardProps> = ({kycRequest, onApprove}) => {
    return (
        <Card className="p-4 mb-4">
            <h3 className="text-xl font-medium mb-2">KYC ID: {kycRequest.KYCID}</h3>
            <div className="grid grid-cols-3">
                <p className="text-gray-700"><strong>User ID:</strong> {kycRequest.UserID}</p>
                <p className="text-gray-700"><strong>Document Type:</strong> {kycRequest.DocumentType}</p>
                <p className="text-gray-700"><strong>Document Number:</strong> {kycRequest.DocumentNumber}</p>
                <p className="text-gray-700"><strong>Verification Status:</strong> {kycRequest.VerificationStatus}</p>
                <p className="text-gray-700"><strong>Submitted
                    At:</strong> {new Date(kycRequest.SubmittedAt).toLocaleString()}</p>
                <p className="text-gray-700"><strong>Verified
                    At:</strong> {kycRequest.VerifiedAt ? new Date(kycRequest.VerifiedAt).toLocaleString() : 'N/A'}</p>
                <p className="text-gray-700"><strong>Verified By:</strong> {kycRequest.VerifiedBy || 'N/A'}</p>
            </div>
            <div>
                {kycRequest.VerificationStatus === 'Pending' && (
                    <Button onClick={() => onApprove(kycRequest.KYCID)} className="mt-2">
                        <ShieldCheck size={16}/>
                        Approve KYC
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default KYCRequestCard;
