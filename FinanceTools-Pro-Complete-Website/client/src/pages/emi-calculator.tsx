import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, Download, Table, ArrowLeft, Printer } from "lucide-react";
import { calculateEMI, EMIInputs, EMIResults } from "@/lib/calculations";
import { formatCurrency, exportToCSV, printResults } from "@/lib/export-utils";
import EMIChart from "@/components/charts/emi-chart";
import AmortizationTable from "@/components/amortization-table";

const EMICalculator = () => {
  const [inputs, setInputs] = useState<EMIInputs>({
    loanAmount: 1000000,
    interestRate: 8.5,
    tenureYears: 20,
  });

  const [results, setResults] = useState<EMIResults | null>(null);
  const [showAmortization, setShowAmortization] = useState(false);

  useEffect(() => {
    const calculatedResults = calculateEMI(inputs);
    setResults(calculatedResults);
  }, [inputs]);

  const handleInputChange = (field: keyof EMIInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (field: keyof EMIInputs, values: number[]) => {
    handleInputChange(field, values[0]);
  };

  const handleExport = () => {
    if (results) {
      const exportData = [
        { Field: 'Monthly EMI', Value: formatCurrency(results.monthlyEMI) },
        { Field: 'Total Amount Payable', Value: formatCurrency(results.totalAmount) },
        { Field: 'Total Interest', Value: formatCurrency(results.totalInterest) },
        { Field: 'Loan Amount', Value: formatCurrency(inputs.loanAmount) },
        { Field: 'Interest Rate', Value: `${inputs.interestRate}%` },
        { Field: 'Loan Tenure', Value: `${inputs.tenureYears} years` }
      ];
      exportToCSV(exportData, 'emi_calculation_results.csv');
    }
  };

  const handlePrint = () => {
    if (results) {
      const printData = {
        monthlyEMI: results.monthlyEMI,
        totalAmount: results.totalAmount,
        totalInterest: results.totalInterest,
        loanAmount: inputs.loanAmount,
        interestRate: inputs.interestRate,
        tenureYears: inputs.tenureYears
      };
      printResults('EMI Calculator Results', printData);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">EMI Calculator</h1>
          <p className="text-lg text-gray-600">Calculate your loan EMI with detailed breakdown and amortization schedule</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Input Section */}
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Loan Amount */}
              <div className="space-y-3">
                <Label>Loan Amount (₹)</Label>
                <Input
                  type="number"
                  value={inputs.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', Number(e.target.value))}
                  className="text-lg"
                />
                <Slider
                  value={[inputs.loanAmount]}
                  onValueChange={(values) => handleSliderChange('loanAmount', values)}
                  min={100000}
                  max={10000000}
                  step={50000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹1L</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-3">
                <Label>Interest Rate (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={inputs.interestRate}
                  onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                  className="text-lg"
                />
                <Slider
                  value={[inputs.interestRate]}
                  onValueChange={(values) => handleSliderChange('interestRate', values)}
                  min={6}
                  max={20}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>6%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="space-y-3">
                <Label>Loan Tenure</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input
                      type="number"
                      value={inputs.tenureYears}
                      onChange={(e) => handleInputChange('tenureYears', Number(e.target.value))}
                      className="text-lg text-center"
                    />
                    <div className="text-center text-xs text-gray-500 mt-1">Years</div>
                  </div>
                  <div>
                    <Input
                      type="number"
                      value={inputs.tenureYears * 12}
                      readOnly
                      className="text-lg text-center bg-gray-50"
                    />
                    <div className="text-center text-xs text-gray-500 mt-1">Months</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle>Loan Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {results && (
                <>
                  {/* EMI Result Card */}
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white mb-6">
                    <div className="text-center">
                      <div className="text-sm opacity-90 mb-2">Monthly EMI</div>
                      <div className="text-3xl font-bold">{formatCurrency(results.monthlyEMI)}</div>
                      <div className="text-sm opacity-90 mt-2">for {inputs.tenureYears} years</div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Principal Amount</span>
                      <span className="font-semibold text-lg">{formatCurrency(inputs.loanAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Total Interest</span>
                      <span className="font-semibold text-lg text-accent-500">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Total Amount</span>
                      <span className="font-semibold text-lg">{formatCurrency(results.totalAmount)}</span>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="mb-6">
                    <EMIChart results={results} />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => setShowAmortization(!showAmortization)}
                      className="w-full bg-secondary-500 hover:bg-secondary-600"
                    >
                      <Table className="w-4 h-4 mr-2" />
                      {showAmortization ? 'Hide' : 'View'} Amortization Schedule
                    </Button>
                    <Button
                      onClick={handleExport}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Results
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Amortization Table */}
        {showAmortization && results && (
          <AmortizationTable schedule={results.amortizationSchedule} />
        )}
      </div>
    </div>
  );
};

export default EMICalculator;
