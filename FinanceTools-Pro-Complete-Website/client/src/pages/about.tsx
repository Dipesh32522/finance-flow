import { Link } from "wouter";
import { ArrowLeft, Calculator, TrendingUp, Shield, Zap, Users, Award, CheckCircle, Globe, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  const features = [
    {
      icon: Calculator,
      title: "6 Professional Tools",
      description: "EMI Calculator, SIP Calculator, Rent vs Buy Analyzer, GST Calculator, Compound Interest Calculator, and Unit Converter"
    },
    {
      icon: TrendingUp,
      title: "Real-time Calculations",
      description: "Instant results with interactive sliders and live updates as you modify inputs"
    },
    {
      icon: Shield,
      title: "100% Secure & Private",
      description: "All calculations are performed locally in your browser. Your data never leaves your device"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with responsive design and smooth user experience"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Fully responsive design that works perfectly on all devices and screen sizes"
    },
    {
      icon: Globe,
      title: "Export & Share",
      description: "Download results as CSV/PDF and print detailed reports for your records"
    }
  ];

  const tools = [
    {
      name: "EMI Calculator",
      description: "Calculate monthly loan payments with detailed amortization schedules. Perfect for home loans, car loans, and personal loans.",
      features: ["Monthly EMI calculation", "Total interest breakdown", "Amortization schedule", "Interactive charts"]
    },
    {
      name: "SIP Calculator", 
      description: "Plan your systematic investments and visualize wealth growth over time with compound returns.",
      features: ["Future value projection", "Year-wise breakdown", "Growth visualization", "Investment planning"]
    },
    {
      name: "Rent vs Buy Calculator",
      description: "Make informed housing decisions by comparing the financial impact of renting versus buying property.",
      features: ["Cost comparison analysis", "Break-even calculation", "Investment opportunity cost", "Long-term projections"]
    },
    {
      name: "GST Calculator",
      description: "Calculate GST amounts for both inclusive and exclusive pricing with support for all Indian GST rates.",
      features: ["All GST rates (5%, 12%, 18%, 28%)", "Inclusive/Exclusive options", "Detailed breakdown", "Business-friendly"]
    },
    {
      name: "Compound Interest Calculator",
      description: "Understand the power of compounding with detailed growth analysis and interactive visualizations.",
      features: ["Multiple compounding frequencies", "Growth visualization", "Year-wise breakdown", "Einstein's favorite concept"]
    },
    {
      name: "Unit Converter",
      description: "Convert between various units including length, weight, temperature, area, volume, time, speed, and energy.",
      features: ["8+ conversion categories", "Precise calculations", "Quick reference tables", "Educational information"]
    }
  ];

  const stats = [
    { number: "50,000+", label: "Calculations Performed" },
    { number: "6", label: "Professional Tools" },
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "24/7", label: "Availability" }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About FinanceTools Pro</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive suite of professional financial calculators designed to empower smart financial decisions. 
            Trusted by thousands of users worldwide for accurate, fast, and reliable financial calculations.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-material">
              <div className={`text-3xl font-bold mb-2 ${
                index === 0 ? 'text-primary-500' : 
                index === 1 ? 'text-secondary-500' : 
                index === 2 ? 'text-accent-500' : 'text-primary-500'
              }`}>
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-material hover:shadow-material-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${
                    index % 3 === 0 ? 'bg-primary-100' : 
                    index % 3 === 1 ? 'bg-secondary-100' : 'bg-accent-100'
                  } rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className={`${
                      index % 3 === 0 ? 'text-primary-500' : 
                      index % 3 === 1 ? 'text-secondary-500' : 'text-accent-500'
                    } w-8 h-8`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Tools */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Professional Tools</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <Card key={index} className="shadow-material">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Key Features:</h4>
                    <ul className="space-y-1">
                      {tool.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                At FinanceTools Pro, we believe that everyone deserves access to professional-grade financial tools. 
                Our mission is to democratize financial planning by providing accurate, easy-to-use calculators that 
                help individuals and businesses make informed financial decisions. Whether you're planning a home purchase, 
                calculating loan EMIs, or planning your retirement through SIP investments, we're here to support your 
                financial journey with reliable tools and insights.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose FinanceTools Pro?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Grade Accuracy</h3>
              <p className="text-gray-600 mb-6">
                Our calculators use industry-standard formulas and are continuously tested for accuracy. 
                Trusted by financial advisors, accountants, and individuals for precise calculations.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">User-Friendly Design</h3>
              <p className="text-gray-600 mb-6">
                Clean, intuitive interface with interactive sliders, real-time updates, and visual charts 
                make complex financial calculations simple and understandable.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Privacy</h3>
              <p className="text-gray-600 mb-6">
                All calculations are performed locally in your browser. We don't store or transmit your 
                financial data, ensuring complete privacy and security.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Always Free</h3>
              <p className="text-gray-600 mb-6">
                Access all our professional tools completely free. No hidden charges, no premium features, 
                no registration required. Quality financial tools accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="mb-16">
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Built with Modern Technology</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                FinanceTools Pro is built using cutting-edge web technologies to ensure fast performance, 
                reliability, and a smooth user experience across all devices.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">React & TypeScript</h4>
                  <p className="text-sm text-gray-600">Modern, type-safe frontend architecture</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Interactive Charts</h4>
                  <p className="text-sm text-gray-600">Beautiful data visualizations with Recharts</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Responsive Design</h4>
                  <p className="text-sm text-gray-600">Works perfectly on all devices and screen sizes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Info */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Started Today</h2>
          <p className="text-lg text-gray-600 mb-8">
            Ready to take control of your finances? Start using our professional calculators now.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-primary-500 text-white hover:bg-primary-600">
              <Calculator className="mr-2 w-5 h-5" />
              Start Calculating
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;