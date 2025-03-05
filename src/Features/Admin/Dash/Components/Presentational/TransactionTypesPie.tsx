import {TransactionType} from "@/Features/Admin/Dash/types/stats.ts";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart.tsx"

const chartConfig = {
    Transfer: {
        label: "Transfer",
        color: "hsl(var(--chart-1))",
    },
    Debt: {
        label: "Debt",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

interface TransactionTypesPieProps {
    data: TransactionType[];
}

export function TransactionTypesPie({data}:TransactionTypesPieProps) {
    const chartData = [{Transfer: data[1].count, Debt: data[0].count }]

    const totalVisitors = data[0].count+data[1].count

    return (
        <Card className="flex flex-col shadow-none">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-gray-700">Transaction Diversification Stats</CardTitle>
                <CardDescription>Last 6 Months</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px] mb-0"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={100}
                        outerRadius={200}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    Transactions
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="Transfer"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-Transfer)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="Debt"
                            fill="var(--color-Debt)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none text-gray-700">
                    Transaction Types Debt and Transfer
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing Distribution for last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
