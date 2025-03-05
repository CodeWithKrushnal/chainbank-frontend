import {Zap} from "lucide-react";
import RotatingText from "@/components/RotatingText/RotatingText.tsx";


const LandingPage = () => {
    return (
        <div className="flex h-screen justify-center items-center flex-col mr-20">
            <div className="flex items-center justify-center">
                <Zap size={55} className="m-3" color="#374151"/>
                <h1 className="font-serif text-7xl text-gray-700">ChainBank</h1>
            </div>
            <div className="flex items-center justify-center mt-5">
                <h2 className="font-serif text-gray-600 ml-20">
                    <em>Your Trust is our <span className="inline-block">
                        <RotatingText texts={['Commitment', 'Mission', 'Vision', 'Command']}
                                      mainClassName="inline-block overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                                      staggerFrom="last"
                                      initial={{y: "100%"}}
                                      animate={{y: 0}}
                                      exit={{y: "-120%"}}
                                      staggerDuration={0.025}
                                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                      transition={{type: "spring", damping: 30, stiffness: 400}}
                                      rotationInterval={3000}/>
                    </span>. Nothing else</em>
                </h2>
            </div>

            <div className="mt-5 ">
                <h3 className="font-serif ml-20 underline text-gray-500">
                    <em>
                        <a href="{import.meta.env.VITE_SIGN_IN}">
                            Join The Revolution
                        </a>
                    </em>
                </h3>
            </div>
        </div>

    )
}

export default LandingPage;