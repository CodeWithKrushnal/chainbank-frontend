import {Zap} from "lucide-react";

const Terms = () => {
    return (
        <div>
            <div className="flex justify-center items-center flex-col">
                <div className="flex items-center justify-center pt-20 pr-10">
                    <Zap size={20} className="m-3" color="#374151"/>
                    <h1 className="font-serif text-4xl text-gray-700">ChainBank</h1>
                </div>
                <div className="flex items-center justify-center mt-5">
                    <h2 className="font-serif text-gray-600 text-2xl">
                        Terms of Service
                    </h2>
                </div>
                <div className="flex items-center justify-center mt-5 max-w-4xl min-w-4xl text-gray-600 font-serif">
                    <ol>
                        <li className="mb-2">
                            <em><span
                                className="text-lg text-gray-700 text-center">Eligibility</span></em>
                            <p>You must be 18 or older and capable of forming legal agreements to use ChainBank.</p>
                        </li>
                        <li className="mb-2">
                            <em><span
                                className="text-lg text-gray-700 text-center">Account Responsibility</span></em>
                            <p>You are responsible for maintaining the confidentiality of your account credentials and
                                all activities under your account.</p>
                        </li>
                        <li className="mb-2">
                            <em><span
                                className="text-lg text-gray-700 text-center">Transactions & Risks</span></em>
                            <p>Blockchain transactions are irreversible. ChainBank is not liable for losses,
                                including those resulting from security breaches.</p>
                        </li>
                        <li className="mb-2">
                            <em><span
                                className="text-lg text-gray-700 text-center">Prohibited Activities</span></em>
                            <p>Engaging in illegal activities, fraud, or circumventing platform security is
                                strictly prohibited.</p>
                        </li>
                        <li className="mb-2">
                            <em><span
                                className="text-lg text-gray-700 text-center">Amendments & Termination</span></em>
                            <p>ChainBank reserves the right to modify these Terms at any time and may suspend or
                                terminate accounts that violate them.</p>
                        </li>

                        <h2 className="text-center font-serif text-gray-600 text-2xl py-5 pt-8">
                            Privacy Policy
                        </h2>

                        <li className="mb-2">
                            <em><span className="text-lg text-gray-700 text-center">Data Collection</span></em>
                            <p>We collect personal and blockchain-related information to provide and improve our
                                services.</p>
                        </li>
                        <li className="mb-2">
                            <em><span className="text-lg text-gray-700 text-center">Use of Information</span></em>
                            <p>Your data is used for transaction facilitation, account security, and customer
                                communication.</p>
                        </li>
                        <li className="mb-2">
                            <em><span className="text-lg text-gray-700 text-center">Data Sharing</span></em>
                            <p>We may share data with third-party services or as required by law. Your data is never
                                sold to third parties.</p>
                        </li>
                        <li className="mb-2">
                            <em><span className="text-lg text-gray-700 text-center">Data Security</span></em>
                            <p>We use encryption and security protocols, but cannot guarantee 100% protection due to the
                                decentralized nature of blockchain.</p>
                        </li>
                        <li className="mb-2">
                            <em><span className="text-lg text-gray-700 text-center">Your Rights</span></em>
                            <p>You can request access to, correction of, or deletion of your data by contacting us
                                directly.</p>
                        </li>
                    </ol>

                </div>
                <div className="mt-5 py-10">
                    <h3 className="font-serif ml-10 underline text-gray-500">
                        <em>
                            <a href="{import.meta.env.VITE_SIGN_IN}">
                                Join The Revolution
                            </a>
                        </em>
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Terms;