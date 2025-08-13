import { Link } from "wouter";
import { Calculator, TrendingUp, Scale, Percent, Sprout, ArrowLeftRight, Home, Star, Shield, Zap, Headphones, BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CalculatorCard from "@/components/calculator-card";

const HomePage = () => {
  const stats = [
    { value: "50K+", label: "Calculations", icon: Calculator },
    { value: "6", label: "Tools", icon: BarChart3 },
    { value: "99.9%", label: "Accuracy", icon: Shield },
    { value: "24/7", label: "Available", icon: Zap },
  ];

  const calculators = [
    {
      id: "emi",
      title: "Loan EMI Calculator",
      description: "Calculate monthly payments, total interest, and view detailed amortization schedule for any loan.",
      icon: Home,
      color: "primary",
      badge: "Most Popular",
      previewData: {
        label1: "Loan Amount",
        value1: "₹10,00,000",
        label2: "EMI",
        value2: "₹14,308"
      },
      href: "/emi-calculator"
    },
    {
      id: "sip",
      title: "SIP Calculator", 
      description: "Plan your systematic investments and visualize wealth growth with detailed projections and charts.",
      icon: TrendingUp,
      color: "secondary",
      badge: "Trending",
      previewData: {
        label1: "Monthly SIP",
        value1: "₹5,000",
        label2: "Future Value", 
        value2: "₹35,76,425"
      },
      href: "/sip-calculator"
    },
    {
      id: "rent-vs-buy",
      title: "Rent vs Buy Calculator",
      description: "Make informed housing decisions with comprehensive financial comparison and analysis.",
      icon: Scale,
      color: "accent",
      badge: null,
      previewData: {
        label1: "Property Value",
        value1: "₹75,00,000", 
        label2: "Recommendation",
        value2: "Buy"
      },
      href: "/rent-vs-buy"
    },
    {
      id: "gst",
      title: "GST Calculator",
      description: "Calculate GST amounts, inclusive/exclusive pricing, and manage tax calculations effortlessly.",
      icon: Percent,
      color: "primary", 
      badge: null,
      previewData: {
        label1: "Base Amount",
        value1: "₹10,000",
        label2: "GST (18%)",
        value2: "₹1,800"
      },
      href: "/gst-calculator"
    },
    {
      id: "compound-interest",
      title: "Compound Interest",
      description: "Visualize the power of compounding with interactive charts and detailed growth analysis.",
      icon: Sprout,
      color: "secondary",
      badge: null,
      previewData: {
        label1: "Principal", 
        value1: "₹1,00,000",
        label2: "Final Amount",
        value2: "₹2,65,330"
      },
      href: "/compound-interest"
    },
    {
      id: "unit-converter",
      title: "Unit Converter",
      description: "Convert between various units including length, weight, temperature, currency and more.",
      icon: ArrowLeftRight,
      color: "accent",
      badge: null,
      previewData: {
        label1: "100 Meters",
        value1: "328.08 Feet",
        label2: "Categories", 
        value2: "15+"
      },
      href: "/unit-converter"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Mobile Responsive",
      description: "Optimized for all devices with touch-friendly interfaces and seamless mobile experience.",
      color: "primary"
    },
    {
      icon: BarChart3,
      title: "Interactive Charts", 
      description: "Visualize your data with beautiful, interactive charts and graphs for better understanding.",
      color: "secondary"
    },
    {
      icon: Download,
      title: "Export Results",
      description: "Download your calculations as PDF or Excel files for record keeping and sharing.",
      color: "accent"
    },
    {
      icon: Zap,
      title: "Real-time Calculation",
      description: "Instant results as you type with live updates and dynamic recalculations.",
      color: "primary"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "All calculations are performed locally in your browser. Your data never leaves your device.",
      color: "secondary"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help when you need it with our comprehensive help documentation and support.",
      color: "accent"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Financial Advisor", 
      avatar: "RK",
      rating: 5,
      text: "Excellent calculator suite! The EMI calculator with amortization schedule is exactly what I needed for my clients."
    },
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      avatar: "PS", 
      rating: 5,
      text: "The SIP calculator helped me plan my investments perfectly. Love the interactive charts and detailed projections!"
    },
    {
      name: "Arun Mehta",
      role: "Business Owner",
      avatar: "AM",
      rating: 5, 
      text: "GST calculator is a lifesaver for my business. Mobile-friendly design makes it easy to use anywhere."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Financial Calculators
              <span className="block text-primary-500">Made Simple</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Calculate EMIs, plan investments, analyze rent vs buy decisions, and convert units with our comprehensive suite of financial tools. Trusted by thousands of users worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-primary-500 text-white hover:bg-primary-600 transform hover:scale-105 shadow-material">
                <Calculator className="mr-2 w-5 h-5" />
                Start Calculating
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary-500 text-primary-500 hover:bg-gray-50">
                <div className="mr-2 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                Watch Demo
              </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold ${
                    index === 0 ? 'text-primary-500' : 
                    index === 1 ? 'text-secondary-500' : 
                    index === 2 ? 'text-accent-500' : 'text-primary-500'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section id="calculators" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Calculator</h2>
            <p className="text-lg text-gray-600">Professional-grade financial tools with real-time calculations and detailed analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.map((calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FinanceTools Pro?</h2>
            <p className="text-lg text-gray-600">Advanced features designed for professionals and individuals alike</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className={`w-16 h-16 ${
                  feature.color === 'primary' ? 'bg-primary-100' : 
                  feature.color === 'secondary' ? 'bg-secondary-100' : 'bg-accent-100'
                } rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`${
                    feature.color === 'primary' ? 'text-primary-500' : 
                    feature.color === 'secondary' ? 'text-secondary-500' : 'text-accent-500'
                  } w-8 h-8`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600">Trusted by thousands of users for their financial calculations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${
                      index === 0 ? 'bg-primary-100' : 
                      index === 1 ? 'bg-secondary-100' : 'bg-accent-100'
                    } rounded-full flex items-center justify-center`}>
                      <span className={`font-semibold ${
                        index === 0 ? 'text-primary-600' : 
                        index === 1 ? 'text-secondary-600' : 'text-accent-600'
                      }`}>
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
