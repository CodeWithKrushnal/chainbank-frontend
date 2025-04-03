import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import SignInForm from "@/Features/SignIn/Components/Functional/SignInForm.tsx";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText.tsx";
import AnimatedContent from "@/blocks/Animations/AnimatedContent/AnimatedContent.tsx";
import {Zap} from "lucide-react";
import Threads from "@/blocks/Backgrounds/Threads/Threads.tsx";

const SignInPage: React.FC = () => {
    return (
        <div>
            <div className="min-w-screen min-h-screen relative">
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <Threads
                        amplitude={5}
                        distance={0}
                        enableMouseInteraction={false}
                        color={[2, 3, 96]}
                    />
                </div>
                <div className="grid grid-cols-12 min-h-screen items-center">
                    <div className="col-span-6 col-start-2 text-left">
                        <em>
                            <SplitText
                                text="Welcome To the New Age of Payments"
                                className="font-serif text-7xl leading text-gray-800"
                                delay={10}
                                animationFrom={{opacity: 0, transform: 'translate3d(0,50px,0)'}}
                                animationTo={{opacity: 1, transform: 'translate3d(0,0,0)'}}
                                threshold={0.2}
                            />
                        </em>
                    </div>
                    <div className="col-span-3 col-start-9">
                        <AnimatedContent
                            distance={150}
                            direction="vertical"
                            reverse={false}
                            config={{tension: 80, friction: 20}}
                            initialOpacity={0}
                            animateOpacity
                            scale={1.1}
                            threshold={0.2}>
                            <div className="flex flex-row items-center justify-center gap-2 pb-8">
                                <Zap/>
                                <p className="text-center font-serif text-gray-800 text-2xl inline-flex">Chainbank
                                    Inc.</p>
                            </div>
                            <Card className="shadow-none bg-transparent backdrop-blur-sm">
                                <CardHeader>
                                    <p className="text-balance text-lg text-center pb-2 font-[montserrat] font-semibold text-gray-800">Sign
                                        in</p>
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
                                        <a href={import.meta.env.VITE_RESET_PASSWORD}
                                           className="underline underline-offset-4">
                                            Click Here
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedContent>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
