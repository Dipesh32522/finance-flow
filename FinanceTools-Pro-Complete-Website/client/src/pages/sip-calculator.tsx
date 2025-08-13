import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Download, ArrowLeft, Printer } from "lucide-react";
import { calculateSIP, SIPInputs, SIPResults } from "@/lib/calculations";
import { formatCurrency, exportToCSV, printResults } from "@/lib/export-utils";
import SIPChart from "@/components/charts/sip-chart";

const SIPCalculator = () => {
  const [inputs, setInputs] = useState<SIPInputs>({
    monthlyAmount: 5000,
    annualReturn: 12,
    tenureYears: 20,
  });

  const [results, setResults] = useState<SIPResults | null>(null);

  useEffect(() => {
    const calculatedResults = calculateSIP(inputs);
    setResults(calculatedResults);
  }, [inputs]);

  const handleInputChange = (field: keyof SIPInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (field: keyof SIPInputs, values: number[]) => {
    handleInputChange(field, values[0]);
  };

  const handleExport = () => {
    if (results) {
      const exportData = [
        { Field: 'Future Value', Value: formatCurrency(results.futureValue) },
        { Field: 'Total Investment', Value: formatCurrency(results.totalInvestment) },
        { Field: 'Total Returns', Value: formatCurrency(results.totalReturns) },
        { Field: 'Monthly Investment', Value: formatCurrency(inputs.monthlyAmount) },
        { Field: 'Expected Return', Value: `${inputs.annualReturn}%` },
        { Field: 'Investment Period', Value: `${inputs.tenureYears} years` }
      ];
      exportToCSV(exportData, 'sip_calculation_results.csv');
    }
  };

  const handlePrint = () => {
    if (results) {
      printResults('SIP Calculator Results', {
        futureValue: results.futureValue,
        totalInvestment: results.totalInvestment,
        totalReturns: results.totalReturns,
        monthlyAmount: inputs.monthlyAmount,
        annualReturn: inputs.annualReturn,
        tenureYears: inputs.tenureYears
      });
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">SIP Calculator</h1>
          <p className="text-lg text-gray-600">Plan your systematic investments and visualize wealth growth</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Investment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Monthly Investment */}
              <div className="space-y-3">
                <Label>Monthly Investment (₹)</Label>
                <Input
                  type="number"
                  value={inputs.monthlyAmount}
                  onChange={(e) => handleInputChange('monthlyAmount', Number(e.target.value))}
                  className="text-lg"
                />
                <Slider
                  value={[inputs.monthlyAmount]}
                  onValueChange={(values) => handleSliderChange('monthlyAmount', values)}
                  min={500}
                  max={100000}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹500</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              {/* Expected Annual Return */}
              <div className="space-y-3">
                <Label>Expected Annual Return (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={inputs.annualReturn}
                  onChange={(e) => handleInputChange('annualReturn', Number(e.target.value))}
                  className="text-lg"
                />
                <Slider
                  value={[inputs.annualReturn]}
                  onValueChange={(values) => handleSliderChange('annualReturn', values)}
                  min={5}
                  max={30}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Investment Tenure */}
              <div className="space-y-3">
                <Label>Investment Tenure (Years)</Label>
                <Input
                  type="number"
                  value={inputs.tenureYears}
                  onChange={(e) => handleInputChange('tenureYears', Number(e.target.value))}
                  className="text-lg"
                />
                <Slider
                  value={[inputs.tenureYears]}
                  onValueChange={(values) => handleSliderChange('tenureYears', values)}
                  min={1}
                  max={40}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 Year</span>
                  <span>40 Years</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle>Investment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {results && (
                <>
                  {/* Future Value Result Card */}
                  <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl p-6 text-white mb-6">
                    <div className="text-center">
                      <div className="text-sm opacity-90 mb-2">Future Value</div>
                      <div className="text-3xl font-bold">{formatCurrency(results.futureValue)}</div>
                      <div className="text-sm opacity-90 mt-2">in {inputs.tenureYears} years</div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Total Investment</span>
                      <span className="font-semibold text-lg">{formatCurrency(results.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Total Returns</span>
                      <span className="font-semibold text-lg text-secondary-500">{formatCurrency(results.totalReturns)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Wealth Gained</span>
                      <span className="font-semibold text-lg text-accent-500">
                        {((results.totalReturns / results.totalInvestment) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="mb-6">
                    <SIPChart results={results} />
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={handleExport}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Results
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Yearly Breakdown Table */}
        {results && (
          <Card className="shadow-material-lg mt-8">
            <CardHeader>
              <CardTitle>Year-wise Investment Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Invested Amount</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Earned</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.yearlyBreakdown.slice(0, 10).map((entry) => (
                      <tr key={entry.year} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{entry.year}</td>
                        <td className="px-4 py-3 text-sm text-right">{formatCurrency(entry.investedAmount)}</td>
                        <td className="px-4 py-3 text-sm text-right text-secondary-600">{formatCurrency(entry.interestEarned)}</td>
                        <td className="px-4 py-3 text-sm text-right font-semibold">{formatCurrency(entry.totalValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {results.yearlyBreakdown.length > 10 && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Showing first 10 years. Export for complete breakdown.
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SIPCalculator;
