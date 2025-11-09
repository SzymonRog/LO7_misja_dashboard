"use client";

import { useState } from "react";
import DashboardCard from "@/components/dashboard/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "lucide-react";

interface SectionLoginProps {
    sectionId: string;
    label: string;
    onUnlock: () => void;
}

export default function SectionLogin({ sectionId, label, onUnlock }: SectionLoginProps) {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/unlock-section", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sectionId, password }),
            });

            const data = await res.json();

            if (data.success) {
                onUnlock();
                toast({ title: "Unlocked!", description: `Access to "${label}" granted.` });
            } else {
                toast({ title: "Error", description: data.message });
            }
        } catch (err) {
            toast({ title: "Error", description: "Something went wrong." });
        } finally {
            setLoading(false);
            setPassword("");
        }
    };

    return (
        <Card className="max-w-md mx-auto mt-16 shadow-lg">
            <CardHeader className="flex items-center justify-between pl-4 pr-2">
                <CardTitle className="text-sm font-medium uppercase flex items-center gap-2">
                    <Badge variant="outline-success">LOCKED</Badge>
                    {label}
                </CardTitle>
            </CardHeader>

            <CardContent className="bg-accent p-4">
                <p className="text-xs text-muted-foreground mb-4">
                    Enter the password to unlock this section.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-background"
                    />

                    <Button type="submit" className="w-full" variant="default">
                        Unlock
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}