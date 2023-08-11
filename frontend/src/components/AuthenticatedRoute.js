/**
 * 
 * ProtectedRoute Component
 *
 * This component checks if the user has a valid access token, indicating authentication.
 * If authenticated, it manages user authorization and renders the child components/pages.
 * If not authenticated, it redirects the user to the login page.
 *
 * @param {React component/page} children - The component or page to be rendered if authenticated.
 * @returns {React component/page} - Rendered child components/pages if authenticated, else redirects to the login page.
 */

import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';

/**
 * Checks if the page passed has a valid accesstoken
 * i.e the user is authenticated 
 * If authenticated this manages user authorization
 * 
 * @param {React component/page} param0 
 * @returns page/component
 */
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