import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {IndianRupee} from "lucide-react";

interface TransferFormContentProps {
    formData: {
        recipient_email: string;
        amount: string;
        password: string;
        recepient_wallet_id:string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const TransferFormContent: React.FC<TransferFormContentProps> = ({ formData, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <Label>Recipient Email:</Label>
                <Input
                    type="email"
                    name="recipient_email"
                    value={formData.recipient_email}
                    onChange={onChange}
                    required
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <Label>Recipient Wallet ID:</Label>
                <Input
                    type="string"
                    name="recepient_wallet_id"
                    value={formData.recepient_wallet_id}
                    onChange={onChange}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <Label>Amount:</Label>
                <Input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={onChange}
                    required
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <Label>Password:</Label>
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    required
                    className="border p-2 w-full"
                />
            </div>
            <Button type="submit" className="p-2 bg-green-500 text-white">
                <IndianRupee size="16px"/>
                Transfer
            </Button>
        </form>
    );
};

export default TransferFormContent;
