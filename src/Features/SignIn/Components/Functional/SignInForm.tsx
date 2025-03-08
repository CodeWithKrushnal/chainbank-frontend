import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AxiosError} from 'axios';
import {useNavigate} from "react-router-dom";
import {toast} from "sonner"
import {get, post} from "@/services/apiService.ts";
import {setAuthToken, setUser} from "@/store/authSlice.ts";
import SignInFormView from "@/Features/SignIn/Components/Presentational/SignInFormView.tsx";


const SignInForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            toast.loading("Signing You In...")
            const response = await post<{ login_token: string }>(import.meta.env.VITE_SIGN_IN_API, formData);
            dispatch(setAuthToken(response.login_token));

            // Fetch user data and set it in the store
            const userResponse = await get<{
                user_id: string;
                username: string;
                full_name: string;
                email: string;
                wallet_id: string;
                role: number;
            }>('/api/user', {}, {
                headers: {
                    Authorization: `Bearer ${response.login_token}`,
                },
            });

            dispatch(setUser({
                ...userResponse,
                avatar: 'https://github.com/shadcn.png', // Hardcoded avatar
            }));
            toast.dismiss()
            toast.success("SignIn Successful!")
            navigate(import.meta.env.VITE_HOME)

        } catch (error) {
            const serverError = error as AxiosError;
            if (serverError.response && serverError.response.status === 401) {
                toast.dismiss()
                toast.error('Invalid email or password')
            } else {
                console.error('Error logging in:', error);
                toast.error('An unexpected error occurred');
            }
        }
    };

    return (<>
            <SignInFormView
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </>

    );
};

export default SignInForm;
