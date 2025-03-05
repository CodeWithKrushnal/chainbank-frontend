export interface User {
    user_id: string;
    username: string;
    full_name: string;
    email: string;
    wallet_id: string;
    role: number;
    avatar: string;
}

export interface AuthState {
    user: User | null;
    authToken: string | null;
}