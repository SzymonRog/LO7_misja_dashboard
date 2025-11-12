'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const getInitialAuth = () => {
        if (typeof window !== "undefined") {
            return !!localStorage.getItem("dashboard_auth");
        }
        return false;
    };

    const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuth);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('dashboard_auth');
        setIsAuthenticated(!!token);
        setIsLoading(false);
    }, []);

    const login = async (password) => {
        try {
            const response = await fetch('/api/unlock-section', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sectionId: 'auth', password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('dashboard_auth', 'true');
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('dashboard_auth');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);