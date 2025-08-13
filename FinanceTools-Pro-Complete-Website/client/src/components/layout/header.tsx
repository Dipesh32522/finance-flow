import { Link, useLocation } from "wouter";
import { Calculator, Menu, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [location] = useLocation();

  const navigationItems = [
    { href: "/#calculators", label: "Calculators" },
    { href: "/#features", label: "Features" },
    { href: "/about", label: "About Us" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="bg-white shadow-material sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <Calculator className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FinanceTools Pro</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Advanced Financial Calculators</p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-primary-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button className="hidden sm:flex items-center space-x-2 bg-primary-500 text-white hover:bg-primary-600">
              <Download className="w-4 h-4" />
              <span>Export Results</span>
            </Button>
            
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-gray-600 hover:text-primary-500 transition-colors text-lg"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
