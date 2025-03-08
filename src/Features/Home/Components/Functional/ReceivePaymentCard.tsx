import { User } from "@/types/types.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import ReceivePaymentCardView from "@/Features/Home/Components/Presentational/ReceivePaymentCardView.tsx";
import {toast} from "sonner";

const ReceivePaymentCard = () => {
    const user: User | null = useSelector((state: RootState): User | null => state.auth.user);

    const [copySuccess, setCopySuccess] = useState(false);

    // Function to copy the wallet ID to clipboard
    const handleCopyClick = () => {
        if (user?.wallet_id) {
            navigator.clipboard.writeText(user.wallet_id)
                .then(() => {
                    setCopySuccess(true);
                    toast.info("Copied to clipboard");
                    setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
                })
                .catch(() => {
                    setCopySuccess(false);
                });
        }
    };

    if (!user) return null; // Optionally handle case where user is null

    return (
        <ReceivePaymentCardView
            walletId={user.wallet_id}
            fullName={user.full_name}
            onCopyClick={handleCopyClick}
            copySuccess={copySuccess}
        />
    );
};

export default ReceivePaymentCard;
