"use client"
import SectionLogin from "@/components/auth/SectionLoginProps";
import { useState } from "react";
import { DatabaseIcon } from "lucide-react";
import DashboardPageLayout from "@/components/dashboard/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import mockDataJson from "@/mock.json";
import type { MockData } from "@/types/dashboard";



const mockData = mockDataJson as MockData;

type DataTab = "przetargi" | "firmy" | "dotacje";

export default function Dane() {
    const [unlocked, setUnlocked] = useState(false);
    const [activeTab, setActiveTab] = useState<DataTab>("przetargi");


    const handleTabChange = (value: string) => {
        if (["przetargi", "firmy", "dotacje"].includes(value)) {
            setActiveTab(value as DataTab);
        }
    };



    if (!unlocked) {
        return (
            <DashboardPageLayout header={{ title: "Login", icon: DatabaseIcon }}>
                <div className="flex justify-center bg-background/50 backdrop-blur-xl py-8">
                    <SectionLogin
                        sectionId="dane"
                        label="Baza danych"
                        onUnlock={() => setUnlocked(true)}
                        description="Musisz znać nasze przedziwne hasło by tu wejść"
                        placeholder="Wpisz hasło"
                        haveRules={true}
                    />
                </div>
            </DashboardPageLayout>
        );
    }

    return (
        <DashboardPageLayout header={{ title: "Baza Danych", icon: DatabaseIcon }}>
            <div className="space-y-6">
                <Tabs
                    value={activeTab}
                    onValueChange={handleTabChange}
                    className="max-md:gap-4"
                >
                    <div className="flex items-center justify-between mb-4 max-md:contents">


                        <TabsList className="max-md:w-full">
                            <TabsTrigger value="przetargi">PRZETARGI</TabsTrigger>
                            <TabsTrigger value="firmy">FIRMY</TabsTrigger>
                            <TabsTrigger value="dotacje">DOTACJE UE</TabsTrigger>
                        </TabsList>

                        <div className="flex items-center gap-3 max-md:order-1">
                            <Badge variant="outline" className="text-xs">
                                {activeTab === "przetargi" && `ID tabeli: #${mockData.tenders[0].table_id} `}
                                {activeTab === "firmy" && `ID tabeli: #${mockData.companies[0].table_id}`}
                                {activeTab === "dotacje" && `ID tabeli: #${mockData.grants[0].table_id}`}
                            </Badge>
                        </div>
                    </div>

                    {/* PRZETARGI */}
                    <TabsContent value="przetargi" className="space-y-4">
                        <Card className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">ID</TableHead>
                                            <TableHead>NAZWA PRZETARGU</TableHead>
                                            <TableHead>FIRMA</TableHead>
                                            <TableHead className="text-right">NAJNIŻSZA OFERTA</TableHead>
                                            <TableHead className="text-right">WYGRANA OFERTA</TableHead>
                                            <TableHead className="text-right">NADPŁATA</TableHead>
                                            <TableHead>DATA</TableHead>
                                            <TableHead>STATUS</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockData.tenders.map((tender) => {
                                            const overpay = tender.winning_bid - tender.lowest_bid;
                                            const isInnoTech = tender.winner === "InnoTech Solutions";

                                            return (
                                                <TableRow
                                                    key={tender.id}
                                                    className={isInnoTech ? "bg-red-950/10" : ""}
                                                >
                                                    <TableCell className="font-mono text-xs">
                                                        #{tender.id}
                                                    </TableCell>
                                                    <TableCell className="font-medium max-w-[200px] truncate">
                                                        {tender.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={isInnoTech ? "destructive" : "secondary"}
                                                            className="text-xs"
                                                        >
                                                            {tender.winner}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right font-mono text-sm">
                                                        {tender.lowest_bid.toLocaleString()} DM
                                                    </TableCell>
                                                    <TableCell className="text-right font-mono text-sm font-semibold">
                                                        {tender.winning_bid.toLocaleString()} DM
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {overpay > 0 ? (
                                                            <span className="text-red-500 font-mono text-sm font-bold">
                                                                +{overpay.toLocaleString()} DM
                                                            </span>
                                                        ) : (
                                                            <span className="text-green-500 font-mono text-sm">
                                                                0 DM
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-xs text-muted-foreground">
                                                        {new Date(tender.date).toLocaleDateString('pl-PL')}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={tender.status === "completed" ? "default" : "outline"}
                                                            className="text-xs"
                                                        >
                                                            {tender.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
                    </TabsContent>

                    {/* FIRMY */}
                    <TabsContent value="firmy" className="space-y-4">
                        <Card className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">ID</TableHead>
                                            <TableHead>NAZWA FIRMY</TableHead>
                                            <TableHead>OCENA BIP</TableHead>
                                            <TableHead>OCENA LOKALNA</TableHead>
                                            <TableHead>OPINIE</TableHead>
                                            <TableHead>WYGRANE PRZETARGI</TableHead>
                                            <TableHead>SUMA KONTRAKTÓW</TableHead>
                                            <TableHead>STATUS</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockData.companies.map((company) => {
                                            const ratingDiff = company.local_rating - company.bip_rating;
                                            const isSuspicious = ratingDiff > 2;

                                            return (
                                                <TableRow
                                                    key={company.id}
                                                    className={isSuspicious ? "bg-red-950/10" : ""}
                                                >
                                                    <TableCell className="font-mono text-xs">
                                                        #{company.id}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {company.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-yellow-500">★</span>
                                                            <span className="font-mono">{company.bip_rating}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-yellow-500">★</span>
                                                            <span className="font-mono font-semibold">{company.local_rating}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-sm">
                                                        {company.reviews_count.toLocaleString()}
                                                    </TableCell>
                                                    <TableCell className="font-mono text-sm">
                                                        {company.tenders_won}
                                                    </TableCell>
                                                    <TableCell className="font-mono text-sm font-semibold">
                                                        {company.total_value.toLocaleString()} DM
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={company.status === "WYSOKIE RYZYKO" ? "destructive" : "default"}
                                                            className="text-xs"
                                                        >
                                                            {company.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
                    </TabsContent>

                    {/* DOTACJE UE */}
                    <TabsContent value="dotacje" className="space-y-4">
                        <Card className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">ID</TableHead>
                                            <TableHead>NAZWA PROJEKTU</TableHead>
                                            <TableHead>WYKONAWCA</TableHead>
                                            <TableHead>PODPISUJĄCY</TableHead>
                                            <TableHead className="text-right">WARTOŚĆ</TableHead>
                                            <TableHead>DATA PODPISANIA</TableHead>
                                            <TableHead>REALIZACJA</TableHead>
                                            <TableHead>STATUS</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockData.grants.map((grant) => {
                                            const isAISigned = grant.signed_by === "AntiDemocracyAI";

                                            return (
                                                <TableRow
                                                    key={grant.id}
                                                    className={isAISigned ? "bg-red-950/10" : ""}
                                                >
                                                    <TableCell className="font-mono text-xs">
                                                        #{grant.id}
                                                    </TableCell>
                                                    <TableCell className="font-medium max-w-[250px]">
                                                        {grant.project_name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary" className="text-xs">
                                                            {grant.contractor}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={isAISigned ? "destructive" : "outline"}
                                                            className="text-xs font-mono"
                                                        >
                                                            {grant.signed_by}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right font-mono text-sm font-bold">
                                                        {grant.value.toLocaleString()} EUR
                                                    </TableCell>
                                                    <TableCell className="text-xs text-muted-foreground">
                                                        {new Date(grant.signed_date).toLocaleDateString('pl-PL')}
                                                    </TableCell>
                                                    <TableCell className="text-xs">
                                                        {grant.duration_years} {grant.duration_years === 1 ? 'rok' : 'lata'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={grant.status === "ZATWIERDZONY" ? "default" : "outline"}
                                                            className="text-xs"
                                                        >
                                                            {grant.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardPageLayout>
    );
}