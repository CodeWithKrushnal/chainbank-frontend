import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUpPage from '@/Features/SignUp/Pages/SignUpPage.tsx';
import SignInPage from "@/Features/SignIn/Pages/SignInPage.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";
import HomePage from "@/Features/Home/Pages/HomePage.tsx";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import PassBookPage from "@/Features/PassBook/Pages/PassBookPage.tsx";
import ProfilePage from "@/Features/Profile/Pages/ProfilePage.tsx";
import LoanApplicationsPage from "@/Features/LoanApplications/Pages/LoanApplicationsPage.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import BorrowPage from "@/Features/Borrow/Pages/BorrowPage.tsx";
import OfferPage from "@/Features/Offers/Pages/OfferPage.tsx";
import MyLoansPage from "@/Features/MyLoans/Pages/MyLoansPage.tsx";
import ResetPasswordPage from "@/Features/ResetPassword/Pages/ResetPassword.tsx";
import AdminRoute from "@/routes/AdminRoute.tsx";
import KYCPage from "@/Features/Admin/KYC/Pages/KYCPage.tsx";
import LogsPage from "@/Features/Admin/Logs/Pages/LogsPage.tsx";
import DashPage from "@/Features/Admin/Dash/Page/DashPage.tsx";
import TransactionLogs from "@/Features/Admin/TransactionLogs/Pages/TransactionLogs.tsx";
import LandingPage from "@/Features/Landing/Pages/LandingPage.tsx";

const AppRoutes: React.FC = () => {
    return (<>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path={import.meta.env.VITE_SIGN_UP} element={<SignUpPage/>}/>
                    <Route path={import.meta.env.VITE_SIGN_IN} element={<SignInPage/>}/>
                    <Route path={import.meta.env.VITE_RESET_PASSWORD} element={<ResetPasswordPage/>}/>
                    <Route path={import.meta.env.VITE_HOME}
                           element={<ProtectedRoute><MainLayout><HomePage/></MainLayout></ProtectedRoute>}/>
                    <Route path={import.meta.env.VITE_PASSBOOK}
                           element={<ProtectedRoute><MainLayout><PassBookPage/></MainLayout></ProtectedRoute>}/>
                    <Route path={import.meta.env.VITE_PROFILE}
                           element={<ProtectedRoute><MainLayout><ProfilePage/></MainLayout></ProtectedRoute>}/>
                    <Route path={import.meta.env.VITE_LOAN_APPLICATIONS}
                           element={<ProtectedRoute><MainLayout><LoanApplicationsPage/></MainLayout></ProtectedRoute>}/>
                    <Route path={import.meta.env.VITE_BORROW}
                           element={<ProtectedRoute><MainLayout><BorrowPage/></MainLayout></ProtectedRoute>}/>
                    <Route path={import.meta.env.VITE_MY_OFFERS}
                           element={<ProtectedRoute><MainLayout><OfferPage/></MainLayout></ProtectedRoute>}/>
                    <Route path={import.meta.env.VITE_MY_LOANS}
                           element={<ProtectedRoute><MainLayout><MyLoansPage/></MainLayout></ProtectedRoute>}/>

                    //Admin Routes
                    <Route path={import.meta.env.VITE_ADMIN_KYC}
                           element={<AdminRoute><MainLayout><KYCPage/></MainLayout></AdminRoute>}/>
                    <Route path={import.meta.env.VITE_ADMIN_LOGS}
                           element={<AdminRoute><MainLayout><LogsPage/></MainLayout></AdminRoute>}/>
                    <Route path={import.meta.env.VITE_ADMIN_DASH}
                           element={<AdminRoute><MainLayout><DashPage/></MainLayout></AdminRoute>}/>
                    <Route path={import.meta.env.VITE_ADMIN_TLOG}
                           element={<AdminRoute><MainLayout><TransactionLogs/></MainLayout></AdminRoute>}/>

                    <Route path="*" element={<SignInPage/>}/>
                </Routes>
            </Router>
            <Toaster/>
        </>
    );
};

export default AppRoutes;
