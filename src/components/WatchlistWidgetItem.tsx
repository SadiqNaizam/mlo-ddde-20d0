import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface WatchlistWidgetItemProps {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercentage: number;
}

const WatchlistWidgetItem: React.FC<WatchlistWidgetItemProps> = ({
  ticker,
  name,
  price,
  change,
  changePercentage,
}) => {
  console.log('WatchlistWidgetItem loaded for:', ticker);

  const isPositive = change >= 0;

  const formatCurrency = (value: number) => {
    return value.toFixed(2);
  };

  const formatChange = (value: number) => {
    return `${isPositive ? '+' : ''}${value.toFixed(2)}`;
  };

  const formatPercentage = (value: number) => {
    return `(${isPositive ? '+' : ''}${value.toFixed(2)}%)`;
  };

  return (
    <Link 
      to={`/assetdetailpage?ticker=${ticker}`} 
      className="block w-full text-foreground no-underline"
      aria-label={`View details for ${name}`}
    >
      <div 
        className={cn(
          "flex justify-between items-center p-3 rounded-md transition-all duration-200 ease-in-out",
          "hover:bg-secondary/50 hover:ring-1 hover:ring-primary"
        )}
      >
        {/* Left Side: Ticker and Name */}
        <div className="flex flex-col">
          <p className="font-bold text-base text-foreground">{ticker}</p>
          <p className="text-sm text-muted-foreground truncate" style={{ maxWidth: '120px' }}>{name}</p>
        </div>

        {/* Right Side: Price and Change */}
        <div className="flex flex-col items-end">
          <p className="font-semibold text-base text-foreground">${formatCurrency(price)}</p>
          <div className={cn(
            "flex items-center text-sm",
            isPositive ? "text-accent" : "text-destructive"
          )}>
            {isPositive 
              ? <ArrowUpRight className="h-4 w-4 mr-1" />
              : <ArrowDownRight className="h-4 w-4 mr-1" />
            }
            <span>{formatChange(change)}</span>
            <span className="ml-2">{formatPercentage(changePercentage)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WatchlistWidgetItem;