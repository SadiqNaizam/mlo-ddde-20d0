import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CircuitBoard, BarChartHorizontal, Settings, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label }) => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
      isActive && 'bg-accent text-accent-foreground'
    );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink to={to} className={navLinkClasses}>
          <Icon className="h-5 w-5" />
          <span className="sr-only">{label}</span>
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
};

const DashboardSidebar: React.FC = () => {
  console.log('DashboardSidebar loaded');
  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <CircuitBoard className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">StellarStox</span>
        </Link>
        <NavItem to="/" icon={Home} label="Dashboard" />
        <NavItem to="/assetdetailpage" icon={BarChartHorizontal} label="Assets" />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem to="/settingspage" icon={Settings} label="Settings" />
      </nav>
    </aside>
  );
};

export default DashboardSidebar;