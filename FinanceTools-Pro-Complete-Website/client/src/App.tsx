import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import EMICalculator from "@/pages/emi-calculator";
import SIPCalculator from "@/pages/sip-calculator";
import RentVsBuy from "@/pages/rent-vs-buy";
import GSTCalculator from "@/pages/gst-calculator";
import CompoundInterest from "@/pages/compound-interest";
import UnitConverter from "@/pages/unit-converter";
import About from "@/pages/about";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/emi-calculator" component={EMICalculator} />
        <Route path="/sip-calculator" component={SIPCalculator} />
        <Route path="/rent-vs-buy" component={RentVsBuy} />
        <Route path="/gst-calculator" component={GSTCalculator} />
        <Route path="/compound-interest" component={CompoundInterest} />
        <Route path="/unit-converter" component={UnitConverter} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
