import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Scale, Download, TrendingUp, Home, ArrowLeft, Printer } from "lucide-react";
import { calculateRentVsBuy, RentVsBuyInputs, RentVsBuyResults } from "@/lib/calculations";
import { formatCurrency, exportToCSV, printResults } from "@/lib/export-utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const RentVsBuyCalculator = () => {
  const [inputs, setInputs] = useState<RentVsBuyInputs>({
    propertyPrice: 7500000,
    downPayment: 1500000,
    loanInterestRate: 8.5,
    loanTenure: 20,
    monthlyRent: 25000,
    propertyAppreciation: 5,
    rentIncreaseRate: 5,
    investmentReturn: 12,
    analysisYears: 10,
  });

  const [results, setResults] = useState<RentVsBuyResults | null>(null);

  useEffect(() => {
    const calculatedResults = calculateRentVsBuy(inputs);
    setResults(calculatedResults);
  }, [inputs]);

  const handleInputChange = (field: keyof RentVsBuyInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (field: keyof RentVsBuyInputs, values: number[]) => {
    handleInputChange(field, values[0]);
  };

  const handleExport = () => {
    if (results) {
      const exportData = [
        { Field: 'Recommendation', Value: results.recommendation === 'buy' ? 'Buy Property' : 'Rent Property' },
        { Field: 'Total Buying Cost', Value: formatCurrency(results.buyingCost) },
        { Field: 'Total Renting Cost', Value: formatCurrency(results.rentingCost) },
        { Field: 'Savings', Value: formatCurrency(results.savings) },
        { Field: 'Break Even Year', Value: results.breakEvenYear || 'N/A' }
      ];
      exportToCSV(exportData, 'rent_vs_buy_results.csv');
    }
  };

  const handlePrint = () => {
    if (results) {
      printResults('Rent vs Buy Analysis', {
        recommendation: results.recommendation === 'buy' ? 'Buy Property' : 'Rent Property',
        buyingCost: results.buyingCost,
        rentingCost: results.rentingCost,
        savings: results.savings,
        breakEvenYear: results.breakEvenYear || 'N/A'
      });
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium mb-2">Year {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Rent vs Buy Calculator</h1>
          <p className="text-lg text-gray-600">Make informed housing decisions with comprehensive financial comparison</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Input Section */}
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Property & Financial Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Property Price */}
              <div className="space-y-3">
                <Label>Property Price (₹)</Label>
                <Input
                  type="number"
                  value={inputs.propertyPrice}
                  onChange={(e) => handleInputChange('propertyPrice', Number(e.target.value))}
                  className="text-lg"
                />
                <Slider
                  value={[inputs.propertyPrice]}
                  onValueChange={(values) => handleSliderChange('propertyPrice', values)}
                  min={1000000}
                  max={50000000}
                  step={100000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹10L</span>
                  <span>₹5Cr</span>
                </div>
              </div>

              {/* Down Payment */}
              <div className="space-y-3">
                <Label>Down Payment (₹)</Label>
                <Input
                  type="number"
                  value={inputs.downPayment}
                  onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                  className="text-lg"
                />
                <div className="text-sm text-gray-500">
                  {((inputs.downPayment / inputs.propertyPrice) * 100).toFixed(1)}% of property value
                </div>
              </div>

              {/* Loan Interest Rate */}
              <div className="space-y-3">
                <Label>Loan Interest Rate (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={inputs.loanInterestRate}
                  onChange={(e) => handleInputChange('loanInterestRate', Number(e.target.value))}
                  className="text-lg"
                />
                <Slider
                  value={[inputs.loanInterestRate]}
                  onValueChange={(values) => handleSliderChange('loanInterestRate', values)}
                  min={6}
                  max={15}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>6%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Monthly Rent */}
              <div className="space-y-3">
                <Label>Monthly Rent (₹)</Label>
                <Input
                  type="number"
                  value={inputs.monthlyRent}
                  onChange={(e) => handleInputChange('monthlyRent', Number(e.target.value))}
                  className="text-lg"
                />
                <Slider
                  value={[inputs.monthlyRent]}
                  onValueChange={(values) => handleSliderChange('monthlyRent', values)}
                  min={5000}
                  max={200000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹5K</span>
                  <span>₹2L</span>
                </div>
              </div>

              {/* Additional Parameters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Property Appreciation (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={inputs.propertyAppreciation}
                    onChange={(e) => handleInputChange('propertyAppreciation', Number(e.target.value))}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Rent Increase Rate (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={inputs.rentIncreaseRate}
                    onChange={(e) => handleInputChange('rentIncreaseRate', Number(e.target.value))}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Investment Return (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={inputs.investmentReturn}
                    onChange={(e) => handleInputChange('investmentReturn', Number(e.target.value))}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Analysis Period (Years)</Label>
                  <Input
                    type="number"
                    value={inputs.analysisYears}
                    onChange={(e) => handleInputChange('analysisYears', Number(e.target.value))}
                    className="text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle>Financial Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {results && (
                <>
                  {/* Recommendation Card */}
                  <div className={`bg-gradient-to-r ${
                    results.recommendation === 'buy' 
                      ? 'from-secondary-500 to-secondary-600' 
                      : 'from-accent-500 to-accent-600'
                  } rounded-xl p-6 text-white mb-6`}>
                    <div className="text-center">
                      <div className="text-sm opacity-90 mb-2">Recommendation</div>
                      <div className="text-3xl font-bold capitalize">{results.recommendation}</div>
                      <div className="text-sm opacity-90 mt-2">
                        Save {formatCurrency(results.savings)} over {inputs.analysisYears} years
                      </div>
                    </div>
                  </div>

                  {/* Cost Comparison */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-secondary-500" />
                        <span className="font-medium">Total Buying Cost</span>
                      </div>
                      <span className="font-semibold text-lg">{formatCurrency(results.buyingCost)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-accent-500" />
                        <span className="font-medium">Total Renting Cost</span>
                      </div>
                      <span className="font-semibold text-lg">{formatCurrency(results.rentingCost)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Break-even Year</span>
                      <span className="font-semibold text-lg text-primary-500">
                        {results.breakEvenYear > 0 ? `Year ${results.breakEvenYear}` : 'Not within analysis period'}
                      </span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-sm text-gray-500 mb-1">Monthly EMI</div>
                      <div className="text-lg font-semibold">
                        {formatCurrency((inputs.propertyPrice - inputs.downPayment) * 0.008 * Math.pow(1.008, inputs.loanTenure * 12) / (Math.pow(1.008, inputs.loanTenure * 12) - 1))}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-sm text-gray-500 mb-1">Current Rent</div>
                      <div className="text-lg font-semibold">{formatCurrency(inputs.monthlyRent)}</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={handleExport}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Analysis
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Comparison Chart */}
        {results && (
          <Card className="shadow-material-lg mb-8">
            <CardHeader>
              <CardTitle>Cost Comparison Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={results.yearlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#e0e0e0' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#e0e0e0' }}
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="cumulativeBuyingCost"
                    stroke="hsl(134, 41%, 41%)"
                    strokeWidth={2}
                    name="Cumulative Buying Cost"
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeRentingCost"
                    stroke="hsl(14, 100%, 57%)"
                    strokeWidth={2}
                    name="Cumulative Renting Cost"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Yearly Breakdown Table */}
        {results && (
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle>Year-wise Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Buying Cost</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Renting Cost</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cumulative Buying</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cumulative Renting</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.yearlyComparison.slice(0, 10).map((entry) => (
                      <tr key={entry.year} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{entry.year}</td>
                        <td className="px-4 py-3 text-sm text-right">{formatCurrency(entry.buyingCost)}</td>
                        <td className="px-4 py-3 text-sm text-right">{formatCurrency(entry.rentingCost)}</td>
                        <td className="px-4 py-3 text-sm text-right text-secondary-600">{formatCurrency(entry.cumulativeBuyingCost)}</td>
                        <td className="px-4 py-3 text-sm text-right text-accent-600">{formatCurrency(entry.cumulativeRentingCost)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RentVsBuyCalculator;
