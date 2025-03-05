import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import SignInForm from "@/Features/SignIn/Components/Functional/SignInForm.tsx";

const SignInPage: React.FC = () => {
    return (
        <div className="grid grid-cols-12 min-h-screen items-center">
            <div className="col-span-6 col-start-2 text-left">
                <em><p className="font-serif text-7xl leading text-gray-800">Welcome To the New Age of Payments</p></em>
            </div>
            <div className="col-span-3 col-start-9">
                <Card>
                    <CardHeader>
                        <h1 className="text-center text-2xl font-semibold font-sans text-gray-700">Sign In</h1>
                        <p className="text-balance text-md text-muted-foreground text-center pb-2 font-serif">Your first step
                            towards payments freedom</p>
                        <Separator/>
                    </CardHeader>
                    <CardContent>
                        <SignInForm/>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href={import.meta.env.VITE_SIGN_UP} className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Forgot password?{" "}
                            <a href={import.meta.env.VITE_RESET_PASSWORD} className="underline underline-offset-4">
                                Click Here
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SignInPage;
