import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TickerItemData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const tickerData: TickerItemData[] = [
  { symbol: 'SPX', price: 5464.62, change: -21.43, changePercent: -0.39 },
  { symbol: 'NDQ', price: 19700.43, change: 110.45, changePercent: 0.56 },
  { symbol: 'DJI', price: 39150.33, change: -299.05, changePercent: -0.76 },
  { symbol: 'NVDA', price: 126.57, change: -4.32, changePercent: -3.34 },
  { symbol: 'AAPL', price: 208.14, change: 0.65, changePercent: 0.31 },
  { symbol: 'TSLA', price: 194.76, change: 11.69, changePercent: 6.38 },
  { symbol: 'MSFT', price: 450.62, change: 2.11, changePercent: 0.47 },
  { symbol: 'GOOGL', price: 184.03, change: -1.25, changePercent: -0.67 },
  { symbol: 'AMZN', price: 187.35, change: 1.89, changePercent: 1.02 },
  { symbol: 'META', price: 509.99, change: -2.51, changePercent: -0.49 },
];

const TickerItem: React.FC<{ item: TickerItemData }> = ({ item }) => {
  const isPositive = item.change >= 0;
  const changeColor = isPositive ? 'text-accent' : 'text-destructive';

  return (
    <div className="flex items-center mx-6 whitespace-nowrap text-sm">
      <span className="font-semibold text-foreground">{item.symbol}</span>
      <span className="ml-3 text-muted-foreground">{item.price.toFixed(2)}</span>
      <div className={cn('ml-3 flex items-center font-medium', changeColor)}>
        {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
        <span>{item.change.toFixed(2)}</span>
        <span className="ml-2">({item.changePercent.toFixed(2)}%)</span>
      </div>
    </div>
  );
};

const StockTickerBar: React.FC = () => {
  console.log('StockTickerBar loaded');

  // Duplicate the data to create a seamless loop
  const extendedData = [...tickerData, ...tickerData];

  return (
    <div className="w-full bg-background border-b border-border overflow-hidden relative">
      <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10"></div>
      <motion.div
        className="flex"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          ease: 'linear',
          duration: 40,
          repeat: Infinity,
        }}
      >
        {extendedData.map((item, index) => (
          <TickerItem key={`${item.symbol}-${index}`} item={item} />
        ))}
      </motion.div>
      <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10"></div>
    </div>
  );
};

export default StockTickerBar;