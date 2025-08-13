export interface EMIInputs {
  loanAmount: number;
  interestRate: number;
  tenureYears: number;
}

export interface EMIResults {
  monthlyEMI: number;
  totalInterest: number;
  totalAmount: number;
  amortizationSchedule: AmortizationEntry[];
}

export interface AmortizationEntry {
  paymentNumber: number;
  paymentDate: string;
  emiAmount: number;
  principalAmount: number;
  interestAmount: number;
  remainingBalance: number;
}

export interface SIPInputs {
  monthlyAmount: number;
  annualReturn: number;
  tenureYears: number;
}

export interface SIPResults {
  futureValue: number;
  totalInvestment: number;
  totalReturns: number;
  yearlyBreakdown: SIPYearEntry[];
}

export interface SIPYearEntry {
  year: number;
  investedAmount: number;
  interestEarned: number;
  totalValue: number;
}

export interface RentVsBuyInputs {
  propertyPrice: number;
  downPayment: number;
  loanInterestRate: number;
  loanTenure: number;
  monthlyRent: number;
  propertyAppreciation: number;
  rentIncreaseRate: number;
  investmentReturn: number;
  analysisYears: number;
}

export interface RentVsBuyResults {
  recommendation: 'buy' | 'rent';
  buyingCost: number;
  rentingCost: number;
  savings: number;
  breakEvenYear: number;
  yearlyComparison: RentVsBuyYearEntry[];
}

export interface RentVsBuyYearEntry {
  year: number;
  buyingCost: number;
  rentingCost: number;
  cumulativeBuyingCost: number;
  cumulativeRentingCost: number;
}

// EMI Calculation Functions
export function calculateEMI(inputs: EMIInputs): EMIResults {
  const { loanAmount, interestRate, tenureYears } = inputs;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenureYears * 12;

  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emiNumerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
  const emiDenominator = Math.pow(1 + monthlyRate, totalMonths) - 1;
  const monthlyEMI = emiNumerator / emiDenominator;

  const totalAmount = monthlyEMI * totalMonths;
  const totalInterest = totalAmount - loanAmount;

  // Generate amortization schedule
  const amortizationSchedule: AmortizationEntry[] = [];
  let remainingBalance = loanAmount;

  for (let i = 1; i <= totalMonths; i++) {
    const interestAmount = remainingBalance * monthlyRate;
    const principalAmount = monthlyEMI - interestAmount;
    remainingBalance -= principalAmount;

    const paymentDate = new Date();
    paymentDate.setMonth(paymentDate.getMonth() + i - 1);

    amortizationSchedule.push({
      paymentNumber: i,
      paymentDate: paymentDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      emiAmount: monthlyEMI,
      principalAmount,
      interestAmount,
      remainingBalance: Math.max(0, remainingBalance),
    });
  }

  return {
    monthlyEMI,
    totalInterest,
    totalAmount,
    amortizationSchedule,
  };
}

