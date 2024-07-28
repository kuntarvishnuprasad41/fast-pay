'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-04-01', success: 222, failure: 150 },
  { date: '2024-04-02', success: 97, failure: 180 },
  { date: '2024-04-03', success: 167, failure: 120 },
  { date: '2024-04-04', success: 242, failure: 260 },
  { date: '2024-04-05', success: 373, failure: 290 },
  { date: '2024-04-06', success: 301, failure: 340 },
  { date: '2024-04-07', success: 245, failure: 180 },
  { date: '2024-04-08', success: 409, failure: 320 },
  { date: '2024-04-09', success: 59, failure: 110 },
  { date: '2024-04-10', success: 261, failure: 190 },
  { date: '2024-04-11', success: 327, failure: 350 },
  { date: '2024-04-12', success: 292, failure: 210 },
  { date: '2024-04-13', success: 342, failure: 380 },
  { date: '2024-04-14', success: 137, failure: 220 },
  { date: '2024-04-15', success: 120, failure: 170 },
  { date: '2024-04-16', success: 138, failure: 190 },
  { date: '2024-04-17', success: 446, failure: 360 },
  { date: '2024-04-18', success: 364, failure: 410 },
  { date: '2024-04-19', success: 243, failure: 180 },
  { date: '2024-04-20', success: 89, failure: 150 },
  { date: '2024-04-21', success: 137, failure: 200 },
  { date: '2024-04-22', success: 224, failure: 170 },
  { date: '2024-04-23', success: 138, failure: 230 },
  { date: '2024-04-24', success: 387, failure: 290 },
  { date: '2024-04-25', success: 215, failure: 250 },
  { date: '2024-04-26', success: 75, failure: 130 },
  { date: '2024-04-27', success: 383, failure: 420 },
  { date: '2024-04-28', success: 122, failure: 180 },
  { date: '2024-04-29', success: 315, failure: 240 },
  { date: '2024-04-30', success: 454, failure: 380 },
  { date: '2024-05-01', success: 165, failure: 220 },
  { date: '2024-05-02', success: 293, failure: 310 },
  { date: '2024-05-03', success: 247, failure: 190 },
  { date: '2024-05-04', success: 385, failure: 420 },
  { date: '2024-05-05', success: 481, failure: 390 },
  { date: '2024-05-06', success: 498, failure: 520 },
  { date: '2024-05-07', success: 388, failure: 300 },
  { date: '2024-05-08', success: 149, failure: 210 },
  { date: '2024-05-09', success: 227, failure: 180 },
  { date: '2024-05-10', success: 293, failure: 330 },
  { date: '2024-05-11', success: 335, failure: 270 },
  { date: '2024-05-12', success: 197, failure: 240 },
  { date: '2024-05-13', success: 197, failure: 160 },
  { date: '2024-05-14', success: 448, failure: 490 },
  { date: '2024-05-15', success: 473, failure: 380 },
  { date: '2024-05-16', success: 338, failure: 400 },
  { date: '2024-05-17', success: 499, failure: 420 },
  { date: '2024-05-18', success: 315, failure: 350 },
  { date: '2024-05-19', success: 235, failure: 180 },
  { date: '2024-05-20', success: 177, failure: 230 },
  { date: '2024-05-21', success: 82, failure: 140 },
  { date: '2024-05-22', success: 81, failure: 120 },
  { date: '2024-05-23', success: 252, failure: 290 },
  { date: '2024-05-24', success: 294, failure: 220 },
  { date: '2024-05-25', success: 201, failure: 250 },
  { date: '2024-05-26', success: 213, failure: 170 },
  { date: '2024-05-27', success: 420, failure: 460 },
  { date: '2024-05-28', success: 233, failure: 190 },
  { date: '2024-05-29', success: 78, failure: 130 },
  { date: '2024-05-30', success: 340, failure: 280 },
  { date: '2024-05-31', success: 178, failure: 230 },
  { date: '2024-06-01', success: 178, failure: 200 },
  { date: '2024-06-02', success: 470, failure: 410 },
  { date: '2024-06-03', success: 103, failure: 160 },
  { date: '2024-06-04', success: 439, failure: 380 },
  { date: '2024-06-05', success: 88, failure: 140 },
  { date: '2024-06-06', success: 294, failure: 250 },
  { date: '2024-06-07', success: 323, failure: 370 },
  { date: '2024-06-08', success: 385, failure: 320 },
  { date: '2024-06-09', success: 438, failure: 480 },
  { date: '2024-06-10', success: 155, failure: 200 },
  { date: '2024-06-11', success: 92, failure: 150 },
  { date: '2024-06-12', success: 492, failure: 420 },
  { date: '2024-06-13', success: 81, failure: 130 },
  { date: '2024-06-14', success: 426, failure: 380 },
  { date: '2024-06-15', success: 307, failure: 350 },
  { date: '2024-06-16', success: 371, failure: 310 },
  { date: '2024-06-17', success: 475, failure: 520 },
  { date: '2024-06-18', success: 107, failure: 170 },
  { date: '2024-06-19', success: 341, failure: 290 },
  { date: '2024-06-20', success: 408, failure: 450 },
  { date: '2024-06-21', success: 169, failure: 210 },
  { date: '2024-06-22', success: 317, failure: 270 },
  { date: '2024-06-23', success: 480, failure: 530 },
  { date: '2024-06-24', success: 132, failure: 180 },
  { date: '2024-06-25', success: 141, failure: 190 },
  { date: '2024-06-26', success: 434, failure: 380 },
  { date: '2024-06-27', success: 448, failure: 490 },
  { date: '2024-06-28', success: 149, failure: 200 },
  { date: '2024-06-29', success: 103, failure: 160 },
  { date: '2024-06-30', success: 446, failure: 400 }
];

const chartConfig = {
  views: {
    label: 'Payments'
  },
  success: {
    label: 'success',
    color: 'hsl(var(--chart-1))'
  },
  failure: {
    label: 'failure',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('success');

  const total = React.useMemo(
    () => ({
      success: chartData.reduce((acc, curr) => acc + curr.success, 0),
      failure: chartData.reduce((acc, curr) => acc + curr.failure, 0)
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Transaction hour- Interactive</CardTitle>
          {/* <CardDescription> */}
          {/* Showing total visitors for the last 3 months */}
          {/* </CardDescription> */}
        </div>
        <div className="flex">
          {['success', 'failure'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label.toUpperCase()}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
