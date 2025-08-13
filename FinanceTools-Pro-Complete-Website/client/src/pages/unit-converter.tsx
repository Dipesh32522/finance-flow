import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, Download, Ruler, Weight, Thermometer, Clock, Zap, DollarSign, ArrowLeft, Printer } from "lucide-react";
import { formatNumber, exportToCSV, printResults } from "@/lib/export-utils";

interface ConversionCategory {
  id: string;
  name: string;
  icon: any;
  units: { [key: string]: { name: string; factor: number } };
}

const UnitConverter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("length");
  const [fromUnit, setFromUnit] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("");
  const [fromValue, setFromValue] = useState<number>(1);
  const [toValue, setToValue] = useState<number>(0);

  const categories: ConversionCategory[] = [
    {
      id: "length",
      name: "Length",
      icon: Ruler,
      units: {
        meter: { name: "Meter", factor: 1 },
        kilometer: { name: "Kilometer", factor: 1000 },
        centimeter: { name: "Centimeter", factor: 0.01 },
        millimeter: { name: "Millimeter", factor: 0.001 },
        inch: { name: "Inch", factor: 0.0254 },
        foot: { name: "Foot", factor: 0.3048 },
        yard: { name: "Yard", factor: 0.9144 },
        mile: { name: "Mile", factor: 1609.344 },
      }
    },
    {
      id: "weight",
      name: "Weight",
      icon: Weight,
      units: {
        kilogram: { name: "Kilogram", factor: 1 },
        gram: { name: "Gram", factor: 0.001 },
        pound: { name: "Pound", factor: 0.453592 },
        ounce: { name: "Ounce", factor: 0.0283495 },
        ton: { name: "Ton", factor: 1000 },
        stone: { name: "Stone", factor: 6.35029 },
      }
    },
    {
      id: "temperature",
      name: "Temperature",
      icon: Thermometer,
      units: {
        celsius: { name: "Celsius", factor: 1 },
        fahrenheit: { name: "Fahrenheit", factor: 1 },
        kelvin: { name: "Kelvin", factor: 1 },
      }
    },
    {
      id: "area",
      name: "Area",
      icon: Ruler,
      units: {
        squareMeter: { name: "Square Meter", factor: 1 },
        squareKilometer: { name: "Square Kilometer", factor: 1000000 },
        squareCentimeter: { name: "Square Centimeter", factor: 0.0001 },
        squareFoot: { name: "Square Foot", factor: 0.092903 },
        acre: { name: "Acre", factor: 4046.86 },
        hectare: { name: "Hectare", factor: 10000 },
      }
    },
    {
      id: "volume",
      name: "Volume",
      icon: Ruler,
      units: {
        liter: { name: "Liter", factor: 1 },
        milliliter: { name: "Milliliter", factor: 0.001 },
        gallon: { name: "Gallon (US)", factor: 3.78541 },
        quart: { name: "Quart", factor: 0.946353 },
        pint: { name: "Pint", factor: 0.473176 },
        cup: { name: "Cup", factor: 0.236588 },
        tablespoon: { name: "Tablespoon", factor: 0.0147868 },
        teaspoon: { name: "Teaspoon", factor: 0.00492892 },
      }
    },
    {
      id: "time",
      name: "Time",
      icon: Clock,
      units: {
        second: { name: "Second", factor: 1 },
        minute: { name: "Minute", factor: 60 },
        hour: { name: "Hour", factor: 3600 },
        day: { name: "Day", factor: 86400 },
        week: { name: "Week", factor: 604800 },
        month: { name: "Month", factor: 2629746 },
        year: { name: "Year", factor: 31556952 },
      }
    },
    {
      id: "speed",
      name: "Speed",
      icon: Zap,
      units: {
        meterPerSecond: { name: "Meter per Second", factor: 1 },
        kilometerPerHour: { name: "Kilometer per Hour", factor: 0.277778 },
        milePerHour: { name: "Mile per Hour", factor: 0.44704 },
        knot: { name: "Knot", factor: 0.514444 },
        footPerSecond: { name: "Foot per Second", factor: 0.3048 },
      }
    },
    {
      id: "energy",
      name: "Energy",
      icon: Zap,
      units: {
        joule: { name: "Joule", factor: 1 },
        kilojoule: { name: "Kilojoule", factor: 1000 },
        calorie: { name: "Calorie", factor: 4.184 },
        kilocalorie: { name: "Kilocalorie", factor: 4184 },
        wattHour: { name: "Watt Hour", factor: 3600 },
        kilowattHour: { name: "Kilowatt Hour", factor: 3600000 },
        btu: { name: "BTU", factor: 1055.06 },
      }
    },
  ];

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  useEffect(() => {
    if (currentCategory) {
      const units = Object.keys(currentCategory.units);
      if (!fromUnit || !currentCategory.units[fromUnit]) {
        setFromUnit(units[0] || "");
      }
      if (!toUnit || !currentCategory.units[toUnit]) {
        setToUnit(units[1] || units[0] || "");
      }
    }
  }, [selectedCategory, currentCategory, fromUnit, toUnit]);

  useEffect(() => {
    if (currentCategory && fromUnit && toUnit) {
      convertValue();
    }
  }, [fromValue, fromUnit, toUnit, selectedCategory]);

  const convertValue = () => {
    if (!currentCategory || !fromUnit || !toUnit) return;

    if (selectedCategory === "temperature") {
      setToValue(convertTemperature(fromValue, fromUnit, toUnit));
    } else {
      const fromFactor = currentCategory.units[fromUnit]?.factor || 1;
      const toFactor = currentCategory.units[toUnit]?.factor || 1;
      const result = (fromValue * fromFactor) / toFactor;
      setToValue(result);
    }
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius = value;
    
    // Convert from unit to Celsius
    if (from === "fahrenheit") {
      celsius = (value - 32) * 5/9;
    } else if (from === "kelvin") {
      celsius = value - 273.15;
    }
    
    // Convert from Celsius to target unit
    if (to === "fahrenheit") {
      return celsius * 9/5 + 32;
    } else if (to === "kelvin") {
      return celsius + 273.15;
    }
    
    return celsius;
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    const tempValue = fromValue;
    
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(toValue);
    setToValue(tempValue);
  };

  const handleExport = () => {
    const exportData = [
      { Field: 'Category', Value: currentCategory?.name || 'N/A' },
      { Field: 'From', Value: `${fromValue} ${currentCategory?.units[fromUnit]?.name || fromUnit}` },
      { Field: 'To', Value: `${formatNumber(toValue, 6)} ${currentCategory?.units[toUnit]?.name || toUnit}` },
      { Field: 'Conversion Factor', Value: currentCategory?.units[fromUnit] && currentCategory?.units[toUnit] 
        ? formatNumber(currentCategory.units[toUnit].factor / currentCategory.units[fromUnit].factor, 10) 
        : 'N/A' }
    ];
    exportToCSV(exportData, 'unit_conversion_results.csv');
  };

  const handlePrint = () => {
    const printData = {
      category: currentCategory?.name || 'N/A',
      fromValue: `${fromValue} ${currentCategory?.units[fromUnit]?.name || fromUnit}`,
      toValue: `${formatNumber(toValue, 6)} ${currentCategory?.units[toUnit]?.name || toUnit}`,
      conversionFactor: currentCategory?.units[fromUnit] && currentCategory?.units[toUnit] 
        ? formatNumber(currentCategory.units[toUnit].factor / currentCategory.units[fromUnit].factor, 10) 
        : 'N/A'
    };
    printResults('Unit Conversion Results', printData);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Unit Converter</h1>
          <p className="text-lg text-gray-600">Convert between various units with precision and ease</p>
        </div>

        {/* Category Selection */}
        <Card className="shadow-material-lg mb-8">
          <CardHeader>
            <CardTitle>Select Conversion Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                      selectedCategory === category.id 
                        ? "bg-primary-500 hover:bg-primary-600" 
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Converter */}
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5" />
                {currentCategory?.name} Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* From Unit */}
              <div className="space-y-3">
                <Label>From</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    value={fromValue}
                    onChange={(e) => setFromValue(Number(e.target.value))}
                    className="text-lg"
                    placeholder="Enter value"
                  />
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currentCategory && Object.entries(currentCategory.units).map(([key, unit]) => (
                        <SelectItem key={key} value={key}>
                          {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapUnits}
                  className="rounded-full"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </Button>
              </div>

              {/* To Unit */}
              <div className="space-y-3">
                <Label>To</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    value={formatNumber(toValue, 6)}
                    readOnly
                    className="text-lg bg-gray-50"
                  />
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currentCategory && Object.entries(currentCategory.units).map(([key, unit]) => (
                        <SelectItem key={key} value={key}>
                          {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Result Display */}
              <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl p-6 text-white">
                <div className="text-center">
                  <div className="text-sm opacity-90 mb-2">Conversion Result</div>
                  <div className="text-lg font-semibold">
                    {fromValue} {currentCategory?.units[fromUnit]?.name}
                  </div>
                  <div className="text-sm opacity-75 my-2">=</div>
                  <div className="text-lg font-semibold">
                    {formatNumber(toValue, 6)} {currentCategory?.units[toUnit]?.name}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleExport}
                variant="outline"
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Result
              </Button>
            </CardContent>
          </Card>

          {/* Quick Conversions */}
          <Card className="shadow-material-lg">
            <CardHeader>
              <CardTitle>Quick Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              {currentCategory && (
                <div className="space-y-4">
                  <div className="text-sm font-medium text-gray-700 mb-3">
                    Common {currentCategory.name} Conversions:
                  </div>
                  
                  {/* Generate quick conversion examples */}
                  <div className="space-y-3">
                    {Object.entries(currentCategory.units).slice(0, 6).map(([unitKey, unit], index) => {
                      const baseValue = selectedCategory === "temperature" ? 
                        (unitKey === "celsius" ? 0 : unitKey === "fahrenheit" ? 32 : 273.15) : 1;
                      
                      const otherUnits = Object.entries(currentCategory.units).filter(([key]) => key !== unitKey);
                      const [targetKey, targetUnit] = otherUnits[0] || [unitKey, unit];
                      
                      let convertedValue = baseValue;
                      if (selectedCategory === "temperature") {
                        convertedValue = convertTemperature(baseValue, unitKey, targetKey);
                      } else {
                        const fromFactor = unit.factor;
                        const toFactor = currentCategory.units[targetKey]?.factor || 1;
                        convertedValue = (baseValue * fromFactor) / toFactor;
                      }
                      
                      return (
                        <div key={unitKey} className="bg-gray-50 rounded-lg p-3 text-sm">
                          <div className="flex justify-between items-center">
                            <span>{baseValue} {unit.name}</span>
                            <span>=</span>
                            <span className="font-semibold text-primary-600">
                              {formatNumber(convertedValue, 4)} {targetUnit.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Category Information */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">About {currentCategory.name}:</h4>
                    <p className="text-sm text-blue-800">
                      {selectedCategory === "length" && "Length is a measure of distance. Common units include meters, feet, inches, and kilometers."}
                      {selectedCategory === "weight" && "Weight measures the force exerted by gravity on an object. Common units include kilograms, pounds, and ounces."}
                      {selectedCategory === "temperature" && "Temperature measures thermal energy. Common scales are Celsius, Fahrenheit, and Kelvin."}
                      {selectedCategory === "area" && "Area measures the extent of a surface. Common units include square meters, acres, and hectares."}
                      {selectedCategory === "volume" && "Volume measures the amount of space occupied by matter. Common units include liters, gallons, and cubic meters."}
                      {selectedCategory === "time" && "Time measures the duration of events. Common units include seconds, minutes, hours, and days."}
                      {selectedCategory === "speed" && "Speed measures the rate of change of position. Common units include meters per second and kilometers per hour."}
                      {selectedCategory === "energy" && "Energy measures the capacity to do work. Common units include joules, calories, and kilowatt-hours."}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Conversion Table */}
        {currentCategory && (
          <Card className="shadow-material-lg mt-8">
            <CardHeader>
              <CardTitle>Conversion Table - {currentCategory.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Equivalent (Base Unit)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(currentCategory.units).map(([key, unit]) => (
                      <tr key={key} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{unit.name}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-600">{key}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          {selectedCategory === "temperature" ? 
                            "Variable" : 
                            `${formatNumber(unit.factor, 6)} ${Object.values(currentCategory.units)[0].name.toLowerCase()}`
                          }
                        </td>
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

export default UnitConverter;
