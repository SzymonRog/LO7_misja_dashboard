"use client";

import { Badge } from "@/components/ui/badge";
import DashboardCard from "@/components/dashboard/card";
import type { SecurityStatus as SecurityStatusType } from "@/types/dashboard";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Bullet } from "@/components/ui/bullet";

const securityStatusItemVariants = cva(
    "border rounded-md shadow-sm hover:shadow-md transition-shadow duration-200",
    {
        variants: {
            variant: {
                success: "border-success bg-success/10 text-success",
                warning: "border-warning bg-warning/10 text-warning",
                destructive: "border-destructive bg-destructive/10 text-destructive",
            },
        },
        defaultVariants: {
            variant: "success",
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
    return (
        <div className={cn(securityStatusItemVariants({ variant }), className)}>
            <div className="flex items-center gap-2 py-1 px-3 border-b border-current">
                <Bullet size="sm" variant={variant} />
                <span className="text-sm font-semibold">{title}</span>
            </div>
            <div className="py-3 px-3 flex flex-col gap-1">
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-xs text-muted-foreground">{status}</div>
            </div>
        </div>
    );
}

interface SecurityStatusProps {
    statuses: SecurityStatusType[];
}

export default function SecurityStatus({ statuses }: SecurityStatusProps) {
    return (
        <DashboardCard
            title="SECURITY STATUS"
            intent="success"
            addon={<Badge variant="outline-success">ONLINE</Badge>}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 py-2">
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
        </DashboardCard>
    );
}
