// src/components/SignUpForm.tsx
import React, { useState } from 'react';
import {toast} from "sonner";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {post} from "@/services/apiService.ts";
import SignUpFormView from "@/Features/SignUp/Components/Presentational/SignUpFormView.tsx";

const SignUpForm: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        full_name: '',
        dob: '',
        role: '1',
        email_verification_token: '',
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleGetToken = async () => {
        try {
            toast.loading("Sending Email Verification Token");
            await post(import.meta.env.VITE_VERIFY_EMAIL_API, { email: formData.email });
            toast.dismiss()
            toast.success("Email Verification Token sent successfully.");
        } catch (error) {
            const axioserr =error as AxiosError;
            toast.dismiss()
            toast.error(axioserr.message);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            toast.loading("Signing you up");
            await post('/signup', formData);
            toast.dismiss()
            toast.success('Sign up successful!');
            navigate(import.meta.env.VITE_SIGN_IN);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <SignUpFormView
            formData={formData}
            handleChange={handleChange}
            handleGetToken={handleGetToken}
            handleSubmit={handleSubmit}
        />
    );
};

export default SignUpForm;
