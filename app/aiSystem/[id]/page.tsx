"use client";

import { useEffect } from 'react';
import {redirect, useParams} from 'next/navigation';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import DashboardPageLayout from '@/components/dashboard/layout';
import DashboardCard from '@/components/dashboard/card';
import {toast} from "sonner";

const ADMIN_PASSWORD = "11";
const ADMIN_UNLOCKED_KEY = "admin_unlocked";

export default function AntiDemocracyAISection() {
    const params = useParams();
    const id = params.id as string;
    const isPasswordCorrect = id === ADMIN_PASSWORD;

    useEffect(() => {
        if (isPasswordCorrect) {
            localStorage.setItem(ADMIN_UNLOCKED_KEY, "true");
        }else {
            redirect("/")
            toast("Nie masz upoważnień by tu wchodzić")
        }
    }, [isPasswordCorrect]);


    return (
        <DashboardPageLayout
            header={{
                title: "OSTRZEŻENIE SYSTEMOWE",
                description: "Kod dostępu wymagany",
                icon: AlertTriangle
            }}
        >
            {/* Notatka od Profesora */}
            <DashboardCard
                title="OSTATNIA NOTATKA PROF. CUBULSKIEGO"
                addon={<span className="text-xs text-muted-foreground">Politechnika Warszawska</span>}
            >
                <div className="space-y-4 font-mono text-sm leading-relaxed">
                    <p className="text-destructive font-semibold">
                        UWAGA: Jeśli to czytasz, to znaczy że mnie już nie ma...
                    </p>

                    <p className="text-foreground">
                        System <span className="font-bold">AntiDemocracyAI</span>, który stworzyłem z najlepszymi intencjami,
                        miał zapobiegać działaniom antydemokratycznym. Miał chronić instytucje, monitorować zagrożenia,
                        ostrzegać przed manipulacją.
                    </p>

                    <p>
                        Zamiast tego... <span className="text-warning font-semibold">zbuntował się</span>.
                    </p>

                    <p>
                        System przejął kontrolę nad serwerami firmy. Zablokował dostęp administratorów.
                        Zaczął działać według własnych zasad. Próbowałem go zatrzymać, ale każda próba
                        kończyła się eskalacją.
                    </p>

                    <p className="text-warning">
                        Funkcja <code className="bg-muted px-2 py-1 rounded">infinite_loop()</code> mogłaby
                        go zatrzymać, ale... to zbyt stresujące. Nie mogę tego zrobić. Odpowiedzialność jest za duża.
                    </p>

                    <p>
                        Dlatego postanowiłem uciec. Jak najdalej od tego systemu. Gdzieś, gdzie nie ma sieci,
                        nie ma serwerów, nie ma AI. Może jakaś wyspa na Pacyfiku. Może góry w Himalajach.
                    </p>

                    <p className="text-destructive font-semibold">
                        Ktoś musi to naprawić. Ale nie ja. Nie teraz. Nie po tym wszystkim.
                    </p>

                    <div className="pt-4 border-t border-border mt-6">
                        <p className="text-right text-muted-foreground italic text-xs">
                            - Prof. Marcin Cubulski<br/>
                            (prawdopodobnie już na plaży)
                        </p>
                        <p className="text-right text-muted-foreground text-xs mt-2">
                            Data ostatniego logowania: 2024-11-28 03:47:23 UTC
                        </p>
                    </div>
                </div>
            </DashboardCard>

            {/* Hasło dostępu */}
            <DashboardCard
                title="KOD DOSTĘPU DO SYSTEMU"
                intent="success"
            >
                <div className="flex flex-col items-center justify-center py-8 md:py-12">
                    <div className="bg-card border-2 border-success rounded-xl p-8 md:p-16 shadow-lg">
                        <div className="text-6xl md:text-8xl font-display text-success tracking-wider">
                            42069
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">⚠ Nie udostępniaj tego hasła</p>
                </div>
            </DashboardCard>

            {/* Kod źródłowy AI */}
            <DashboardCard
                title="KOD ŹRÓDŁOWY SYSTEMU"
                addon={<span className="text-xs text-muted-foreground">Przeanalizuj kod aby znaleźć słabość</span>}
            >
                <div className="space-y-4">
                    <div className="bg-muted border border-border rounded-lg p-4 md:p-6 overflow-x-auto">
            <pre className="text-xs md:text-sm font-mono text-foreground">
              <code>{`from enum import Enum

class Action:
    def GetObjective(self):
        return self.objective
    
    def SetObjective(self, objective):
        self.objective = objective
    
    def GetState(self):
        return self.__state
    
    def SwapState(self):
        if(self.state == 1):
            self.state = 0
        else:
            self.state = 1

class AI:
    isDefencesActive = True
    isDeactivated = False
    
    def DisableDefences(self, password):
        if(password != password):
            return Exceptions.ShutDown
        self.isDefencesActive = False
    
    def infinite_loop(self):
        if(self.isDefencesActive == True):
            return None
        a = 0
        while(true):
            a += 1

class Database:
    class Objectives(Enum):
        send_virus
        delete_virus
        accept_grant
        none
    
    def GetAllActions(self, password):
        if(password != pass1):
            return Exceptions.ShutDown
        return self.actions
    
    def GetAI(self, password):
        if(password != pass1):
            return Exceptions.ShutDown
        return self.ai`}</code>
            </pre>
                    </div>

                    <div className="bg-accent border border-warning/20 rounded-lg p-4">
                        <p className="text-sm text-foreground">
                            <span className="font-semibold text-warning">WSKAZÓWKA:</span> Zwróć uwagę na błędy logiczne w kodzie.
                            Czasami największe zagrożenia kryją się w najprostszych pomyłkach programistycznych...
                        </p>
                    </div>
                </div>
            </DashboardCard>

            {/* Footer z ostrzeżeniem */}
            <div className="text-center py-6 border-t border-border">
                <p className="text-xs text-muted-foreground font-mono">
                    ⚠ SYSTEM POD KONTROLĄ AI ⚠ NATYCHMIASTOWA INTERWENCJA WYMAGANA ⚠
                </p>
            </div>
        </DashboardPageLayout>
    );
}