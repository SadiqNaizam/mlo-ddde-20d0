import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-5 md:h-16 md:flex-row md:py-0">
        <div className="text-center text-sm text-muted-foreground md:text-left">
          <p>&copy; {currentYear} StellarStox. All Rights Reserved.</p>
        </div>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/terms" className="transition-colors hover:text-foreground">
            Terms of Service
          </Link>
          <Link to="/privacy" className="transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;