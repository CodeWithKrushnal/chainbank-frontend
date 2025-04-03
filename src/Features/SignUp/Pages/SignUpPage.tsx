import React from 'react';
import SignUpForm from '../Components/Functional/SignUpForm.tsx';
import {Separator} from "@/components/ui/separator.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText.tsx";
import AnimatedContent from "@/blocks/Animations/AnimatedContent/AnimatedContent.tsx";
import Threads from "@/blocks/Backgrounds/Threads/Threads.tsx";

const SignUpPage: React.FC = () => {
    return (
        <div className="min-w-screen min-h-screen relative">
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <Threads
                    amplitude={5}
                    distance={0}
                    enableMouseInteraction={false}
                    color={[2, 3, 96]}
                />
            </div>
            <div className="grid grid-cols-12 min-h-screen items-center z-1">
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
                        <Card className="shadow-none bg-transparent backdrop-blur-md">
                            <CardHeader>
                                <h1 className="text-center text-2xl font-semibold font-sans">Sign Up</h1>
                                <p className="text-balance text-md text-muted-foreground text-center pb-2 font-serif">Your
                                    first
                                    step
                                    towards payments freedom</p>
                                <Separator/>
                            </CardHeader>
                            <CardContent>
                                <SignUpForm/>
                                <div
                                    className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary mt-4">
                                    By clicking continue, you agree to our <a href="/terms">Terms of Service</a>{" "}
                                    and <a href="/terms">Privacy Policy</a>.
                                </div>
                            </CardContent>
                        </Card>
                    </AnimatedContent>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
