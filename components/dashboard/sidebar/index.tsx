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
import { useIsV0 } from "@/lib/v0-context";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"; // <--- KLUCZOWA LINIA

import AtomIcon from "@/components/icons/atom";
import BracketsIcon from "@/components/icons/brackets";
import CuteRobotIcon from "@/components/icons/cute-robot";
import EmailIcon from "@/components/icons/email";
import GearIcon from "@/components/icons/gear";
import MonkeyIcon from "@/components/icons/monkey";

const data = {
    navMain: [
        {
            title: "Tools",
            items: [
                { title: "Dashboard", url: "/", icon: BracketsIcon },
                { title: "Dane", url: "/dane", icon: AtomIcon },
                { title: "Zabezpieczenia", url: "/zabezpieczenia", icon: CuteRobotIcon },
                { title: "Poczta", url: "/poczta", icon: EmailIcon },
                { title: "Admin Settings", url: "/admin", icon: GearIcon, locked: true },
            ],
        },
    ],
    user: {
        name: "ADMIN_USER",
        email: "truecomp@gsaasd.pl",
        avatar: "/avatars/user_krimson.png",
    },
};

export function DashboardSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
    const isV0 = useIsV0();
    const pathname = usePathname(); // <-- aktualny URL (np. "/poczta")

    return (
        <Sidebar {...props} className={cn("py-sides", className)}>
            {/* HEADER */}
            <SidebarHeader className="rounded-t-lg flex gap-3 flex-row rounded-b-none">
                <div className="flex size-11  shrink-0 items-center justify-center rounded bg-sidebar-primary-foreground/10 text-sidebar-primary-foreground">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 300 437"
                        className="w-full h-full"
                    >
                        <g transform="translate(0,437) scale(0.1,-0.1)" fill="currentColor" stroke="none">
                            <path d="M1266 3815 c-57 -20 -87 -45 -121 -100 l-30 -49 0 -176 c0 -130 3
-181 13 -193 10 -12 13 -69 11 -246 -1 -127 -5 -231 -9 -231 -6 0 -12 39 -25
185 -1 11 -5 52 -9 90 -14 144 -15 189 -5 206 14 28 -6 286 -27 338 -23 57
-92 116 -155 131 -159 38 -309 -68 -309 -220 0 -52 86 -1084 94 -1131 l5 -27
-64 6 c-55 4 -66 2 -71 -13 -4 -10 23 -374 60 -809 72 -846 75 -874 136 -970
71 -111 173 -191 295 -229 68 -21 84 -22 490 -22 406 0 422 1 490 22 165 52
295 181 346 343 20 63 20 87 20 908 -1 811 -1 844 -20 880 -69 133 -250 168
-358 69 l-23 -20 0 39 c-1 86 -76 179 -166 204 -60 17 -154 8 -199 -20 l-35
-22 0 444 0 443 -24 50 c-28 60 -56 87 -116 114 -53 24 -136 27 -194 6z m161
-60 c50 -21 72 -42 94 -90 17 -37 19 -75 19 -513 0 -361 -3 -479 -12 -495 -17
-30 -24 -666 -8 -740 23 -108 101 -175 213 -184 89 -7 143 10 196 64 l45 44
25 -32 c70 -90 236 -104 318 -27 13 12 24 20 25 17 2 -2 1 -236 -2 -519 -5
-505 -5 -516 -27 -570 -46 -113 -153 -220 -260 -260 -78 -30 -159 -39 -334
-40 l-146 0 -6 143 c-14 355 -154 603 -418 742 -53 28 -69 41 -69 58 0 12 -7
87 -15 166 -8 79 -19 214 -25 300 -13 182 -29 259 -72 350 -34 72 -123 168
-176 190 -37 15 -30 -34 -77 526 -19 226 -40 467 -46 538 -13 145 -9 177 26
224 32 40 57 55 115 64 81 13 160 -24 195 -91 10 -20 29 -193 60 -562 25 -293
48 -539 50 -546 3 -7 15 -12 27 -10 l23 3 5 570 c4 504 7 573 21 600 45 82
148 117 236 80z m393 -1015 c41 -11 94 -61 109 -103 15 -39 15 -696 0 -734
-14 -38 -57 -83 -96 -99 -74 -32 -180 -5 -224 57 l-24 34 0 375 c0 372 0 375
22 406 44 61 131 87 213 64z m441 -193 c18 -12 44 -38 57 -57 23 -34 23 -36
20 -315 l-3 -282 -27 -35 c-77 -101 -236 -81 -289 36 -17 36 -19 68 -19 290 0
233 1 253 21 293 42 86 163 122 240 70z m-251 -7 c0 -17 -12 -40 -21 -40 -5 0
-9 13 -9 30 0 22 4 28 15 24 8 -4 15 -10 15 -14z m-1254 -236 c103 -49 173
-156 199 -302 12 -61 66 -652 65 -699 0 -7 40 -33 89 -58 108 -56 203 -140
266 -235 86 -129 123 -262 132 -473 l6 -129 -194 5 c-200 5 -245 13 -339 62
-90 46 -187 173 -213 277 -9 35 -28 202 -42 373 -46 558 -95 1119 -101 1169
l-6 49 43 -7 c24 -4 67 -18 95 -32z m1611 -490 c-2 -3 -11 -2 -20 2 -15 5 -15
8 1 32 l17 26 3 -28 c2 -15 2 -30 -1 -32z"/>
                        </g>
                    </svg>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="text-2xl font-display">TrueComp</span>
                    <span className="text-xs uppercase">The voice of democracy</span>
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
                                                isV0 && "pointer-events-none"
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
