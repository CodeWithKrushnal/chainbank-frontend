import React from 'react';
import {useSelector} from "react-redux";
import {User} from "@/types/types.ts";
import {RootState} from "@/store";
import {Navigate} from 'react-router-dom';

interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({children}) => {
    const authToken = useSelector((state: RootState) => state.auth.authToken);
    const user: User | null = useSelector((state: RootState): User | null => state.auth.user);

    console.log(user);

    if (!authToken || user?.role != 3) {
        return <Navigate to="/home"/>;
    }

    return <>{children}</>;
};

export default AdminRoute;