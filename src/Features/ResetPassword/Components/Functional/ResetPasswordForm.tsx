import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { post } from '@/services/apiService';
import { RootState } from '@/store';
import { toast } from 'sonner';
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import ResetPasswordFormView from "@/Features/ResetPassword/Components/Presentational/ResetPasswordFormView.tsx";

const ResetPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isTokenSent, setIsTokenSent] = useState(false);
    const authToken = useSelector((state: RootState) => state.auth.authToken);
    const navigate = useNavigate();

    const handleSendToken = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            toast.loading('Sending the Password Reset Token');
            await post('/resetpassword', { email }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            toast.dismiss();
            toast.success('Reset token sent to your email.');
            setIsTokenSent(true);
        } catch (error) {
            toast.dismiss();
            toast.error('Error sending reset token.');
            console.error('Error sending reset token:', error);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            toast.loading('Updating new password');
            await post('/updatepassword', { reset_token: resetToken, new_password: newPassword }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            toast.dismiss();
            toast.success('Password updated successfully!');
            navigate(import.meta.env.VITE_SIGN_IN);
        } catch (error) {
            toast.dismiss();
            const fetchError = error as AxiosError;
            if (fetchError.response && fetchError.response.status === 401) {
                toast.error('Invalid or expired reset token.');
            } else {
                toast.error('Error updating password.');
                console.error('Error updating password:', error);
            }
        }
    };

    return (
        <ResetPasswordFormView
            email={email}
            resetToken={resetToken}
            newPassword={newPassword}
            isTokenSent={isTokenSent}
            setEmail={setEmail}
            setResetToken={setResetToken}
            setNewPassword={setNewPassword}
            handleSendToken={handleSendToken}
            handleResetPassword={handleResetPassword}
        />
    );
};

export default ResetPasswordForm;