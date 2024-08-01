import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('access_token') || null);

    // const login = async (input) => {
    //     const url = "http://localhost:8000/auth/login";
    //     try {
    //         const response = await fetch(url, {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(input),
    //             credentials: 'include',
    //         });
    //         const data = await response.json();
    //         console.log(data.token);
    //         setIsAuthenticated(data.token);
    //     } catch (error) {
    //         console.error('Error logging in:', error);            
    //     }
    // };

    const logout = async () => {
        const url = "https://blog-website-cyan-seven.vercel.app/auth/logout";
            const response = await fetch(url, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            setIsAuthenticated(null);   
    };

    useEffect(() => {
        localStorage.setItem('access_token', isAuthenticated);
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
