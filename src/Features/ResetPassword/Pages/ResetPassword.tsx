import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import ResetPasswordForm from "@/Features/ResetPassword/Components/Functional/ResetPasswordForm.tsx";

const ResetPasswordPage = () => {
    return (
        <div className="grid grid-cols-12 min-h-screen items-center">
            <div className="col-span-6 col-start-2 text-left">
                <em><p className="font-serif text-7xl leading text-gray-800">Welcome To the New Age of Payments</p></em>
            </div>
            <div className="col-span-3 col-start-9">
                <Card className="rounded-2xl">
                    <CardHeader>
                        <h1 className="text-center text-2xl font-semibold font-sans text-gray-700">Reset Password</h1>
                        <p className="text-balance text-md text-muted-foreground text-center pb-2 font-serif">
                            <em>Forgot Password? We got you covered
                            </em>
                        </p>
                        <Separator/>
                    </CardHeader>
                    <CardContent>
                        <ResetPasswordForm/>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ResetPasswordPage;