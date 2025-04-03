import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '@/store';
import {AnimatePresence} from "framer-motion";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authToken = useSelector((state: RootState) => state.auth.authToken);

  if (!authToken) {
    return <Navigate to="/signin" />;
  }

  return <AnimatePresence>{children}</AnimatePresence>;
};

export default ProtectedRoute;
