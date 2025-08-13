// Common chart configuration and theme settings
export const chartConfig = {
  colors: {
    primary: 'hsl(210, 79%, 46%)',
    secondary: 'hsl(134, 41%, 41%)',
    accent: 'hsl(14, 100%, 57%)',
    gray: 'hsl(0, 0%, 60%)',
    success: 'hsl(142, 71%, 45%)',
    warning: 'hsl(45, 93%, 47%)',
    error: 'hsl(0, 84%, 60%)',
  },
  
  gridStyle: {
    strokeDasharray: '3 3',
    stroke: '#e0e0e0',
  },
  
  axisStyle: {
    tick: { fontSize: 12, fill: '#6b7280' },
    axisLine: { stroke: '#e0e0e0' },
  },
  
  tooltipStyle: {
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  
  responsiveConfig: {
    width: '100%',
    height: 300,
  },
  
  formatters: {
    currency: (value: number) => `₹${(value / 100000).toFixed(0)}L`,
    percentage: (value: number) => `${value.toFixed(1)}%`,
    number: (value: number) => value.toLocaleString('en-IN'),
  },
  
  animations: {
    duration: 300,
    easing: 'ease-out',
  },
};

// Chart-specific configurations
export const chartTypes = {
  pie: {
    innerRadius: 60,
    outerRadius: 100,
    paddingAngle: 5,
    cornerRadius: 3,
  },
  
  line: {
    strokeWidth: 2,
    dot: { r: 4 },
    activeDot: { r: 6 },
  },
  
  bar: {
    radius: [4, 4, 0, 0],
    maxBarSize: 60,
  },
  
  area: {
    fillOpacity: 0.6,
    strokeWidth: 2,
  },
};

// Responsive breakpoints for charts
export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
};

// Helper function to get responsive chart height
export const getResponsiveHeight = (screenWidth: number): number => {
  if (screenWidth < breakpoints.mobile) return 250;
  if (screenWidth < breakpoints.tablet) return 300;
  return 400;
};

// Helper function to format tick values based on data range
export const getTickFormatter = (maxValue: number, type: 'currency' | 'percentage' | 'number' = 'number') => {
  switch (type) {
    case 'currency':
      if (maxValue > 10000000) return (value: number) => `₹${(value / 10000000).toFixed(1)}Cr`;
      if (maxValue > 100000) return (value: number) => `₹${(value / 100000).toFixed(0)}L`;
      return (value: number) => `₹${(value / 1000).toFixed(0)}K`;
    
    case 'percentage':
      return (value: number) => `${value.toFixed(1)}%`;
    
    default:
      if (maxValue > 1000000) return (value: number) => `${(value / 1000000).toFixed(1)}M`;
      if (maxValue > 1000) return (value: number) => `${(value / 1000).toFixed(0)}K`;
      return (value: number) => value.toString();
  }
};

export default chartConfig;
