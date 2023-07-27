import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');

    const user = token ? true : false;

    useEffect(() => {
    }, [token]);

    if (!user) {
        return <Navigate to='/login' />;
    }

    return children;
}

export default ProtectedRoute;