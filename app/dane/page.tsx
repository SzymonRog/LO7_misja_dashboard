"use client"
import SectionLogin from "@/components/auth/SectionLogin";
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

type DataTab = "transakcjie" | "employess" | "kontrakty";

export default function Dane() {
    const [activeTab, setActiveTab] = useState<DataTab>("transakcjie");


    const handleTabChange = (value: string) => {
        if (["transakcjie", "employess", "kontrakty"].includes(value)) {
            setActiveTab(value as DataTab);
        }
    };


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
                            <TabsTrigger value="transakcjie">TRANSAKCJE</TabsTrigger>
                            <TabsTrigger value="employess">PRACOWNICY</TabsTrigger>
                            <TabsTrigger value="kontrakty">DOTACJE UE</TabsTrigger>
                        </TabsList>

                        <div className="flex items-center gap-3 max-md:order-1">
                            <Badge variant="outline" className="text-xs">
                                {activeTab === "transakcjie" && `ID tabeli: #${mockData.corptech_transactions[0]?.table_id} `}
                                {activeTab === "employess" && `ID tabeli: #${mockData.employees[0]?.table_id}`}
                                {activeTab === "kontrakty" && `ID tabeli: #${mockData.contracts[0]?.table_id}`}
                            </Badge>
                        </div>
                    </div>

                    {/* transakcjie */}
                    <TabsContent value="transakcjie" className="space-y-4">
                        <Card className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">ID</TableHead>
                                            <TableHead>OPIS TRANSAKCJI</TableHead>
                                            <TableHead>NADAWCA/ODBIORCA</TableHead>
                                            <TableHead>TYP</TableHead>
                                            <TableHead className="text-right">KWOTA</TableHead>
                                            <TableHead>KONTO ODBIORCY</TableHead>
                                            <TableHead>DATA</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockData.corptech_transactions.map((transaction) => {
                                            const isHighAmount = transaction.amount_zl > 1000000;

                                            return (
                                                <TableRow
                                                    key={transaction.id}
                                                    className={isHighAmount ? "bg-red-950/10" : ""}
                                                >
                                                    <TableCell className="font-mono text-xs">
                                                        #{transaction.id}
                                                    </TableCell>
                                                    <TableCell className="font-medium max-w-[250px]">
                                                        <div className="truncate" title={transaction.description}>
                                                            {transaction.description}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            Projekt #{transaction.project_id}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary" className="text-xs">
                                                            {transaction.recipient_name}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={transaction.transaction_type === "Przelew przychodzący" ? "outline" : "default"}
                                                            className="text-xs"
                                                        >
                                                            {transaction.transaction_type === "Przelew wychodzący" ? "Przelew przychodzący" : "Przelew wychodzący"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className={`font-mono text-sm font-bold ${isHighAmount ? "text-red-500" : ""}`}>
                                                            {transaction.amount_zl.toLocaleString()} PLN
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                                        {transaction.recipient_account}
                                                    </TableCell>
                                                    <TableCell className="text-xs text-muted-foreground">
                                                        {new Date(transaction.transaction_date).toLocaleDateString('pl-PL')}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
                    </TabsContent>

                    {/* PRACOWNICY */}
                    <TabsContent value="employess" className="space-y-4">
                        <Card className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">ID</TableHead>
                                            <TableHead>IMIĘ I NAZWISKO</TableHead>
                                            <TableHead>STANOWISKO</TableHead>
                                            <TableHead>DZIAŁ</TableHead>
                                            <TableHead className="text-right">WYNAGRODZENIE</TableHead>
                                            <TableHead>DATA ZATRUDNIENIA</TableHead>
                                            <TableHead>PRZYPISANY PROJEKT</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockData.employees.map((employee) => {
                                            const isHighSalary = employee.monthly_salary_zl > 15000;
                                            const isManagement = employee.position.toLowerCase().includes("manager") || 
                                                                 employee.position.toLowerCase().includes("director") ||
                                                                 employee.position.toLowerCase().includes("kierownik") ||
                                                                 employee.position.toLowerCase().includes("dyrektor");

                                            return (
                                                <TableRow
                                                    key={employee.employee_id}
                                                    className={isHighSalary ? "bg-amber-950/10" : ""}
                                                >
                                                    <TableCell className="font-mono text-xs">
                                                        #{employee.employee_id}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {employee.first_name} {employee.last_name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={isManagement ? "default" : "secondary"}
                                                            className="text-xs"
                                                        >
                                                            {employee.position}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="text-xs">
                                                            {employee.department}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className={`font-mono text-sm font-semibold ${isHighSalary ? "text-amber-500" : ""}`}>
                                                            {employee.monthly_salary_zl.toLocaleString()} PLN
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-xs text-muted-foreground">
                                                        {new Date(employee.hire_date).toLocaleDateString('pl-PL')}
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-xs font-mono">
                                                            {employee.project_assignment}
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
                    </TabsContent>

                    {/* KONTRAKTY */}
                    <TabsContent value="kontrakty" className="space-y-4">
                        <Card className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">ID</TableHead>
                                            <TableHead>KONTRAHENT</TableHead>
                                            <TableHead>OPIS USŁUGI</TableHead>
                                            <TableHead className="text-right">WARTOŚĆ KONTRAKTU</TableHead>
                                            <TableHead className="text-right">ZAPŁACONO</TableHead>
                                            <TableHead className="text-right">POZOSTAŁO</TableHead>
                                            <TableHead>DATA KONTRAKTU</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockData.contracts.map((contract) => {
                                            const remaining = contract.contract_value_zl - contract.payment_completed_zl;
                                            const isHighValue = contract.contract_value_zl > 500000;
                                            const paymentProgress = (contract.payment_completed_zl / contract.contract_value_zl) * 100;

                                            return (
                                                <TableRow
                                                    key={contract.contract_id}
                                                    className={isHighValue ? "bg-blue-950/10" : ""}
                                                >
                                                    <TableCell className="font-mono text-xs">
                                                        #{contract.contract_id}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary" className="text-xs">
                                                            {contract.contractor_name}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="font-medium max-w-[250px]">
                                                        <div className="truncate" title={contract.service_description}>
                                                            {contract.service_description}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className={`font-mono text-sm font-bold ${isHighValue ? "text-blue-400" : ""}`}>
                                                            {contract.contract_value_zl.toLocaleString()} PLN
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className="font-mono text-sm text-green-500">
                                                            {contract.payment_completed_zl} PLN
                                                        </span>
                                                        <div className="text-xs text-muted-foreground">
                                                            {paymentProgress.toFixed(0)}%
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {remaining > 0 ? (
                                                            <span className="font-mono text-sm text-amber-500">
                                                                {remaining.toLocaleString()} PLN
                                                            </span>
                                                        ) : (
                                                            <Badge variant="default" className="text-xs">
                                                                OPŁACONY
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-xs text-muted-foreground">
                                                        {new Date(contract.contract_date).toLocaleString()}
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