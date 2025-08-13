import { Link } from "wouter";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CalculatorCardProps {
  calculator: {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    badge?: string | null;
    previewData: {
      label1: string;
      value1: string;
      label2: string;
      value2: string;
    };
    href: string;
  };
}

const CalculatorCard = ({ calculator }: CalculatorCardProps) => {
  const { title, description, icon: Icon, color, badge, previewData, href } = calculator;

  const getColorClasses = (colorType: string) => {
    switch (colorType) {
      case 'primary':
        return {
          iconBg: 'bg-primary-100',
          iconText: 'text-primary-500',
          button: 'bg-primary-500 hover:bg-primary-600',
          badgeColor: 'bg-secondary-50 text-secondary-600',
          accentText: 'text-primary-500'
        };
      case 'secondary':
        return {
          iconBg: 'bg-secondary-100',
          iconText: 'text-secondary-500',
          button: 'bg-secondary-500 hover:bg-secondary-600',
          badgeColor: 'bg-accent-50 text-accent-600',
          accentText: 'text-secondary-500'
        };
      case 'accent':
        return {
          iconBg: 'bg-accent-100',
          iconText: 'text-accent-500',
          button: 'bg-accent-500 hover:bg-accent-600',
          badgeColor: 'bg-primary-50 text-primary-600',
          accentText: 'text-accent-500'
        };
      default:
        return {
          iconBg: 'bg-primary-100',
          iconText: 'text-primary-500',
          button: 'bg-primary-500 hover:bg-primary-600',
          badgeColor: 'bg-secondary-50 text-secondary-600',
          accentText: 'text-primary-500'
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <Card className="bg-white shadow-material hover:shadow-material-lg transition-all duration-300 border border-gray-100">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 ${colorClasses.iconBg} rounded-lg flex items-center justify-center`}>
            <Icon className={`${colorClasses.iconText} w-6 h-6`} />
          </div>
          {badge && (
            <Badge className={`${colorClasses.badgeColor} text-xs px-3 py-1 font-medium`}>
              {badge}
            </Badge>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {/* Quick Preview */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{previewData.label1}</span>
              <div className="font-semibold">{previewData.value1}</div>
            </div>
            <div>
              <span className="text-gray-500">{previewData.label2}</span>
              <div className={`font-semibold ${colorClasses.accentText}`}>{previewData.value2}</div>
            </div>
          </div>
        </div>
        
        <Link href={href}>
          <Button className={`w-full ${colorClasses.button} text-white py-3 font-medium transition-colors`}>
            {title.includes('Calculator') ? 'Calculate' : title.includes('Converter') ? 'Convert' : 'Analyze'} Now
            <span className="ml-2">→</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CalculatorCard;
