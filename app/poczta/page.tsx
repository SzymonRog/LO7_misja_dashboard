"use client"
import DashboardPageLayout from "@/components/dashboard/layout"
import DashboardStat from "@/components/dashboard/stat"
import DashboardChart from "@/components/dashboard/chart"
import TargetsList from "@/components/dashboard/targets-list"
import SecurityStatus from "@/components/dashboard/security-status"
import BracketsIcon from "@/components/icons/brackets"
import GearIcon from "@/components/icons/gear"
import ProcessorIcon from "@/components/icons/proccesor"
import BoomIcon from "@/components/icons/boom"
import mockDataJson from "@/mock.json"
import type { MockData } from "@/types/dashboard"
import EmailIcon from "@/components/icons/email";
import SectionLogin from "@/components/auth/SectionLoginProps";
import {useState} from "react";

const mockData = mockDataJson as MockData

// Icon mapping
const iconMap = {
    gear: GearIcon,
    proccesor: ProcessorIcon,
    boom: BoomIcon,
}

export default function EmailPage() {
    const [unlocked, setUnlocked] = useState(false);


    if (!unlocked) {
        return (
            <DashboardPageLayout
                header={{
                    title: "Login",
                    icon: EmailIcon,
                }}
            >
                <div className="flex justify-center  bg-background/50 backdrop-blur-xl">
                    <SectionLogin
                        sectionId="email"
                        label="Email Section"
                        onUnlock={() => setUnlocked(true)}
                    />
                </div>
            </DashboardPageLayout>
        );
    }


    return (
        <>
            <DashboardPageLayout
                header={{
                    title: "Login",
                    icon: EmailIcon,
                }}
            >
                <div className="flex justify-center  bg-background/50 backdrop-blur-xl">
                    <h1> This is email</h1>
                </div>
            </DashboardPageLayout>
        </>
    )
}
