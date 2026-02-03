import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { V0Provider } from "@/lib/v0-context";
import localFont from "next/font/local";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MobileHeader } from "@/components/dashboard/mobile-header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import mockDataJson from "@/mock.json";
import type { MockData } from "@/types/dashboard";
import Widget from "@/components/dashboard/widget";
import Notifications from "@/components/dashboard/notifications";
import { MobileChat } from "@/components/chat/mobile-chat";
import Chat from "@/components/chat";
import { Toaster } from "@/components/ui/sonner"
import SectionTransition from "@/components/section-transition";
import {AuthProvider} from "@/components/contexts/AuthContext";
import DashboardAuth from "@/components/auth/DashboardAuth";
import { Analytics } from "@vercel/analytics/next";

const mockData = mockDataJson as MockData;

const robotoMono = Roboto_Mono({
    variable: "--font-roboto-mono",
    subsets: ["latin"],
});

const rebelGrotesk = localFont({
    src: "../public/fonts/Rebels-Fett.woff2",
    variable: "--font-rebels",
    display: "swap",
});

const isV0 = process.env["VERCEL_URL"]?.includes("vusercontent.net") ?? false;

export const metadata: Metadata = {
    title: {
        template: "%s – M.O.N.K.Y OS",
        default: "CorpTech",
    },
    description:
        "najlepsza firma przynosząca prawdę",

};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {


    return (
        <html lang="en" className="dark">
        <head>
            <title>DemosKratos</title>
            <link
                rel="preload"
                href="/fonts/Rebels-Fett.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
        </head>
        <body
            className={`${rebelGrotesk.variable} ${robotoMono.variable} antialiased`}
        >
        <AuthProvider>
            <DashboardAuth>

                    <SidebarProvider>
                        {/* Mobile Header - only visible on mobile */}
                        <MobileHeader mockData={mockData} />

                        {/* Desktop Layout */}
                        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-12 gap-gap lg:px-sides">
                            <div className="hidden lg:block col-span-2 top-0 relative">
                                <DashboardSidebar />
                            </div>
                            <div className="col-span-1 lg:col-span-7">
                                <SectionTransition>
                                    {children}
                                </SectionTransition>
                            </div>
                            <div className="col-span-3 hidden lg:block">
                                <div className="space-y-gap py-sides min-h-screen max-h-screen top-0 sticky overflow-visible">
                                    <Widget widgetData={mockData.widgetData} />
                                    <Notifications
                                        initialNotifications={mockData.notifications}
                                    />
                                    <div className="fixed max-w-110 w-full bottom-0 right-4 ">

                                    </div>

                                </div>
                            </div>
                        </div>
                    </SidebarProvider>
            </DashboardAuth>
        </AuthProvider>
        <Toaster />
        <Analytics />
        </body>
        </html>
    );
}
