import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Send, Shield } from "lucide-react";

interface ResetPasswordFormViewProps {
    email: string;
    resetToken: string;
    newPassword: string;
    isTokenSent: boolean;
    setEmail: (email: string) => void;
    setResetToken: (resetToken: string) => void;
    setNewPassword: (newPassword: string) => void;
    handleSendToken: (e: React.FormEvent) => void;
    handleResetPassword: (e: React.FormEvent) => void;
}

const ResetPasswordFormView: React.FC<ResetPasswordFormViewProps> = ({
                                                                         email,
                                                                         resetToken,
                                                                         newPassword,
                                                                         isTokenSent,
                                                                         setEmail,
                                                                         setResetToken,
                                                                         setNewPassword,
                                                                         handleSendToken,
                                                                         handleResetPassword,
                                                                     }) => {
    return (
        <>
            {!isTokenSent ? (
                <form onSubmit={handleSendToken}>
                    <div className="mb-4">
                        <Label>Email:</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        <Send size={16} />
                        Send Reset Token
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <Label className="mb-2">Reset Token:</Label>
                        <Input
                            type="text"
                            value={resetToken}
                            onChange={(e) => setResetToken(e.target.value)}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="mb-2">New Password:</Label>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        <Shield size={16} />
                        Reset Password
                    </Button>
                </form>
            )}
        </>
    );
};

export default ResetPasswordFormView;