import { Link } from "wouter";
import { Calculator, Twitter, Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const calculatorLinks = [
    { href: "/emi-calculator", label: "EMI Calculator" },
    { href: "/sip-calculator", label: "SIP Calculator" },
    { href: "/gst-calculator", label: "GST Calculator" },
    { href: "/compound-interest", label: "Compound Interest" },
    { href: "/rent-vs-buy", label: "Rent vs Buy" },
    { href: "/unit-converter", label: "Unit Converter" },
  ];

  const supportLinks = [
    { href: "#", label: "Help Center" },
    { href: "#", label: "Contact Us" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "FAQ" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Calculator className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold">FinanceTools Pro</h1>
                <p className="text-sm text-gray-400">Advanced Financial Calculators</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering individuals and professionals with accurate, easy-to-use financial calculators and tools. Make informed financial decisions with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Calculators</h3>
            <ul className="space-y-2 text-gray-400">
              {calculatorLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 FinanceTools Pro. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center text-sm text-gray-400">
              <i className="fas fa-shield-alt mr-2"></i>
              SSL Secured
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <i className="fas fa-mobile-alt mr-2"></i>
              Mobile Optimized
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
