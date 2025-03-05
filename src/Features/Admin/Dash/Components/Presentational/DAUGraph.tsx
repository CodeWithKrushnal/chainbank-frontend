import {CartesianGrid, LabelList, Line, LineChart, XAxis} from "recharts"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card.tsx"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart.tsx"
import {DayData} from "@/Features/Admin/Dash/Components/Presentational/DAUGraphCard.tsx";

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    }
} satisfies ChartConfig

interface DAUGraphProps {
    data: DayData[]
}

export function DAUGraph({data}: DAUGraphProps) {
    const chartData = data

    return (
        <Card className="rounded-2xl shadow-none">
            <CardHeader>
                <CardTitle className="text-gray-700">Daily Active Users</CardTitle>
                <CardDescription>Last 5 Days</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line"/>}
                        />
                        <Line
                            dataKey="count"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-desktop)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none text-gray-700">Visualization for Platform usage
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing visitors for the last 5 Days
                </div>
            </CardFooter>
        </Card>
    )
}
