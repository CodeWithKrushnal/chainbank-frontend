// src/components/SignUpFormView.tsx
import React from 'react';
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

interface SignUpFormViewProps {
    formData: {
        username: string;
        email: string;
        password: string;
        full_name: string;
        dob: string;
        role: string;
        email_verification_token: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleGetToken: () => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const SignUpFormView: React.FC<SignUpFormViewProps> = ({
                                                           formData,
                                                           handleChange,
                                                           handleGetToken,
                                                           handleSubmit,
                                                       }) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label>Username:</Label>
                    <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label>Email:</Label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Button className="mt-4" variant="outline" onClick={handleGetToken}>
                        Get Token
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label>Password:</Label>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label>Full Name:</Label>
                    <Input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label>Date of Birth:</Label>
                    <Input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label>Role:</Label>
                    <Input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        readOnly
                    />
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label>Email Verification Token:</Label>
                    <Input
                        type="text"
                        name="email_verification_token"
                        value={formData.email_verification_token}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="items-center text-center justify-center gap-2">
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default SignUpFormView;
