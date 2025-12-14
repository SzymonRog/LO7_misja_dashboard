"use client";

import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Bullet } from "@/components/ui/bullet";
import LockIcon from "@/components/icons/lock";
import Image from "next/image";

import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import AtomIcon from "@/components/icons/atom";
import BracketsIcon from "@/components/icons/brackets";
import CuteRobotIcon from "@/components/icons/cute-robot";
import EmailIcon from "@/components/icons/email";
import GearIcon from "@/components/icons/gear";
import { useEffect, useState } from "react";

const ADMIN_UNLOCKED_KEY = "admin_unlocked";


export function DashboardSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
    const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);

    useEffect(() => {
        const unlocked = localStorage.getItem(ADMIN_UNLOCKED_KEY) === "true";
        setIsAdminUnlocked(unlocked);
    }, []);


    const data = {
        navMain: [
            {
                title: "Tools",
                items: [
                    { title: "Dashboard", url: "/", icon: BracketsIcon },
                    { title: "Dane", url: "/dane", icon: AtomIcon },
                    { title: "Zabezpieczenia", url: "/zabezpieczenia", icon: CuteRobotIcon },
                    { title: "Poczta", url: "/poczta", icon: EmailIcon },
                    { title: "Tajne...", url: "/aiSystem/11", icon: GearIcon, locked: !isAdminUnlocked },
                ],
            },
        ],
        user: {
            name: "ADMIN_USER",
            email: "CORPTECH",
            avatar: "/avatars/user_krimson.png",
        },
    };


    const pathname = usePathname();

    return (
        <Sidebar {...props} className={cn("py-sides", className)}>
            {/* HEADER */}
            <SidebarHeader className="rounded-t-lg flex gap-3 flex-row rounded-b-none">
                <div className="flex size-11  shrink-0 items-center justify-center rounded bg-sidebar-primary-foreground/10 text-sidebar-primary-foreground">
                    <img src="/logo.svg" alt="logo" width={40} height={40} className="size-40"/>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="text-2xl font-display">CorpTech</span>
                    <span className="text-xs uppercase">Głos demokracji i technologi</span>
                </div>
            </SidebarHeader>

            {/* MENU */}
            <SidebarContent>
                {data.navMain.map((group, i) => (
                    <SidebarGroup key={group.title} className={cn(i === 0 && "rounded-t-none")}>
                        <SidebarGroupLabel>
                            <Bullet className="mr-2" />
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const isActive = pathname === item.url; // <-- aktywna zakładka
                                    return (
                                        <SidebarMenuItem
                                            key={item.title}
                                            className={cn(
                                                item.locked && "pointer-events-none opacity-50",
                                            )}
                                        >
                                            <SidebarMenuButton
                                                asChild={!item.locked}
                                                isActive={isActive}
                                                disabled={item.locked}
                                            >
                                                {item.locked ? (
                                                    <div className="flex items-center gap-3 w-full">
                                                        <item.icon className="size-5" />
                                                        <span>{item.title}</span>
                                                    </div>
                                                ) : (
                                                    <a href={item.url}>
                                                        <item.icon className="size-5" />
                                                        <span>{item.title}</span>
                                                    </a>
                                                )}
                                            </SidebarMenuButton>
                                            {item.locked && (
                                                <SidebarMenuBadge>
                                                    <LockIcon className="size-5 block" />
                                                </SidebarMenuBadge>
                                            )}
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter className="p-0">
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <Bullet className="mr-2" />
                        User
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <CardContent className="flex gap-0.5 w-full group cursor-pointer">
                                    <div className="shrink-0 flex size-14 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground overflow-clip">
                                        <Image
                                            src={data.user.avatar}
                                            alt={data.user.name}
                                            width={120}
                                            height={120}
                                        />
                                    </div>
                                    <div className="pl-3 pr-1.5 pt-2 pb-1.5 flex-1 flex bg-sidebar-accent hover:bg-sidebar-accent-active/75 items-center rounded">
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate text-xl font-display">{data.user.name}</span>
                                            <span className="truncate text-xs uppercase opacity-50">
                        {data.user.email}
                      </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    );
}
