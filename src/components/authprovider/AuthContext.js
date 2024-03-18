// src/components/authprovider/AuthContext.js
// src/components/authprovider/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null); // Add this line

    const authenticate = (token, id, username, role) => {
        // Save the token in the local storage or in a cookie
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
        setAuthToken(token);
        setUserId(id);
        setUsername(username);
        setRole(role); // Add this line
    };

    const signout = () => {
        // Remove the token from the local storage or cookie
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setRole(null); // Add this line
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authenticate, signout, authToken, userId, username, role }}>
            {children}
        </AuthContext.Provider>
    );
};