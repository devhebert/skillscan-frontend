// src/components/authprovider/AuthProvider.js
import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userRole = localStorage.getItem('role');
        if (token) {
            setIsAuthenticated(true);
            setAuthToken(token);
            setRole(userRole);
            // You may want to fetch user details here using the token
        }
    }, []);

    const authenticate = (token, id, username, role) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', role);
        setIsAuthenticated(true);
        setAuthToken(token);
        setUserId(id);
        setUsername(username);
        setRole(role);
    };

    const signout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authenticate, signout, authToken, userId, username, role }}>
            {children}
        </AuthContext.Provider>
    );
};