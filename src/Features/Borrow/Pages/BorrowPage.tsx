import BorrowApplications from "@/Features/Borrow/Components/Functional/BorrowApplications.tsx";
import LoanApplicationForm from "@/Features/Borrow/Components/Functional/LoanApplicationForm.tsx";
import {useCallback} from "react";

const BorrowPage = () => {
    const handleLoanApplicationSuccess = useCallback(() => {}, []);

    return (
        <div className="p-4">
            <h1 className="font-serif text-4xl mb-4 text-gray-700">Borrow Money</h1>
            <LoanApplicationForm onSuccess={handleLoanApplicationSuccess}/>
            <h1 className="font-serif text-4xl mb-4 text-gray-700">My Applications</h1>
            <BorrowApplications onBorrowUpdate={handleLoanApplicationSuccess}/>
        </div>
    )
}

export default BorrowPage;