import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {toast} from 'sonner';
import {AxiosError} from 'axios';
import {useNavigate} from 'react-router-dom';
import {post} from '@/services/apiService.ts';
import SignUpFormView from '@/Features/SignUp/Components/Presentational/SignUpFormView.tsx';

// Define the form schema using Zod
const formSchema = z.object({
    username: z
        .string()
        .min(2, {message: "Username must be at least 2 characters."})
        .regex(/^[a-zA-Z0-9]+$/, {message: "Username must be alphanumeric (no spaces or special characters)."}),

    email: z.string().email({message: "Invalid email address."}),

    password: z
        .string()
        .min(6, {message: "Password must be at least 6 characters."})
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
            message: "Password must contain at least one letter and one number.",
        }),

    full_name: z
        .string()
        .min(1, {message: "Full name is required."})
        .regex(/^[a-zA-Z\s]+$/, {message: "Full name must only contain letters and spaces."}),

    dob: z
        .string()
        .nonempty({message: "Date of birth is required."})
        .regex(/^\d{4}-\d{2}-\d{2}$/, {message: "Date of birth must be in YYYY-MM-DD format."}),

    email_verification_token: z.string().optional(),
});

const SignUpForm: React.FC = () => {
    const navigate = useNavigate();

    // Initialize the form with useForm and zodResolver
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            full_name: '',
            dob: '',
            email_verification_token: '',
        },
    });

    const handleGetToken = async () => {
        const email = form.getValues('email');
        try {
            toast.loading('Sending Email Verification Token');
            await post(import.meta.env.VITE_VERIFY_EMAIL_API, {email});
            toast.dismiss();
            toast.success('Email Verification Token sent successfully.');
        } catch (error) {
            const axioserr = error as AxiosError;
            toast.dismiss();
            toast.error(axioserr.message);
        }
    };

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            toast.loading('Signing you up');
            await post('/signup', {...values, role: '1'}); // Include role in the data
            toast.dismiss();
            toast.success('Sign up successful!');
            navigate(import.meta.env.VITE_SIGN_IN);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <SignUpFormView
            form={form}
            handleGetToken={handleGetToken}
            handleSubmit={form.handleSubmit(handleSubmit)}
        />
    );
};

export default SignUpForm;