// SIP Calculation Functions
export function calculateSIP(inputs: SIPInputs): SIPResults {
  const { monthlyAmount, annualReturn, tenureYears } = inputs;
  const monthlyReturn = annualReturn / 100 / 12;
  const totalMonths = tenureYears * 12;

  // SIP Future Value Formula: PMT * (((1 + r)^n - 1) / r) * (1 + r)
  const futureValue = monthlyAmount * (((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) * (1 + monthlyReturn));
  const totalInvestment = monthlyAmount * totalMonths;
  const totalReturns = futureValue - totalInvestment;

  // Generate yearly breakdown
  const yearlyBreakdown: SIPYearEntry[] = [];
  let cumulativeInvestment = 0;
  let currentValue = 0;

  for (let year = 1; year <= tenureYears; year++) {
    cumulativeInvestment += monthlyAmount * 12;
    
    // Calculate value at end of this year
    const monthsCompleted = year * 12;
    currentValue = monthlyAmount * (((Math.pow(1 + monthlyReturn, monthsCompleted) - 1) / monthlyReturn) * (1 + monthlyReturn));
    
    const interestEarned = currentValue - cumulativeInvestment;

    yearlyBreakdown.push({
      year,
      investedAmount: cumulativeInvestment,
      interestEarned,
      totalValue: currentValue,
    });
  }

  return {
    futureValue,
    totalInvestment,
    totalReturns,
    yearlyBreakdown,
  };
}

// GST Calculation Functions
export function calculateGST(amount: number, gstRate: number, isInclusive: boolean = false) {
  if (isInclusive) {
    const baseAmount = amount / (1 + gstRate / 100);
    const gstAmount = amount - baseAmount;
    return {
      baseAmount,
      gstAmount,
      totalAmount: amount,
    };
  } else {
    const gstAmount = (amount * gstRate) / 100;
    const totalAmount = amount + gstAmount;
    return {
      baseAmount: amount,
      gstAmount,
      totalAmount,
    };
  }
}

// Compound Interest Calculation
export function calculateCompoundInterest(
  principal: number,
  rate: number,
  time: number,
  compoundFrequency: number = 1
) {
  // A = P(1 + r/n)^(nt)
  const finalAmount = principal * Math.pow(1 + rate / 100 / compoundFrequency, compoundFrequency * time);
  const compoundInterest = finalAmount - principal;

  // Generate year-wise breakdown
  const yearlyBreakdown = [];
  for (let year = 1; year <= time; year++) {
    const yearlyAmount = principal * Math.pow(1 + rate / 100 / compoundFrequency, compoundFrequency * year);
    const yearlyInterest = yearlyAmount - principal;
    yearlyBreakdown.push({
      year,
      principal,
      interest: yearlyInterest,
      amount: yearlyAmount,
    });
  }

  return {
    finalAmount,
    compoundInterest,
    yearlyBreakdown,
  };
}

// Rent vs Buy Analysis
export function calculateRentVsBuy(inputs: RentVsBuyInputs): RentVsBuyResults {
  const {
    propertyPrice,
    downPayment,
    loanInterestRate,
    loanTenure,
    monthlyRent,
    propertyAppreciation,
    rentIncreaseRate,
    investmentReturn,
    analysisYears,
  } = inputs;

  const loanAmount = propertyPrice - downPayment;
  const monthlyEMI = calculateEMI({
    loanAmount,
    interestRate: loanInterestRate,
    tenureYears: loanTenure,
  }).monthlyEMI;

  const yearlyComparison: RentVsBuyYearEntry[] = [];
  let cumulativeBuyingCost = downPayment;
  let cumulativeRentingCost = 0;
  let currentRent = monthlyRent;
  let breakEvenYear = 0;

  for (let year = 1; year <= analysisYears; year++) {
    // Buying costs (EMI + maintenance + taxes)
    const yearlyEMI = monthlyEMI * 12;
    const maintenanceCost = propertyPrice * 0.01; // 1% of property value
    const yearlyBuyingCost = yearlyEMI + maintenanceCost;
    cumulativeBuyingCost += yearlyBuyingCost;

    // Renting costs
    const yearlyRentCost = currentRent * 12;
    cumulativeRentingCost += yearlyRentCost;

    // Investment returns on down payment (for renting scenario)
    const investmentGains = downPayment * Math.pow(1 + investmentReturn / 100, year) - downPayment;
    const adjustedRentingCost = cumulativeRentingCost - investmentGains;

    yearlyComparison.push({
      year,
      buyingCost: yearlyBuyingCost,
      rentingCost: yearlyRentCost,
      cumulativeBuyingCost,
      cumulativeRentingCost: adjustedRentingCost,
    });

    // Find break-even point
    if (adjustedRentingCost > cumulativeBuyingCost && breakEvenYear === 0) {
      breakEvenYear = year;
    }

    // Increase rent for next year
    currentRent *= (1 + rentIncreaseRate / 100);
  }

  const finalBuyingCost = cumulativeBuyingCost;
  const finalRentingCost = yearlyComparison[analysisYears - 1].cumulativeRentingCost;
  const recommendation = finalBuyingCost < finalRentingCost ? 'buy' : 'rent';
  const savings = Math.abs(finalBuyingCost - finalRentingCost);

  return {
    recommendation,
    buyingCost: finalBuyingCost,
    rentingCost: finalRentingCost,
    savings,
    breakEvenYear,
    yearlyComparison,
  };
}
