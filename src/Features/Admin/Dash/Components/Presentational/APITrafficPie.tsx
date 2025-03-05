"use client"

import type { EndpointUsage } from "@/Features/Admin/Dash/types/stats.ts"
import * as React from "react"
import { Label, Pie, PieChart, Cell } from "recharts"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card.tsx"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart.tsx"

interface APITrafficPieProps {
  data: EndpointUsage[]
}

// Create a function to get a shortened endpoint name for display
const getShortEndpointName = (endpoint: string) => {
  // Extract the base path without query parameters
  const basePath = endpoint.split("?")[0]
  // Get the last part of the path
  const parts = basePath.split("/")
  return parts[parts.length - 1] || endpoint
}

// Define chart colors
const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
  "hsl(var(--chart-9))",
  "hsl(var(--chart-10))",
]

export function APITrafficPie({ data }: APITrafficPieProps) {
  // Generate dynamic chart config based on the data
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      count: {
        label: "Request Count",
      },
    }

    // Add endpoint configurations dynamically
    // Add null check to prevent error when data is undefined
    if (data && Array.isArray(data)) {
      data.forEach((item, index) => {
        const shortName = getShortEndpointName(item.endpoint)
        config[`endpoint-${index + 1}`] = {
          label: shortName,
          color: CHART_COLORS[index % CHART_COLORS.length],
        }
      })
    }

    return config
  }, [data])

  const totalRequests = React.useMemo(() => {
    // Add null check here too
    if (!data || !Array.isArray(data)) return 0
    return data.reduce((acc, curr) => acc + curr.count, 0)
  }, [data])

  return (
      <Card className="flex flex-col rounded-2xl shadow-none">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-gray-700">API Endpoint Usage</CardTitle>
          <CardDescription>Top {data && Array.isArray(data) ? data.length : 0} Most Used Endpoints</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                        hideLabel
                        formatter={(value, name, props) => {
                          // Display the full endpoint path in the tooltip
                          if (props.payload && props.payload.endpoint) {
                            return [value, props.payload.endpoint]
                          }
                          return [value, name]
                        }}
                    />
                  }
              />
              <Pie data={data || []} dataKey="count" nameKey="endpoint" innerRadius={60} strokeWidth={5}>
                {data &&
                    Array.isArray(data) &&
                    data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                              <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                {totalRequests.toLocaleString()}
                              </tspan>
                              <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                Requests
                              </tspan>
                            </text>
                        )
                      }
                    }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          {data && Array.isArray(data) && data.length > 0 && (
              <div className="flex items-center gap-2 font-medium leading-none text-gray-700">
                Top endpoint: {getShortEndpointName(data[0].endpoint)} ({Math.round((data[0].count / totalRequests) * 100)}
                %)
              </div>
          )}
          <div className="leading-none text-muted-foreground">
            Showing total requests across {data && Array.isArray(data) ? data.length : 0} endpoints
          </div>
        </CardFooter>
      </Card>
  )
}

