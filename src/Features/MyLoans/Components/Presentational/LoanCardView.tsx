import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loan } from "@/Features/MyLoans/types/loan.ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SettlementInfo } from "@/Features/Offers/types/offer.ts";
import { Check, Undo2, X } from "lucide-react";

interface LoanCardViewProps {
  loan: Loan;
  settlementInfo: SettlementInfo | null;
  handleSettleLoan: () => void;
  isLoadingSettlement: boolean;
}

const LoanCardView: React.FC<LoanCardViewProps> = ({ loan, settlementInfo, handleSettleLoan, isLoadingSettlement }) => {
  return (
      <Card className="p-6 mb-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">Loan ID: {loan.loan_id}</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-gray-600">
              <strong className="font-medium">Total Principal:</strong> {loan.total_principle?.toLocaleString() ?? 'N/A'}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Remaining Principal:</strong> {loan.remaining_principle?.toLocaleString() ?? 'N/A'}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Interest Rate:</strong> {loan.interest_rate}%
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <strong className="font-medium">Status:</strong> {loan.status}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Start Date:</strong> {new Date(loan.start_date).toLocaleString()}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Next Payment Date:</strong> {new Date(loan.next_payment_date).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <strong className="font-medium">Accrued Interest:</strong> {loan.accrued_interest?.toLocaleString() ?? 'N/A'}
            </p>
            {/* Placeholder div for button space, always present */}
            <div className="min-h-[40px]">
              {loan.status !== 'closed' && (
                  <AlertDialog>
                    <AlertDialogTrigger className="float-right">
                      <Button variant="outline" className="mb-2 float-right">
                        <Undo2 size={16} className="mr-2" />
                        Settle Loan
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-semibold">Settle Loan</AlertDialogTitle>
                        <AlertDialogDescription>
                          {isLoadingSettlement ? (
                              <p className="text-gray-600">Loading settlement information...</p>
                          ) : settlementInfo ? (
                              <div className="grid grid-cols-3">
                                <p className="text-gray-600"><strong className="font-medium">Principal:</strong> {settlementInfo.principal?.toLocaleString()}</p>
                                <p className="text-gray-600"><strong className="font-medium">Interest:</strong> {settlementInfo.interest?.toLocaleString()}</p>
                                <p className="text-gray-600"><strong className="font-medium">Fees:</strong> {settlementInfo.fees?.toLocaleString()}</p>
                                <p className="text-gray-600"><strong className="font-medium">Penalties:</strong> {settlementInfo.penalties?.toLocaleString()}</p>
                                <p className="text-gray-600"><strong className="font-medium">Total Payable:</strong> {settlementInfo.total_payable?.toLocaleString()}</p>
                              </div>
                          ) : (
                              <p className="text-red-500">Failed to load settlement information.</p>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel><X size={16} className="mr-2" />Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSettleLoan}><Check size={16} className="mr-2" />Settle</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </Card>
  );
};

export default LoanCardView;