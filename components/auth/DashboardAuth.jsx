'use client'
import { DatabaseIcon } from 'lucide-react';
import SectionLogin from './SectionLogin';
import DashboardPageLayout from "../dashboard/layout";
import {useAuth} from "../contexts/AuthContext";

export default function DashboardAuth({ children }) {
    const { isAuthenticated, isLoading, login } = useAuth();

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background transition-opacity duration-500 opacity-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
                <div className=" flex items-center justify-center bg-background/50 backdrop-blur-xl min-h-screen w-full">
                    <SectionLogin
                        sectionId="auth"
                        label="Dashboard Demos Kratos"
                        onUnlock={login}
                        description="Musisz znać nasze przedziwne hasło by tu wejść"
                        placeholder="Wpisz hasło"
                        haveRules={true}
                    />
                </div>
        );
    }

    return children;
}