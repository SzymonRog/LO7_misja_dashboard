"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    AlertTriangleIcon,
    InfoIcon,
    LockIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SectionLoginProps {
    sectionId: string;
    label: string;
    onUnlock: (password: string) => void;
    description: string;
    placeholder: string;
    haveRules: boolean;
}

export default function SectionLogin({
                                         sectionId,
                                         label,
                                         onUnlock,
                                         description,
                                         placeholder,
                                         haveRules,
                                     }: SectionLoginProps) {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ Automatyczne sprawdzenie hasła z localStorage
    useEffect(() => {
        const savedPassword = localStorage.getItem(`section_password_${sectionId}`);
        if (savedPassword) {
            // automatycznie spróbuj odblokować
            (async () => {
                try {
                    const res = await fetch("/api/unlock-section", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ sectionId, password: savedPassword }),
                    });
                    const data = await res.json();
                    if (data.success) {
                        onUnlock(savedPassword);
                    } else {
                        localStorage.removeItem(`section_password_${sectionId}`);
                    }
                } catch {
                    // pomiń błędy sieciowe
                }
            })();
        }
    }, [sectionId, onUnlock]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/unlock-section", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sectionId, password }),
            });

            const data = await res.json();

            if (data.success) {
                // ✅ Zapisz hasło lokalnie, by nie trzeba było ponownie wpisywać
                localStorage.setItem(`section_password_${sectionId}`, password);
                onUnlock(password);
                toast.success("Sekcja została odblokowana!");
            } else {
                setError("Wprowadź poprawny klucz dostępu!");
                toast.error("Dostęp odrzucony");
            }
        } catch {
            toast.error("Błąd połączenia z serwerem");
        } finally {
            setLoading(false);
            setPassword("");
        }
    };

    return (
        <Card className="max-w-md mx-auto shadow-lg">
            <CardHeader className="flex items-center justify-between pl-4 pr-2">
                <CardTitle className="text-sm font-medium uppercase flex items-center gap-2">
                    <Badge variant="destructive">
                        <LockIcon className="w-3 h-3" /> LOCKED
                    </Badge>
                    {label}
                </CardTitle>
            </CardHeader>

            <CardContent className="bg-accent p-4 space-y-4">
                <p className="text-xs text-muted-foreground">
                    {description}
                </p>

                {/* Collapsible Password Rules */}
                {haveRules && (
                    <Collapsible>
                        <CollapsibleTrigger className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                            <InfoIcon className="w-3 h-3" />
                            <span className="underline">Zasady tworzenia hasła</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3 p-3 bg-background/50 rounded border border-border">
                            <div className="space-y-2 text-xs">
                                <p className="font-semibold text-foreground mb-2">
                                    Zasady tworzenia hasła:
                                </p>
                                <ul className="space-y-1.5 text-muted-foreground">
                                    <li>Dokładnie 8 znaków</li>
                                    <li>Zaczyna się od „DM”</li>
                                    <li>Zawiera dwie cyfry, które sumują się do 7</li>
                                    <li>Kończy się małą samogłoską</li>
                                </ul>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input
                        type="password"
                        placeholder={placeholder}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        className={`${error ? "outline outline-red-500 placeholder:text-red-500" : ""} bg-background`}
                    />
                    {error && (
                        <p className="text-red-500 text-xs text-center flex items-center justify-center gap-1">
                            <AlertTriangleIcon className="w-3 h-3" />
                            {error}
                        </p>
                    )}
                    <Button
                        type="submit"
                        className="w-full"
                        variant="default"
                        disabled={loading}
                    >
                        {loading ? "Unlocking..." : "Unlock"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
