import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';

interface SignUpFormViewProps {
    form: UseFormReturn<{
        username: string;
        email: string;
        password: string;
        full_name: string;
        dob: string;
        email_verification_token?: string;
    }>;
    handleGetToken: () => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const SignUpFormView: React.FC<SignUpFormViewProps> = ({
                                                           form,
                                                           handleGetToken,
                                                           handleSubmit
                                                       }: SignUpFormViewProps): React.ReactNode => {
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username:</FormLabel>
                            <FormControl>
                                <Input {...field} required/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email:</FormLabel>
                            <FormControl>
                                <Input {...field} required/>
                            </FormControl>
                            <FormMessage/>
                            <Button className="mt-4" variant="outline" onClick={handleGetToken}>
                                Get Token
                            </Button>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password:</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} required/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="full_name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Full Name:</FormLabel>
                            <FormControl>
                                <Input {...field} required/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dob"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Date of Birth:</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} required/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email_verification_token"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email Verification Token:</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
            </form>
        </Form>
    );
};

export default SignUpFormView;
