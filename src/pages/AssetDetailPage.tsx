import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';

// Custom Page-specific Components
import AdvancedInteractiveChart from '@/components/AdvancedInteractiveChart';

// shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for demonstration purposes
const stockTicker = "AAPL"; // In a real app, this would come from URL params
const companyProfile = {
  name: "Apple Inc.",
  description: "Apple Inc. is an American multinational technology company that specializes in consumer electronics, software, and online services. Apple is the largest information technology company by revenue and, as of January 2021, the world's most valuable company.",
  marketCap: "3.2T",
  peRatio: "32.5",
  dividendYield: "0.5%",
  yearHigh: "220.20",
  yearLow: "164.08",
};

const historicalData = [
  { date: "2024-07-25", open: "215.50", high: "218.00", low: "214.20", close: "217.80", volume: "45,123,456" },
  { date: "2024-07-24", open: "212.00", high: "215.75", low: "211.50", close: "215.00", volume: "52,654,321" },
  { date: "2024-07-23", open: "210.10", high: "212.50", low: "209.80", close: "211.90", volume: "48,987,654" },
  { date: "2024-07-22", open: "208.50", high: "210.60", low: "207.90", close: "210.20", volume: "41,234,567" },
  { date: "2024-07-21", open: "205.30", high: "208.70", low: "205.00", close: "208.40", volume: "55,765,432" },
];

const AssetDetailPage = () => {
  React.useEffect(() => {
    console.log("AssetDetailPage loaded");
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Breadcrumb className="hidden md:flex mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Assets</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{stockTicker}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="space-y-8">
            <AdvancedInteractiveChart stockTicker={stockTicker} />

            <Tabs defaultValue="financials" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="historical">Historical Data</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="financials" className="mt-4">
                <Card className="bg-card/40 border-border/20">
                  <CardHeader>
                    <CardTitle>Key Metrics</CardTitle>
                    <CardDescription>
                      Fundamental financial data for {companyProfile.name}.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Market Cap</span>
                      <span className="font-semibold text-lg text-foreground">{companyProfile.marketCap}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">P/E Ratio</span>
                      <span className="font-semibold text-lg text-foreground">{companyProfile.peRatio}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Dividend Yield</span>
                      <span className="font-semibold text-lg text-foreground">{companyProfile.dividendYield}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">52-Week High</span>
                      <span className="font-semibold text-lg text-foreground">${companyProfile.yearHigh}</span>
                    </div>
                     <div className="flex flex-col">
                      <span className="text-muted-foreground">52-Week Low</span>
                      <span className="font-semibold text-lg text-foreground">${companyProfile.yearLow}</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="historical" className="mt-4">
                <Card className="bg-card/40 border-border/20">
                  <CardHeader>
                    <CardTitle>Historical Prices</CardTitle>
                    <CardDescription>
                      End-of-day price data for the last five trading sessions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Open</TableHead>
                          <TableHead>High</TableHead>
                          <TableHead>Low</TableHead>
                          <TableHead>Close</TableHead>
                          <TableHead className="text-right">Volume</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {historicalData.map((day) => (
                          <TableRow key={day.date}>
                            <TableCell className="font-medium">{day.date}</TableCell>
                            <TableCell>${day.open}</TableCell>
                            <TableCell>${day.high}</TableCell>
                            <TableCell>${day.low}</TableCell>
                            <TableCell className="font-semibold">${day.close}</TableCell>
                            <TableCell className="text-right">{day.volume}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="mt-4">
                <Card className="bg-card/40 border-border/20">
                  <CardHeader>
                    <CardTitle>About {companyProfile.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {companyProfile.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AssetDetailPage;