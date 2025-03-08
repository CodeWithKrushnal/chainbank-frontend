import { Button } from "@/components/ui/button.tsx";
import { ClipboardIcon } from "lucide-react";
import { Card } from "@/components/ui/card.tsx";
import { QRCode } from "react-qrcode-logo";

interface ReceivePaymentCardViewProps {
    walletId: string;
    fullName: string;
    onCopyClick: () => void;
    copySuccess: boolean;
}

const ReceivePaymentCardView: React.FC<ReceivePaymentCardViewProps> = ({ walletId, fullName, onCopyClick }) => {
    return (
        <Card className="min-w-full p-4 flex flex-col items-center justify-center gap-4 rounded-2xl rounded-2xl shadow-none bg-transparent">
            <h1 className="font-serif font-medium text-2xl text-center text-gray-800 mb-6">
                Receive Payment From Any Ethereum Wallet
            </h1>

            <Card className="flex items-center justify-center max-w-xs p-4 rounded-xl mb-4">
                <div className="rounded-lg">
                    <QRCode value={walletId} qrStyle="dots" eyeRadius={90} />
                </div>
            </Card>

            <h3 className="font-serif font-medium text-xl text-center text-gray-800 ">
                {fullName}
            </h3>

            <div className="flex items-center justify-center text-center text-gray-600 text-lg">
                <p className="mr-2">
                    Wallet ID: <span className="font-semibold text-gray-800">{walletId}</span>
                </p>
                <Button size="icon" variant="ghost" onClick={onCopyClick}>
                    <ClipboardIcon size={"16px"} />
                </Button>
            </div>
        </Card>
    );
};

export default ReceivePaymentCardView;
