import React from 'react';
import Header from '@/components/layout/Header';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';
import PortfolioSummaryCard from '@/components/PortfolioSummaryCard';
import WatchlistWidgetItem from '@/components/WatchlistWidgetItem';
import AdvancedInteractiveChart from '@/components/AdvancedInteractiveChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';

// Mock data for the watchlist
const watchlistData = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: 208.14, change: 0.65, changePercentage: 0.31 },
  { ticker: 'TSLA', name: 'Tesla, Inc.', price: 194.76, change: 11.69, changePercentage: 6.38 },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', price: 126.57, change: -4.32, changePercentage: -3.34 },
  { ticker: 'AMZN', name: 'Amazon.com, Inc.', price: 187.35, change: 1.89, changePercentage: 1.02 },
  { ticker: 'MSFT', name: 'Microsoft Corporation', price: 450.62, change: 2.11, changePercentage: 0.47 },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 184.03, change: -1.25, changePercentage: -0.67 },
];

// Mock data for news
const newsData = [
  { id: '1', source: 'MarketWatch', title: 'Tech Stocks Rally on Positive Inflation Data', time: '2h ago' },
  { id: '2', source: 'Reuters', title: 'Federal Reserve Signals Potential Rate Cuts Later This Year', time: '4h ago' },
  { id: '3', source: 'Bloomberg', title: 'Oil Prices Fluctuate Amidst New Supply Reports', time: '5h ago' },
];

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col sm:pl-14">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="grid w-full auto-rows-max grid-cols-1 gap-6 md:gap-8 lg:grid-cols-4">
            
            {/* Portfolio Summary Card */}
            <div className="lg:col-span-2">
              <PortfolioSummaryCard />
            </div>

            {/* Watchlist Card */}
            <div className="lg:col-span-2">
              <Card className="bg-card/40 backdrop-blur-sm border-border/20 h-full">
                <CardHeader>
                  <CardTitle>Watchlist</CardTitle>
                  <CardDescription>Your curated list of top-performing assets.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[280px] pr-4">
                    <div className="flex flex-col gap-2">
                      {watchlistData.map((item) => (
                        <WatchlistWidgetItem key={item.ticker} {...item} />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Interactive Chart */}
            <div className="lg:col-span-3">
              <AdvancedInteractiveChart stockTicker="SPY" />
            </div>

            {/* Market News Card */}
            <div className="lg:col-span-1">
              <Card className="bg-card/40 backdrop-blur-sm border-border/20 h-full">
                <CardHeader>
                  <CardTitle>Market News</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {newsData.map((news) => (
                        <div key={news.id}>
                          <p className="text-sm font-medium leading-none text-foreground">{news.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{news.source} &bull; {news.time}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;