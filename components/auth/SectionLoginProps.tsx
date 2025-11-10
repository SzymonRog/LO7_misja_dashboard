"use client";

import { useState } from "react";
import DashboardCard from "@/components/dashboard/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {InboxIcon, LockIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge";


interface SectionLoginProps {
    sectionId: string;
    label: string;
    onUnlock: () => void;
    description: string,
    placeholder: string,
}

export default function SectionLogin({ sectionId, label, onUnlock,description,placeholder  }: SectionLoginProps) {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
                toast("The section has been unlocked. Now you can get the kittens photos");
                setError("")
            } else {
                toast(
                    <div className="space-y-2">
                        <h1 className="text-[#8e2f0b] font-bold">Dostęp odrzucony</h1>
                        <p>Wygląda na że nie masz dostępu do tej sekcji. Może spróbuj ponownie?</p>
                    </div>
                );
                setError("Wprowadz poprawny klucz dostepu!")
            }
        } catch (err) {
            toast("rr");
        } finally {
            setLoading(false);
            setPassword("");
        }
    };

    return (
        <Card className="max-w-md mx-auto mt-16 shadow-lg">
            <CardHeader className="flex items-center justify-between pl-4 pr-2">
                <CardTitle className="text-sm font-medium uppercase flex items-center gap-2">
                    <Badge variant="destructive"><LockIcon></LockIcon> LOCKED</Badge>
                    {label}
                </CardTitle>
            </CardHeader>

            <CardContent className="bg-accent p-4">
                <p className="text-xs text-muted-foreground mb-4">
                    {description}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input
                        type="password"
                        placeholder={placeholder}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${error ? "outline outline-red-500 placeholder:text-red-500" : ""} bg-background`}

                    />
                    {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
                    <Button type="submit" className="w-full" variant="default">
                        Unlock
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}