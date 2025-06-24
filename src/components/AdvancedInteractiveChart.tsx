import React, { useState, useMemo, useEffect } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Brush } from 'recharts';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LineChart as LineChartIcon, BarChart3, AreaChart as AreaChartIcon, Map } from 'lucide-react';

// --- Mock Data Generation ---
const generateData = (days: number) => {
  const data = [];
  let value = 500;
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    value += Math.random() * 20 - 10;
    value = Math.max(value, 400); // Keep value from dropping too low
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: parseFloat(value.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
  }
  return data;
};

const fullData = generateData(365);

// --- Type Definitions ---
type ChartType = 'line' | 'bar' | 'area' | 'heatmap';
type TimeRange = '7D' | '1M' | '6M' | '1Y';

interface AdvancedInteractiveChartProps {
  stockTicker?: string;
}

// --- Custom Tooltip Component ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg shadow-lg">
        <p className="label text-sm text-muted-foreground">{`${label}`}</p>
        <p className="intro text-lg font-bold text-foreground">{`$${payload[0].value}`}</p>
        <p className="desc text-xs text-accent">
          Volume: {(payload[0].payload.volume / 1000000).toFixed(2)}M
        </p>
      </div>
    );
  }
  return null;
};

// --- Main Chart Component ---
const AdvancedInteractiveChart: React.FC<AdvancedInteractiveChartProps> = ({ stockTicker = "AAPL" }) => {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');

  useEffect(() => {
    console.log('AdvancedInteractiveChart loaded');
  }, []);

  const chartData = useMemo(() => {
    switch (timeRange) {
      case '7D':
        return fullData.slice(-7);
      case '1M':
        return fullData.slice(-30);
      case '6M':
        return fullData.slice(-180);
      case '1Y':
      default:
        return fullData;
    }
  }, [timeRange]);

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 20, left: -10, bottom: 5 },
    };

    const commonComponents = (
      <>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
        <XAxis
          dataKey="date"
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
          axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
        />
        <YAxis
          orientation="right"
          domain={['dataMin - 20', 'dataMax + 20']}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
          axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
        <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
        <Brush dataKey="date" height={30} stroke="hsl(var(--primary))" fill="hsl(var(--background))" travellerWidth={15} />
      </>
    );

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {commonComponents}
            <Bar dataKey="value" name={stockTicker} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {commonComponents}
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" name={stockTicker} stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorUv)" />
          </AreaChart>
        );
      case 'line':
      default:
        return (
          <LineChart {...commonProps}>
            {commonComponents}
            <Line type="monotone" dataKey="value" name={stockTicker} stroke="hsl(var(--primary))" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }} />
          </LineChart>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">{stockTicker} Performance</CardTitle>
            <CardDescription>Interactive chart with multiple views</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
             <ToggleGroup type="single" value={chartType} onValueChange={(value: ChartType) => value && setChartType(value)} size="sm">
                <ToggleGroupItem value="line" aria-label="Line chart"><LineChartIcon className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="bar" aria-label="Bar chart"><BarChart3 className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="area" aria-label="Area chart"><AreaChartIcon className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="heatmap" aria-label="Heatmap" disabled><Map className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" value={timeRange} onValueChange={(value: TimeRange) => value && setTimeRange(value)} size="sm">
                <ToggleGroupItem value="7D">7D</ToggleGroupItem>
                <ToggleGroupItem value="1M">1M</ToggleGroupItem>
                <ToggleGroupItem value="6M">6M</ToggleGroupItem>
                <ToggleGroupItem value="1Y">1Y</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdvancedInteractiveChart;