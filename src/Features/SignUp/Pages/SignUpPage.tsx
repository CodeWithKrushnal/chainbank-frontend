// src/pages/SignUpPage.tsx
import React from 'react';
import SignUpForm from '../Components/Functional/SignUpForm.tsx';
import {Separator} from "@/components/ui/separator.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";

const SignUpPage: React.FC = () => {
    return (
        <div className="grid grid-cols-12 min-h-screen items-center">
            <div className="col-span-6 col-start-2 text-left">
                <em><p className="font-serif text-7xl leading">Welcome To the New Age of Payments</p></em>
            </div>
            <div className="col-span-3 col-start-9">
                <Card className="rounded-2xl">
                    <CardHeader>
                        <h1 className="text-center text-2xl font-semibold font-sans">Sign Up</h1>
                        <p className="text-balance text-md text-muted-foreground text-center pb-2 font-serif">Your first step
                            towards payments freedom</p>
                        <Separator/>
                    </CardHeader>
                    <CardContent>
                        <SignUpForm/>
                        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary mt-4">
                            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                            and <a href="#">Privacy Policy</a>.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SignUpPage;
