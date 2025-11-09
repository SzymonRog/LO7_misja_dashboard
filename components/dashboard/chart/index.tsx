"use client";

import * as React from "react";
import { XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import mockDataJson from "@/mock.json";
import { Bullet } from "@/components/ui/bullet";
import type { MockData, TimePeriod } from "@/types/dashboard";

const mockData = mockDataJson as MockData;

type ChartDataPoint = {
    date: string;
    illegalProfit: number;
    bribes: number;
    tenderOverpay: number;
    euFunds?: number;
    operations?: number;
    label?: string;
    note?: string;
};

const chartConfig = {
    illegalProfit: {
        label: "Nielegalny Zysk",
        color: "hsl(var(--chart-1))", // zielony
    },
    bribes: {
        label: "Łapówki",
        color: "hsl(var(--chart-2))", // czerwony
    },
    tenderOverpay: {
        label: "Nadpłaty Przetargowe",
        color: "hsl(var(--chart-3))", // niebieski
    },
    euFunds: {
        label: "Fundusze UE",
        color: "hsl(var(--chart-4))", // złoty
    },
} satisfies ChartConfig;

export default function DashboardChart() {
    const [activeTab, setActiveTab] = React.useState<TimePeriod>("week");

    const handleTabChange = (value: string) => {
        if (value === "week" || value === "month" || value === "year") {
            setActiveTab(value as TimePeriod);
        }
    };

    const formatYAxisValue = (value: number) => {
        if (value === 0) {
            return "";
        }

        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(0)}K`;
        }
        return value.toString();
    };

    const renderChart = (data: ChartDataPoint[], period: TimePeriod) => {
        // Determine which fields to show based on period
        const showEuFunds = period === "month" || period === "year";

        return (
            <div className="bg-accent rounded-lg p-3">
                <ChartContainer className="md:aspect-[3/1] w-full" config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: -12,
                            right: 12,
                            top: 12,
                            bottom: 12,
                        }}
                    >
                        <defs>
                            <linearGradient id="fillIllegalProfit" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="hsl(var(--chart-1))"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="hsl(var(--chart-1))"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillBribes" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="hsl(var(--chart-2))"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="hsl(var(--chart-2))"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillTenderOverpay" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="hsl(var(--chart-3))"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="hsl(var(--chart-3))"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillEuFunds" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="hsl(var(--chart-4))"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="hsl(var(--chart-4))"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            horizontal={false}
                            strokeDasharray="8 8"
                            strokeWidth={2}
                            stroke="var(--muted-foreground)"
                            opacity={0.3}
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={12}
                            strokeWidth={1.5}
                            className="uppercase text-sm fill-muted-foreground"
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={0}
                            tickCount={6}
                            className="text-sm fill-muted-foreground"
                            tickFormatter={formatYAxisValue}
                            domain={[0, "dataMax"]}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="dot"
                                    className="min-w-[200px] px-4 py-3"
                                />
                            }
                        />
                        <Area
                            dataKey="illegalProfit"
                            type="linear"
                            fill="url(#fillIllegalProfit)"
                            fillOpacity={0.4}
                            stroke="hsl(var(--chart-1))"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                        />
                        <Area
                            dataKey="bribes"
                            type="linear"
                            fill="url(#fillBribes)"
                            fillOpacity={0.4}
                            stroke="hsl(var(--chart-2))"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                        />
                        <Area
                            dataKey="tenderOverpay"
                            type="linear"
                            fill="url(#fillTenderOverpay)"
                            fillOpacity={0.4}
                            stroke="hsl(var(--chart-3))"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                        />
                        {showEuFunds && (
                            <Area
                                dataKey="euFunds"
                                type="linear"
                                fill="url(#fillEuFunds)"
                                fillOpacity={0.4}
                                stroke="hsl(var(--chart-4))"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4 }}
                            />
                        )}
                    </AreaChart>
                </ChartContainer>
            </div>
        );
    };

    return (
        <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="max-md:gap-4"
        >
            <div className="flex items-center justify-between mb-4 max-md:contents">
                <TabsList className="max-md:w-full">
                    <TabsTrigger value="week">TYDZIEŃ</TabsTrigger>
                    <TabsTrigger value="month">MIESIĄC</TabsTrigger>
                    <TabsTrigger value="year">ROK</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-6 max-md:order-1">
                    {Object.entries(chartConfig)
                        .filter(([key]) => {
                            // Hide EU Funds legend in week view
                            if (activeTab === "week" && key === "euFunds") return false;
                            return true;
                        })
                        .map(([key, value]) => (
                            <ChartLegend key={key} label={value.label} color={value.color} />
                        ))}
                </div>
            </div>
            <TabsContent value="week" className="space-y-4">
                {renderChart(mockData.chartData.week, "week")}
            </TabsContent>
            <TabsContent value="month" className="space-y-4">
                {renderChart(mockData.chartData.month, "month")}
            </TabsContent>
            <TabsContent value="year" className="space-y-4">
                {renderChart(mockData.chartData.year, "year")}
            </TabsContent>
        </Tabs>
    );
}

export const ChartLegend = ({
                                label,
                                color,
                            }: {
    label: string;
    color: string;
}) => {
    return (
        <div className="flex items-center gap-2 uppercase">
            <Bullet style={{ backgroundColor: color }} className="rotate-45" />
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </div>
    );
};