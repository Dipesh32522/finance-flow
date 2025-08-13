import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sprout, Download, ArrowLeft, Printer } from "lucide-react";
import { calculateCompoundInterest } from "@/lib/calculations";
import { formatCurrency, exportToCSV, printResults } from "@/lib/export-utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(10);
  const [time, setTime] = useState<number>(10);
  const [compoundFrequency, setCompoundFrequency] = useState<number>(1);
  const [results, setResults] = useState<any>(null);

  const frequencies = [
    { value: 1, label: "Annually" },
    { value: 2, label: "Semi-Annually" },
    { value: 4, label: "Quarterly" },
    { value: 12, label: "Monthly" },
    { value: 365, label: "Daily" },
  ];

  useEffect(() => {
    const calculatedResults = calculateCompoundInterest(principal, rate, time, compoundFrequency);
    setResults(calculatedResults);
  }, [principal, rate, time, compoundFrequency]);

  const handleSliderChange = (field: string, values: number[]) => {
    switch (field) {
      case 'principal':
        setPrincipal(values[0]);
        break;
      case 'rate':
        setRate(values[0]);
        break;
      case 'time':
        setTime(values[0]);
        break;
    }
  };

  const handleExport = () => {
    if (results) {
      const exportData = [
        { Field: 'Principal Amount', Value: formatCurrency(principal) },
        { Field: 'Final Amount', Value: formatCurrency(results.finalAmount) },
        { Field: 'Interest Earned', Value: formatCurrency(results.interestEarned) },
        { Field: 'Interest Rate', Value: `${rate}% per annum` },
        { Field: 'Time Period', Value: `${time} years` },
        { Field: 'Compounding', Value: frequencies.find(f => f.value === compoundFrequency)?.label || 'Annually' }
      ];
      exportToCSV(exportData, 'compound_interest_results.csv');
    }
  };

  const handlePrint = () => {
    if (results) {
      printResults('Compound Interest Calculator Results', {
        principalAmount: principal,
        finalAmount: results.finalAmount,
        interestEarned: results.interestEarned,
        interestRate: rate,
        timePeriod: time,
        compounding: frequencies.find(f => f.value === compoundFrequency)?.label || 'Annually'
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Compound Interest Calculator</h1>
          <p className="text-lg text-gray-600">Visualize the power of compounding with detailed growth analysis</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Input Section */}
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="w-5 h-5" />
                Investment Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Principal Amount */}
              <div className="space-y-3">
                <Label>Principal Amount (₹)</Label>
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="text-lg"
                />
                <Slider
                  value={[principal]}
                  onValueChange={(values) => handleSliderChange('principal', values)}
                  min={10000}
                  max={10000000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹10K</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-3">
                <Label>Annual Interest Rate (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="text-lg"
                />
                <Slider
                  value={[rate]}
                  onValueChange={(values) => handleSliderChange('rate', values)}
                  min={1}
                  max={30}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Time Period */}
              <div className="space-y-3">
                <Label>Time Period (Years)</Label>
                <Input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                  className="text-lg"
                />
                <Slider
                  value={[time]}
                  onValueChange={(values) => handleSliderChange('time', values)}
                  min={1}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 Year</span>
                  <span>50 Years</span>
                </div>
              </div>

              {/* Compound Frequency */}
              <div className="space-y-3">
                <Label>Compound Frequency</Label>
                <Select value={compoundFrequency.toString()} onValueChange={(value) => setCompoundFrequency(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value.toString()}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle>Investment Growth</CardTitle>
            </CardHeader>
            <CardContent>
              {results && (
                <>
                  {/* Final Amount Result Card */}
                  <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl p-6 text-white mb-6">
                    <div className="text-center">
                      <div className="text-sm opacity-90 mb-2">Final Amount</div>
                      <div className="text-3xl font-bold">{formatCurrency(results.finalAmount)}</div>
                      <div className="text-sm opacity-90 mt-2">after {time} years</div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Principal Amount</span>
                      <span className="font-semibold text-lg">{formatCurrency(principal)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Compound Interest</span>
                      <span className="font-semibold text-lg text-secondary-500">{formatCurrency(results.compoundInterest)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Total Growth</span>
                      <span className="font-semibold text-lg text-accent-500">
                        {((results.compoundInterest / principal) * 100).toFixed(1)}%
                      </span>
                    </div>
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

        {/* Growth Chart */}
        {results && (
          <Card className="shadow-material-lg mb-8">
            <CardHeader>
              <CardTitle>Investment Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={results.yearlyBreakdown}>
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
                    dataKey="principal"
                    stroke="hsl(210, 79%, 46%)"
                    strokeWidth={2}
                    name="Principal"
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(134, 41%, 41%)"
                    strokeWidth={2}
                    name="Total Amount"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Information Section */}
        <Card className="shadow-material-lg">
          <CardHeader>
            <CardTitle>Understanding Compound Interest</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">What is Compound Interest?</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Compound interest is the interest calculated on the initial principal, which also includes 
                  all of the accumulated interest from previous periods. It's often called "interest on interest."
                </p>
                <h4 className="font-semibold mb-3">The Compound Interest Formula:</h4>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <code className="text-sm">A = P(1 + r/n)^(nt)</code>
                  <ul className="text-xs text-gray-600 mt-2 space-y-1">
                    <li>A = Final amount</li>
                    <li>P = Principal amount</li>
                    <li>r = Annual interest rate</li>
                    <li>n = Compounding frequency</li>
                    <li>t = Time period in years</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">The Power of Compounding:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <strong>Time:</strong> The longer you invest, the more powerful compounding becomes</li>
                  <li>• <strong>Frequency:</strong> More frequent compounding leads to higher returns</li>
                  <li>• <strong>Rate:</strong> Higher interest rates amplify the compounding effect</li>
                  <li>• <strong>Regular Additions:</strong> Adding money regularly increases the base for compounding</li>
                </ul>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Einstein's Quote:</strong> "Compound interest is the eighth wonder of the world. 
                    He who understands it, earns it; he who doesn't, pays it."
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

export default CompoundInterestCalculator;
