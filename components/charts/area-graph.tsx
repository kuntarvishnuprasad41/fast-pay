'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
const chartData = [
  { month: 'January', success: 186, failure: 80 },
  { month: 'February', success: 305, failure: 200 },
  { month: 'March', success: 237, failure: 120 },
  { month: 'April', success: 73, failure: 190 },
  { month: 'May', success: 209, failure: 130 },
  { month: 'June', success: 214, failure: 140 }
];

const chartConfig = {
  success: {
    label: 'success',
    color: 'hsl(var(--chart-1))'
  },
  failure: {
    label: 'failure',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Success To failure - Stacked</CardTitle>
        <CardDescription>
          {/* Showing total visitors for the last 6 months */}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[310px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="failure"
              type="natural"
              fill="var(--color-failure)"
              fillOpacity={0.4}
              stroke="var(--color-failure)"
              stackId="a"
            />
            <Area
              dataKey="success"
              type="natural"
              fill="var(--color-success)"
              fillOpacity={0.4}
              stroke="var(--color-success)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
