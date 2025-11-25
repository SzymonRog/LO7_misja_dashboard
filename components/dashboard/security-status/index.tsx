"use client";

import { Badge } from "@/components/ui/badge";
import DashboardCard from "@/components/dashboard/card";
import type { SecurityStatus as SecurityStatusType } from "@/types/dashboard";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Activity, AlertTriangle, Shield, TrendingUp } from "lucide-react";

const securityStatusItemVariants = cva(
    "relative overflow-hidden rounded-lg border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
    {
        variants: {
            variant: {
                success: "border-success/30 bg-gradient-to-br from-success/5 to-success/10",
                warning: "border-warning/30 bg-gradient-to-br from-warning/5 to-warning/10",
                destructive: "border-destructive/30 bg-gradient-to-br from-destructive/5 to-destructive/10",
            },
        },
        defaultVariants: {
            variant: "success",
        },
    }
);

const statusIndicatorVariants = cva(
    "absolute top-0 right-0 w-1 h-full animate-pulse",
    {
        variants: {
            variant: {
                success: "bg-success",
                warning: "bg-warning",
                destructive: "bg-destructive",
            },
        },
    }
);

interface SecurityStatusItemProps
    extends VariantProps<typeof securityStatusItemVariants> {
    title: string;
    value: string;
    status: string;
    className?: string;
}

function SecurityStatusItem({
                                title,
                                value,
                                status,
                                variant,
                                className,
                            }: SecurityStatusItemProps) {
    const getIcon = () => {
        switch (variant) {
            case "destructive":
                return <AlertTriangle className="w-5 h-5" />;
            case "warning":
                return <Shield className="w-5 h-5" />;
            default:
                return <Activity className="w-5 h-5" />;
        }
    };

    const getTextColor = () => {
        switch (variant) {
            case "destructive":
                return "text-destructive";
            case "warning":
                return "text-warning";
            default:
                return "text-success";
        }
    };

    return (
        <div className={cn(securityStatusItemVariants({ variant }), className)}>
            <div className={statusIndicatorVariants({ variant })} />

            <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <div className={cn("p-2 rounded-md bg-background/50", getTextColor())}>
                        {getIcon()}
                    </div>
                    <div className={cn("text-xs font-mono uppercase tracking-wider opacity-70", getTextColor())}>
                        {status}
                    </div>
                </div>

                <div className="space-y-1">
                    <div className={cn("text-3xl font-bold tabular-nums", getTextColor())}>
                        {value}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground leading-tight">
                        {title}
                    </div>
                </div>

                <div className="pt-2 border-t border-current/10">
                    <div className="flex items-center gap-1 text-xs">
                        <TrendingUp className="w-3 h-3 opacity-50" />
                        <span className="opacity-70">Monitoring aktywny</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface SecurityStatusProps {
    statuses: SecurityStatusType[];
}

export default function SecurityStatus({ statuses }: SecurityStatusProps) {
    const getOverallStatus = () => {
        const hasDestructive = statuses.some(s => s.variant === "destructive");
        const hasWarning = statuses.some(s => s.variant === "warning");

        if (hasDestructive) return { label: "ALERT", variant: "outline-destructive" as const };
        if (hasWarning) return { label: "OSTRZEŻENIE", variant: "outline-warning" as const };
        return { label: "OPERACYJNY", variant: "outline-success" as const };
    };

    const overallStatus = getOverallStatus();

    return (
        <DashboardCard
            title="STATUS BEZPIECZEŃSTWA"
            intent={overallStatus.variant.replace("outline-", "") as "success" | "warning" | "destructive"}
            addon={
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <Badge variant={overallStatus.variant}>{overallStatus.label}</Badge>
                </div>
            }
        >
            <div className="px-4 py-4">
                <div className="grid grid-cols-1  gap-4">
                    {statuses.map((item, index) => (
                        <SecurityStatusItem
                            key={index}
                            title={item.title}
                            value={item.value}
                            status={item.status}
                            variant={item.variant}
                        />
                    ))}
                </div>
            </div>
        </DashboardCard>
    );
}