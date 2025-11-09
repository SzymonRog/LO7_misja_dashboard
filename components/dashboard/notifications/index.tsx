"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bullet } from "@/components/ui/bullet";
import NotificationItem from "./notification-item";
import type { Notification } from "@/types/dashboard";
import { AnimatePresence, motion } from "framer-motion";

interface NotificationsProps {
    initialNotifications: Notification[];
}

export default function Notifications({ initialNotifications }: NotificationsProps) {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const [showAll, setShowAll] = useState(false);

    const unreadCount = notifications.filter((n) => !n.read).length;
    const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

    const toggleReadStatus = (id: string) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, read: !notif.read } : notif
            )
        );
    };

    const deleteNotification = (id: string) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex items-center justify-between pl-3 pr-1">
                <CardTitle className="flex items-center gap-2.5 text-sm font-medium uppercase">
                    {unreadCount > 0 ? <Badge>{unreadCount}</Badge> : <Bullet />}
                    Notifications
                </CardTitle>
            </CardHeader>

            <CardContent className="bg-accent p-1.5">
                <div
                    className={`space-y-2 transition-all duration-300 ${
                        showAll ? "max-h-155 overflow-y-auto" : "overflow-hidden"
                    }`}
                    style={{
                        scrollbarWidth: "none", // Firefox
                        msOverflowStyle: "none", // IE/Edge
                    }}
                >
                    <style jsx>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>

                    <AnimatePresence initial={false} mode="popLayout">
                        {displayedNotifications.map((notification) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                key={notification.id}
                            >
                                <NotificationItem
                                    notification={notification}
                                    onToggleRead={toggleReadStatus}
                                    onDelete={deleteNotification}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {notifications.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-sm text-muted-foreground">
                                No notifications
                            </p>
                        </div>
                    )}
                </div>

                {notifications.length > 3 && (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full mt-2"
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAll(!showAll)}
                            className="w-full"
                        >
                            {showAll ? "Show Less" : `Show All (${notifications.length})`}
                        </Button>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    );
}
