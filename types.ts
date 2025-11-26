export interface FireInputs {
  currentSavings: number;
  monthlyContribution: number;
  annualReturnRate: number;
  targetAmount: number;
  currentAge: number;
}

export interface SimulationPoint {
  year: number;
  age: number;
  totalSavings: number;
  totalPrincipal: number;
  totalInterest: number;
}

export interface SimulationResult {
  yearsToGoal: number;
  data: SimulationPoint[];
  reachedGoal: boolean;
  finalAmount: number;
}