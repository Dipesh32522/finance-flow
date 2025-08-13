import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Percent, Download, Calculator, ArrowLeft, Printer } from "lucide-react";
import { calculateGST } from "@/lib/calculations";
import { formatCurrency, exportToCSV, printResults } from "@/lib/export-utils";

const GSTCalculator = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInclusive, setIsInclusive] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  const gstRates = [
    { value: 5, label: "5%" },
    { value: 12, label: "12%" },
    { value: 18, label: "18%" },
    { value: 28, label: "28%" },
  ];

  useEffect(() => {
    const calculatedResults = calculateGST(amount, gstRate, isInclusive);
    setResults(calculatedResults);
  }, [amount, gstRate, isInclusive]);

  const handleExport = () => {
    if (results) {
      const exportData = [
        { Field: 'Base Amount', Value: formatCurrency(results.baseAmount) },
        { Field: 'GST Amount', Value: formatCurrency(results.gstAmount) },
        { Field: 'Total Amount', Value: formatCurrency(results.totalAmount) },
        { Field: 'GST Rate', Value: `${gstRate}%` },
        { Field: 'Type', Value: isInclusive ? 'GST Inclusive' : 'GST Exclusive' }
      ];
      exportToCSV(exportData, 'gst_calculation_results.csv');
    }
  };

  const handlePrint = () => {
    if (results) {
      printResults('GST Calculator Results', {
        baseAmount: results.baseAmount,
        gstAmount: results.gstAmount,
        totalAmount: results.totalAmount,
        gstRate: gstRate,
        type: isInclusive ? 'GST Inclusive' : 'GST Exclusive'
      });
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">GST Calculator</h1>
          <p className="text-lg text-gray-600">Calculate GST amounts for inclusive and exclusive pricing</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="w-5 h-5" />
                GST Calculation Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount */}
              <div className="space-y-3">
                <Label>Amount (₹)</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="text-lg"
                  placeholder="Enter amount"
                />
              </div>

              {/* GST Rate */}
              <div className="space-y-3">
                <Label>GST Rate</Label>
                <Select value={gstRate.toString()} onValueChange={(value) => setGstRate(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {gstRates.map((rate) => (
                      <SelectItem key={rate.value} value={rate.value.toString()}>
                        {rate.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* GST Type */}
              <div className="space-y-3">
                <Label>GST Type</Label>
                <RadioGroup
                  value={isInclusive ? "inclusive" : "exclusive"}
                  onValueChange={(value) => setIsInclusive(value === "inclusive")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exclusive" id="exclusive" />
                    <Label htmlFor="exclusive">Exclusive (Add GST to amount)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inclusive" id="inclusive" />
                    <Label htmlFor="inclusive">Inclusive (GST included in amount)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Quick GST Rates Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Common GST Rates:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 5% - Essential items, medicines</li>
                  <li>• 12% - Processed foods, computers</li>
                  <li>• 18% - Most goods and services</li>
                  <li>• 28% - Luxury items, automobiles</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle>GST Calculation Results</CardTitle>
            </CardHeader>
            <CardContent>
              {results && (
                <>
                  {/* Results Summary */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
                      <div className="text-center">
                        <div className="text-sm opacity-90 mb-2">Total Amount</div>
                        <div className="text-3xl font-bold">{formatCurrency(results.totalAmount)}</div>
                        <div className="text-sm opacity-90 mt-2">Including GST @ {gstRate}%</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-500 mb-1">Base Amount</div>
                        <div className="text-xl font-semibold">{formatCurrency(results.baseAmount)}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-500 mb-1">GST Amount</div>
                        <div className="text-xl font-semibold text-primary-600">{formatCurrency(results.gstAmount)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown Table */}
                  <Card className="border bg-gray-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3">Calculation Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Base Amount:</span>
                          <span className="font-medium">{formatCurrency(results.baseAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GST @ {gstRate}%:</span>
                          <span className="font-medium">{formatCurrency(results.gstAmount)}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>Total Amount:</span>
                          <span>{formatCurrency(results.totalAmount)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Button */}
                  <Button
                    onClick={handleExport}
                    variant="outline"
                    className="w-full mt-4"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Results
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* GST Information Section */}
        <Card className="shadow-material-lg mt-8">
          <CardHeader>
            <CardTitle>GST Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">What is GST?</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Goods and Services Tax (GST) is an indirect tax levied on the supply of goods and services in India. 
                  It replaced multiple indirect taxes and created a unified tax structure.
                </p>
                <h4 className="font-semibold mb-3">GST Slabs in India:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <strong>0%:</strong> Essential items like milk, bread, vegetables</li>
                  <li>• <strong>5%:</strong> Household necessities, medicines</li>
                  <li>• <strong>12%:</strong> Processed foods, computers, mobile phones</li>
                  <li>• <strong>18%:</strong> Most goods and services</li>
                  <li>• <strong>28%:</strong> Luxury and sin goods</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">How to Use This Calculator:</h4>
                <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                  <li>Enter the amount (base amount or total amount)</li>
                  <li>Select the applicable GST rate</li>
                  <li>Choose if GST is inclusive or exclusive</li>
                  <li>View the calculated breakdown</li>
                </ol>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Tip:</strong> Use "Exclusive" when you want to add GST to a base amount. 
                    Use "Inclusive" when you want to extract GST from a total amount.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GSTCalculator;
