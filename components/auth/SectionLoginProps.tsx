"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {AlertTriangleIcon, InfoIcon, LockIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";


interface SectionLoginProps {
    sectionId: string;
    label: string;
    onUnlock: () => void;
    description: string,
    placeholder: string,
    haveRules: boolean,
}

export default function SectionLogin({ sectionId, label, onUnlock,description,placeholder, haveRules  }: SectionLoginProps) {
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
                {haveRules &&
                (<Collapsible>
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
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-0.5">▸</span>
                                    <span>Dokładnie <strong className="text-foreground">8 znaków</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-0.5">▸</span>
                                    <span>Zaczyna się od <strong className="text-foreground">'DM'</strong> (Demoskratos)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-0.5">▸</span>
                                    <span>Zawiera 2 cyfry, które <strong className="text-foreground">sumują się do 7</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-0.5">▸</span>
                                    <span>Kończy się <strong className="text-foreground">małą samogłoską</strong> (a, e, i, o, u)</span>
                                </li>
                            </ul>
                            <p className="text-[10px] text-muted-foreground/60 mt-3 italic">
                                Przykład: DM43xxxa (gdzie xxx to dowolne znaki)
                            </p>
                        </div>
                    </CollapsibleContent>
                </Collapsible>)
                }


                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input
                        type="password"
                        placeholder={placeholder}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${error ? "outline outline-red-500 placeholder:text-red-500" : ""} bg-background`}
                    />
                    {error && (
                        <p className="text-red-500 text-xs text-center flex items-center justify-center gap-1">
                            <AlertTriangleIcon className="w-3 h-3" />
                            {error}
                        </p>
                    )}
                    <Button type="submit" className="w-full" variant="default">
                        Unlock
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}