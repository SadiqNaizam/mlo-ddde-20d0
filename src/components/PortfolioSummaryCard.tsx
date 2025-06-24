import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

// Mock data for the sparkline chart. In a real app, this would come from props or an API.
const chartData = [
  { value: 4000 },
  { value: 3000 },
  { value: 2000 },
  { value: 2780 },
  { value: 1890 },
  { value: 2390 },
  { value: 3490 },
  { value: 3600 },
  { value: 4100 },
  { value: 4300 },
];

// Mock portfolio data
const portfolioData = {
  totalValue: 123456.78,
  dailyChange: {
    amount: 1234.56,
    percentage: 1.01,
  },
  totalChange: {
    amount: -245.1,
    percentage: -0.2,
  },
};

const PortfolioSummaryCard = () => {
  console.log('PortfolioSummaryCard loaded');

  const dailyIsGain = portfolioData.dailyChange.amount >= 0;
  const totalIsGain = portfolioData.totalChange.amount >= 0;

  // Helper to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <p className="text-sm text-foreground">{`${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card/40 backdrop-blur-sm border-border/20 shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-muted-foreground font-medium text-base">
          Portfolio Value
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        {/* Top section with values */}
        <div>
          <div className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
            {formatCurrency(portfolioData.totalValue)}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <div className={cn("flex items-center font-medium", dailyIsGain ? 'text-accent' : 'text-destructive')}>
              {dailyIsGain ? <TrendingUp className="h-4 w-4 mr-1.5" /> : <TrendingDown className="h-4 w-4 mr-1.5" />}
              <span>
                {formatCurrency(portfolioData.dailyChange.amount)} ({portfolioData.dailyChange.percentage.toFixed(2)}%)
                <span className="text-muted-foreground ml-1.5">Today</span>
              </span>
            </div>
            <div className={cn("flex items-center font-medium", totalIsGain ? 'text-accent' : 'text-destructive')}>
              {totalIsGain ? <TrendingUp className="h-4 w-4 mr-1.5" /> : <TrendingDown className="h-4 w-4 mr-1.5" />}
              <span>
                {formatCurrency(portfolioData.totalChange.amount)} ({portfolioData.totalChange.percentage.toFixed(2)}%)
                <span className="text-muted-foreground ml-1.5">All Time</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom section with sparkline */}
        <div className="h-24 -mx-6 -mb-6 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                cursor={{ stroke: 'hsl(var(--foreground))', strokeWidth: 1, strokeDasharray: '3 3' }}
                content={<CustomTooltip />}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--accent))"
                fillOpacity={1}
                fill="url(#chartGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummaryCard;