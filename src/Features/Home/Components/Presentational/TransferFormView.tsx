import React, {useEffect} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {IndianRupee} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Badge} from "@/components/ui/badge.tsx";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import confetti from "canvas-confetti";
import {fetchEthPrice} from "@/utils/fetchEthPrice.ts";
import {toast} from "sonner";
import {AxiosError} from "axios";

interface TransferFormContentProps {
    form: UseFormReturn<{
        recipient_email: string;
        amount: string;
        password: string;
        recipient_wallet_id?: string;
    }>;
    onSubmit: (e: React.FormEvent) => void;
    transactionDetails: any;
    setTransactionDetails: (details: any) => void;
}

const NotificationSound = new Audio("src/assets/PaymentSound.mp3");

const TransferFormContent: React.FC<TransferFormContentProps> = ({
                                                                     form,
                                                                     onSubmit,
                                                                     transactionDetails,
                                                                     setTransactionDetails,
                                                                 }) => {
    const {control, formState} = form;
    const {isValid} = formState;

    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [ethUSD, setethUSD] = React.useState(0);
    const [amtUSD, setAmtUSD] = React.useState(0)

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const price = await fetchEthPrice();
                console.log(price);
                setethUSD(price);
            } catch (error) {
                const fetchErr = error as AxiosError;
                toast.error(fetchErr.message);
            }
        };
        fetchPrice();
    }, []);


    const handleOpenDialog = () => {
        if (isValid) {
            setIsDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setTransactionDetails(null); // Reset transaction details when closing the dialog
    };

    if (transactionDetails?.status == "completed") {
        NotificationSound.play();
        fire();
    }

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
                <FormField
                    control={control}
                    name="recipient_email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Recipient Email:</FormLabel>
                            <FormControl>
                                <Input {...field} required className="border p-2 w-full"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="recipient_wallet_id"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Recipient Wallet ID:</FormLabel>
                            <FormControl>
                                <Input {...field} className="border p-2 w-full"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="amount"
                    render={({field}) => (
                        <FormItem>
                            <div className="flex flex-row gap-4">

                                <div className="w-full">
                                    <FormLabel>Amount in USD:</FormLabel>
                                    <FormControl>
                                        <Input type="number" value={amtUSD} onChange={(e) => {
                                            setAmtUSD(parseFloat(e.target.value));
                                            form.setValue("amount", ((parseFloat(e.target.value) / ethUSD) * Math.pow(10, 18)).toString());
                                        }}/>
                                    </FormControl>
                                </div>
                                <div className="w-full">
                                    <FormLabel>Amount in WEI:</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} required className="border p-2 w-full"
                                               disabled/>
                                    </FormControl>
                                </div>
                            </div>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password:</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} required className="border p-2 w-full"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button
                    type="button"
                    className="p-2 bg-green-500 text-white"
                    disabled={!isValid}
                    onClick={handleOpenDialog}
                >
                    <IndianRupee size="16px"/>
                    Transfer
                </Button>

                <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
                    <DialogContent className="w-full">
                        <DialogHeader>
                            <DialogTitle
                                className="font-[montserrat]">{transactionDetails ? 'Transaction Successful' : 'Confirm Transaction'}</DialogTitle>
                            <DialogDescription>
                                {transactionDetails ? 'Transaction Details' : 'Confirm the Transaction Details'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            {transactionDetails ? (
                                <>
                                    <div className="">
                                        <DotLottieReact
                                            className="max-w-full"
                                            src="https://lottie.host/02c2606b-88dc-4f15-a5d9-320604a39f34/EepfEqUU8t.lottie"
                                            loop
                                            autoplay
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 items-center">
                                        <h2 className="text-gray-800 font-[montserrat] font-semibold text-sm">Transaction
                                            ID:
                                        </h2>
                                        <div className="col-span-2">
                                            <Badge variant="secondary">
                                                {transactionDetails.transaction_id}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 items-center">
                                        <h2 className="text-gray-800 font-[montserrat] font-semibold text-sm">
                                            Amount:
                                        </h2>
                                        <div className="col-span-2">
                                            <Badge variant="secondary">
                                                {transactionDetails.amount}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 items-center">
                                        <h2 className="text-gray-800 font-[montserrat] font-semibold text-sm">
                                            Status:
                                        </h2>
                                        <div className="col-span-2">
                                            <Badge
                                                variant={transactionDetails.status == "completed" ? "default" : "destructive"}
                                                className={transactionDetails.status == "completed" ? "bg-green-500 text-white" : ""}>
                                                {transactionDetails.status == "completed" ? "Completed" : transactionDetails.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 items-center">
                                        <h2 className="text-gray-800 font-[montserrat] font-semibold text-sm">
                                            Sender Wallet ID:
                                        </h2>
                                        <div className="col-span-2">
                                            <Badge variant="secondary">
                                                {transactionDetails.sender_wallet_id}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 items-center">
                                        <h2 className="text-gray-800 font-[montserrat] font-semibold text-sm">
                                            Receiver Wallet ID:
                                        </h2>
                                        <div className="col-span-2">
                                            <Badge variant="secondary">
                                                {transactionDetails.receiver_wallet_id}
                                            </Badge>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <h2 className="text-gray-800 font-[montserrat] font-semibold text-sm">
                                            Amount:
                                        </h2>
                                        <div className="col-span-3">
                                            <Badge variant="secondary">
                                                {form.getValues('amount')}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <h2 className="text-gray-800 font-[montserrat] font-semibold text-sm">
                                            To:
                                        </h2>
                                        <div className="col-span-3">
                                            <Badge variant="secondary">
                                                {form.getValues('recipient_email')}
                                            </Badge>
                                        </div>
                                    </div>
                                    {form.getValues('recipient_wallet_id') && (
                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <h2 className="text-gray-800 font-[montserrat] font-semibold text-sm">
                                                Wallet ID:
                                            </h2>
                                            <div className="col-span-3">
                                                <Badge variant="secondary">
                                                    {form.getValues('recipient_wallet_id')}
                                                </Badge>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <DialogFooter className="flex justify-between items-center flex-row">
                            {!transactionDetails && (
                                <div className="flex items-center w-full justify-between">
                                    <div className="">
                                        <p className="text-gray-400 font-serif text-sm">
                                            <em>*Blockchain transactions are irreversible.</em>
                                        </p>
                                    </div>
                                    <div className="">
                                        <Button type="submit" className="bg-green-400 text-white" onClick={onSubmit}>
                                            <IndianRupee size="16px"/>
                                            Confirm Transfer
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </form>
        </Form>
    )
        ;
};

export default TransferFormContent;


const fire = () => {
    const end = Date.now() + 1 * 1000; // 3 seconds
    const colors = ["#fdff6a", "#ff718d", "#78ff44", "#29cdff", "#a864fd"];

    const frame = () => {
        if (Date.now() > end) return;

        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: {x: 0, y: 0.5},
            colors: colors,
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: {x: 1, y: 0.5},
            colors: colors,
        });

        requestAnimationFrame(frame);
    };

    frame();
};