export interface Transaction {
  transaction_id: string;
  sender_wallet_id: string;
  receiver_wallet_id: string;
  amount: number;
  transaction_type: string;
  status: string;
  transaction_hash: string;
  fee: number;
}